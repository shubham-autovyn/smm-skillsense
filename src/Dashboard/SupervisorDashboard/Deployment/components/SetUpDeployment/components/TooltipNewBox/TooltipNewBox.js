import { Box } from "@mui/material";
import SecondaryButton from "../../../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import checkIcon from "../../../../../../../assets/svg/fi-sr-check.svg";
import PrimaryButton from "../../../../../../../components/PrimaryButton/PrimaryButton";

import { useState } from "react";
import getInitialName from "../../../../../../../utils/getInitailName";
import {
  BtnsAll,
  CheckBox,
  CheckBoxMain,
  CheckImg,
  OptDetails,
  OptIdLevel,
  Optname,
  OptNameId,
  TraineeApart,
  Update,
  UpdateCheck,
} from "./TooltipNewBox.styles";

const TooltipNewBox = ({
  data,
  onClose,
  id,
  field,
  dataAllOperator,
  setRelieversAbsenteeism,
  relieversAbsenteeism,
  setDataAllOperator,
}) => {
  const [selected, setSelected] = useState([]);

  const handleToggle = (traineeId) => {
    const isSelected = !!selected[traineeId];

    const validRelieversCount =
      relieversAbsenteeism?.relieversAbsenteeism?.filter(
        (item) => !item.assignData
      ).length || 0;

    if (isSelected) {
      setSelected((prev) => {
        const { [traineeId]: _, ...rest } = prev;
        return rest;
      });
    } else if (Object.keys(selected).length < validRelieversCount) {
      setSelected((prev) => ({
        ...prev,
        [traineeId]: true,
      }));
    }
  };

  const applyTotalDeployment = () => {
    onClose();
    const selectedTrainees = data.filter(
      (trainee) => selected[trainee.staff_id]
    );

    setRelieversAbsenteeism((prevData) => {
      let traineeIndex = 0;

      const updatedRelieversAbsenteeism = prevData?.relieversAbsenteeism?.map(
        (relieverItem) => {
          if (
            !relieverItem.assignData &&
            traineeIndex < selectedTrainees.length
          ) {
            const selectedTrainee = selectedTrainees[traineeIndex];
            traineeIndex++;
            setDataAllOperator((prevData) =>
              prevData.filter(
                (item) => item?.staff_id !== selectedTrainee?.staff_id
              )
            );
            return {
              ...relieverItem,
              assignData: selectedTrainee,
            };
          }
          return relieverItem;
        }
      );

      return {
        ...prevData,
        relieversAbsenteeism: updatedRelieversAbsenteeism,
      };
    });
  };

  return (
    <Box
      className="main-box"
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Box
        style={{ overflowY: "auto", maxHeight: "400px", overflowX: "hidden" }}
        className="trainee-Main-box"
      >
        {data?.map((trainee) => (
          <TraineeApart
            key={trainee.staff_id}
            onClick={() => handleToggle(trainee.staff_id)}
            sx={{
              backgroundColor: selected[trainee.staff_id] ? "#e6e9f0" : "#fff",
            }}
          >
            <OptDetails>
              <Box>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    fontSize: "16px",
                    backgroundColor: "#9C9ECA",
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  {getInitialName(trainee?.name)}
                </div>
              </Box>
              <OptNameId>
                <Optname variant="h4">{trainee.name}</Optname>
                <OptIdLevel>
                  {trainee.staff_id} | {trainee.sub_category} | {trainee.level}
                </OptIdLevel>
              </OptNameId>
            </OptDetails>

            <UpdateCheck>
              <Box>{trainee?.dueToOct && <Update>Due To Oct</Update>}</Box>
              <CheckBox>
                <CheckBoxMain
                  checked={!!selected[trainee.staff_id]}
                  onChange={(e) => {
                    handleToggle(trainee.staff_id);
                  }}
                  sx={{
                    color: "transparent",
                    "& .MuiSvgIcon-root": {
                      fontSize: 0,
                    },
                  }}
                >
                  {selected[trainee.staff_id] && (
                    <Box style={{ width: "20px" }}>
                      <CheckImg src={checkIcon} alt="checked" />
                    </Box>
                  )}
                </CheckBoxMain>
              </CheckBox>
            </UpdateCheck>
          </TraineeApart>
        ))}
      </Box>

      <BtnsAll>
        <Box>
          <SecondaryButton bgColor="none" padding="8px 20px" onClick={onClose}>
            Cancel
          </SecondaryButton>
        </Box>
        <Box>
          <PrimaryButton onClick={applyTotalDeployment}>Assign</PrimaryButton>
        </Box>
      </BtnsAll>
    </Box>
  );
};

export default TooltipNewBox;
