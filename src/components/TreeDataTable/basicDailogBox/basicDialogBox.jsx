import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

import {
  DialogSubText,
  DialogText,
  HeaderBox,
  InputBox,
  MaruSpanSkill,
  MaruSpanSkillBlank,
  StationItem,
  StationList,
  StationName,
  StyledBox,
} from "./basicDialogBox.style";

const stationsData = [
  { id: "7RA", name: "Break Pipe Fitment", active: true },
  { id: "7RB", name: "TMC Fitment", active: true },
  { id: "7L", name: "Vacuum Pipe Fitment", active: true },
  { id: "8RA", name: "Sunvisor Fitment", active: false },
  { id: "8RB", name: "Eeco Flair Nut Torque", active: true },
];

const BasicDialogBox = ({ name, value, stations, onClose }) => {
  const stationsData = stations || [];
  const [filteredStations, setFilteredStations] = useState(stationsData || []);

  const handleFilterChange = (e) => {
    const filterStation = stationsData?.filter((val) =>
      val?.description?.toLowerCase().includes(e?.target?.value?.toLowerCase())
    );
    setFilteredStations(filterStation);
  };

  return (
    <div>
      <StyledBox>
        <HeaderBox>
          <DialogText>
            {name} Stations ({filteredStations?.length})
          </DialogText>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </HeaderBox>

        <InputBox
          type="text"
          placeholder="Filter by Station Name"
          onChange={handleFilterChange}
        />

        <StationList>
          {filteredStations?.map((station) => (
            <>
              <StationItem key={station.id}>
                {station?.maru_a_ar ? (
                  <MaruSpanSkill>{station.maru_a_ar}</MaruSpanSkill>
                ) : (
                  <MaruSpanSkillBlank></MaruSpanSkillBlank>
                )}

                <StationName>{station.station_name}</StationName>
                <DialogSubText>{station.description}</DialogSubText>
              </StationItem>
            </>
          ))}
        </StationList>
      </StyledBox>
    </div>
  );
};

export default BasicDialogBox;
