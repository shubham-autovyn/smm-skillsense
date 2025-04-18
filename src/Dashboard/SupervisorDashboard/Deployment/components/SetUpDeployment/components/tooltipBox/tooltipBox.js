import { Box } from "@mui/material";
import React, { useState } from "react";

import checkIcon from "../../../../../../../assets/svg/fi-sr-check.svg";

import SecondaryButton from "../../../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../../components/PrimaryButton/PrimaryButton";
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
} from "./tooltipBox.styles";

const TooltipBox = ({
  data,
  onClose,
  id,
  field,
  setRows,
  setDataAllOperator,
}) => {
  const [selected, setSelected] = useState({});

  const handleToggle = (traineeId) => {
    setSelected({});
    setSelected((prev) => ({
      ...prev,
      [traineeId]: !prev[traineeId],
    }));
  };

  const applyTotalDeployment = () => {
    const selectedTrainees = data.filter(
      (trainee) => selected[trainee.staff_id]
    );

    setRows((prevRows) =>
      prevRows.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: {
                ...item[field],
                value: [...(item[field]?.value || []), ...selectedTrainees],
              },
            }
          : item
      )
    );

    setDataAllOperator((prevData) =>
      prevData.filter((item) => !selected[item?.staff_id])
    );

    onClose();
  };

  return (
    <Box
      className="main-box"
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Box
        style={{ overflowY: "auto", maxHeight: "250px", overflowX: "hidden" }}
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
                    e.stopPropagation();
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

export default TooltipBox;
