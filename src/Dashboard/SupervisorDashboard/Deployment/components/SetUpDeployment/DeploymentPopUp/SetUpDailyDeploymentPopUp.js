import { Box } from "@mui/material";
import React, { useState } from "react";
import SecondaryButton from "../../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import checkIcon from "../../../../../../assets/svg/fi-sr-check.svg";
import PrimaryButton from "../../../../../../components/PrimaryButton/PrimaryButton";
import MasterSearch from "../../../../../../components/SearchBox/MasterSearch";
import {
  BtnsAll,
  CheckBox,
  CheckBoxMain,
  CheckImg,
  OptDetails,
  OptIdLevel,
  OptImg,
  Optname,
  OptNameId,
  SBMain,
  SearchBox,
  TraineeApart,
  Update,
  UpdateCheck,
} from "./SetUpDailyDeploymentPopUp.style";

const SetUpDailyDeploymentPopUp = ({ onClose, data }) => {
  const handleCloseInside = () => {
    onClose();
  };

  const [selected, setSelected] = useState({});

  const handleToggle = (id) => {
    handleAssign(id);
  };

  const handleAssign = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box className="main-box">
      <SBMain className="Search_box-main">
        <SearchBox>
          <MasterSearch
            value="aaaaaaa"
            onChange="aaaaaaa"
            placeholder="Search by Name, Staff ID"
          />
        </SearchBox>
      </SBMain>

      <Box className="trainee-Main-box">
        {data?.map((trainee) => (
          <TraineeApart
            key={trainee.id}
            onClick={() => handleToggle(trainee.id)}
            sx={{
              backgroundColor: selected[trainee.id] ? "#e6e9f0" : "#fff",
            }}
          >
            <OptDetails>
              <Box>
                <OptImg src={trainee.image} alt={trainee.name} />
              </Box>
              <OptNameId>
                <Optname variant="h4">{trainee.name}</Optname>
                <OptIdLevel>
                  {trainee.staffId} | {trainee.status} | {trainee.level}
                </OptIdLevel>
              </OptNameId>
            </OptDetails>

            <UpdateCheck>
              <Box>{trainee.dueToOct && <Update>Due To Oct</Update>}</Box>

              <CheckBox>
                <CheckBoxMain
                  checked={selected[trainee.id] || false}
                  onChange={() => handleToggle(trainee.id)}
                  sx={{
                    color: "transparent",
                    "& .MuiSvgIcon-root": {
                      fontSize: 0,
                    },
                  }}
                >
                  <Box style={{ width: "20px" }}>
                    {selected[trainee.id] && (
                      <CheckImg src={checkIcon} alt="checked" />
                    )}
                  </Box>
                </CheckBoxMain>
              </CheckBox>
            </UpdateCheck>
          </TraineeApart>
        ))}
      </Box>

      <BtnsAll>
        <Box>
          <SecondaryButton
            bgColor="none"
            padding="8px 20px"
            onClick={handleCloseInside}
          >
            Cancel
          </SecondaryButton>
        </Box>
        <Box>
          <PrimaryButton onClick={handleAssign}>Assign</PrimaryButton>
        </Box>
      </BtnsAll>
    </Box>
  );
};

export default SetUpDailyDeploymentPopUp;
