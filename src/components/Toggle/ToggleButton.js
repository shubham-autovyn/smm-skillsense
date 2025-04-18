import React from "react";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

const Toggle = ({
  selected,
  labels,
  onChange,
  totalCount,
  correctCount,
  incorrectCount,
  showCount = true,
}) => {
  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  const getCount = (label) => {
    if (showCount) {
      const count =
        label === "All"
          ? totalCount
          : label === "Correct"
          ? correctCount
          : incorrectCount;
      return count?.toString() ? `(${count})` : "";
    }
    return "";
  };

  return (
    <Stack direction="row">
      <ToggleButtonGroup
        value={selected}
        exclusive
        onChange={handleChange}
        aria-label="Toggle Button"
      >
        {labels.map((label, index) => (
          <ToggleButton
            key={index}
            value={label}
            sx={{
              whiteSpace: "no-wrap !important",
              height: "3rem !important",
              // width: "13rem !important",
              px: "2.4rem",
              fontWeight: "400 !important",
              color: "#66696B",
              lineHeight: "1.6rem !important",
              letterSpacing: "-0.35px !important",
              textTransform: "none !important",
              borderColor: "#CFD2D9",
              "& .MuiTypography-root": {
                whiteSpace: "no-wrap !important",
              },
              "&.Mui-selected": {
                borderColor: "#171C8F",
                backgroundColor: "#171C8F !important",
                color: "#ffffff !important",
                fontWeight: "bold",
              },
            }}
          >
            <Typography>{`${label} ${getCount(label)}`}</Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default Toggle;
