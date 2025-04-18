import { CloseRounded } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";
import { MarutiBlue500 } from "../../utils/colors";

const MenuProps = {
  PaperProps: {
    style: {
      padding: "0px !important",
      width: "inherit",
      maxHeight: "200px",
    },
  },
};
const SingleSelectDropdown = ({
  data,
  selected,
  handleChange,
  disabled,
  isClearable,
  handleClear,
  unitValue = "",
}) => {
  const RenderIconComponent = () => {
    if (selected && isClearable) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", pr: 1 }}>
          <IconButton onClick={() => (handleClear ? handleClear("") : {})}>
            <CloseRounded />
          </IconButton>
          <KeyboardArrowDownIcon />
        </Box>
      );
    }
    return (
      <IconButton>
        <KeyboardArrowDownIcon />
      </IconButton>
    );
  };

  return (
    <Box sx={{ minWidth: "100px", width: "100%" }}>
      <Select
        sx={{
          height: "3.2rem !important",
          width: "inherit",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: MarutiBlue500,
          },
        }}
        disabled={disabled}
        value={selected || ""}
        onChange={handleChange}
        // IconComponent={() => <RenderIconComponent />}
        MenuProps={MenuProps}
        displayEmpty
        renderValue={(selected) => {
          if (selected?.length === 0) {
            return <span>{"Select"}</span>;
          }
          if (selected?.label) {
            return `${selected?.label}${unitValue}`;
          }
          return `${selected}${unitValue}`;
        }}
      >
        {data?.map((val, index) => {
          return val?.label ? (
            <MenuItem
              key={index}
              value={val}
              sx={{ height: "3.2rem !important" }}
            >
              {`${val?.label}${unitValue}`}
            </MenuItem>
          ) : (
            <MenuItem
              key={index}
              value={val}
              sx={{ height: "3.2rem !important" }}
            >
              {`${val}${unitValue}`}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

export default SingleSelectDropdown;
