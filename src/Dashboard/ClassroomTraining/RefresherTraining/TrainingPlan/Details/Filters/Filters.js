import { Box, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import TertiaryButton from "../../../../../../utils/Buttons/TertiaryButton/TertiaryButton";
import Select from "../../../../../../components/Select/Select";
import MasterSearch from "../../../../../../components/SearchBox/MasterSearch";
import useStyles from "../../../../../styles";
import CustomDatePicker from "../../../../../../components/DatePicker/DatePicker";
import { TypeSecondary } from "../../../../../../utils/colors";
const Filters = (props) => {
  const classes = useStyles();

  return (
    <Box
      className={classes["container-flex"]}
      sx={{ ml: "2rem", mr: "2rem", p: "1rem", backgroundColor: "#f4f5f8" }}
    >
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Typography variant="h5" color={TypeSecondary}>
          Filters:
        </Typography>
        <Box sx={{ pl: "1rem", minWidth: "208px" }}>
          <MasterSearch
            value={props.searchValue}
            onChange={props.handleSearch}
            onInputChange={props.handleSearchQuery}
            placeholder="Search Staff ID, Name"
            autoComplete={props.autoCompleteData}
          />
        </Box>
        <Box sx={{ width: "208px" }}>
          <CustomDatePicker
            value={props.selectedDate}
            handleChange={(evt) => {
              props.handleSelectDate(evt);
            }}
            label="Training Date"
          />
        </Box>
        <Box sx={{ minWidth: "15rem", backgroundColor: "white" }}>
          <Select
            label="Group"
            value={"Group"}
            onChange={(event) => props.handleGroupChange(event.target.value)}
          >
            <MenuItem style={{ display: "none" }} key={"none"} value={"none"}>
              none
            </MenuItem>
          </Select>
        </Box>
        <Box sx={{ minWidth: "15rem", backgroundColor: "white" }}>
          <Select
            label="Line"
            value={"Line"}
            onChange={(event) => props.handleLineChange(event.target.value)}
          ></Select>
        </Box>
        <Box sx={{ minWidth: "15rem", backgroundColor: "white" }}>
          <Select
            label="Area"
            value="Area"
            onChange={(event) => props.handleAreaChange(event.target.value)}
          >
            <MenuItem style={{ display: "none" }} key={"none"} value={"none"}>
              none
            </MenuItem>
          </Select>
        </Box>
      </Box>
      <Box style={{ display: "flex" }}>
        <TertiaryButton
          disabled={props.selectedDate === null && props.searchValue===""}
          onClick={props.handleResetClick}
        >
          Reset
        </TertiaryButton>
      </Box>
    </Box>
  );
};

export default Filters;
