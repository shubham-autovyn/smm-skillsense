import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
  Box,
  Checkbox,
  createTheme,
  ThemeProvider
} from "@mui/material";
import Cross from "../../../../assets/icons/Cross.svg";
import { MarutiBlue500 } from "../../../../../Utilities/colors";
import CheckEmpty from "../../../../assets/icons/CheckEmpty.svg";
import CheckFill from "../../../../assets/icons/CheckFill.svg";

export default function CustomMultiSelect({ options, selected, handleSelect }) {
  const themeMultiSelect = createTheme({
    palette: {
      neutral: {
        main: "#171C8F",
      },
    },
  });
  themeMultiSelect.components.MuiOutlinedInput = {
    styleOverrides: {
      notchedOutline: {
        backgroundColor:"#ffffff !important",
        "& legend": {
          display: "none",
        },
      },
    },
  };
  themeMultiSelect.components.MuiSelect = {
    styleOverrides: {
      outlined: {
        fontFamily: "Roboto !important",
        fontStyle: "normal !important",
        fontWeight: "normal !important",
        fontSize: "1.4rem !important",
        lineHeight: "1.6rem !important",
        letterSpacing: "-0.025em !important",
        color: " #000000 !important",
        marginLeft: "0.5rem !important",
        position: "relative !important",
        bottom: "0.2rem !important",
        padding: " 1rem 0.6rem",
        zIndex:"20"
      },
      multiple: {
        "& .MuiBox-root": {
          bottom: "0.1rem",
          position: "relative",
        },
      },
    },
  };
  themeMultiSelect.components.MuiInputBase = {
    styleOverrides: {
      formControl: {
        height: "3.7rem !important",
        marginTop: "0rem",
        backgroundColor:"#ffffff !important",
        zIndex:"2000"
      },
      root:{
        "& .MuiSvgIcon-root":{
          zIndex:"2001"
        }
      }
    },
  };
  themeMultiSelect.components.MuiList = {
    styleOverrides: {
      padding: {
        padding: "0.8rem !important",
        "&.MuiList-root.MuiMenu-list": {
          maxHeight: "25rem !important",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#c4c4c4 #f4f5f8",
          "&::-webkit-scrollbar": {
            width: " 1.2rem",
          },
          "&::-webkit-scrollbar-track": {
            background: " #ffffff",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c4c4c4",
            "&:hover":{
              backgroundColor: "#97999B !important"
            },
            height: "3rem",
            borderRadius: "2rem",
            border: "0.4rem solid #ffffff",
          },
        },
      },
    },
  };
  themeMultiSelect.components.MuiPaper = {
    styleOverrides: {
      rounded: {
        borderRadius: "0.8rem",
      },
    },
  };

  themeMultiSelect.components.MuiMenuItem = {
    styleOverrides: {
      gutters: {
        fontStyle: "normal !important",
        fontWeight: "normal !important",
        fontSize: "1.4rem !important",
        lineHeight: "1.6rem !important",
        letterSpacing: "-0.025em !important",
        color: "#66696b !important",
        borderBottom: "0.1rem solid #e6e9f0 !important",

      },
    },
  };
  themeMultiSelect.components.MuiTypography = {
    styleOverrides: {
      root: {
        fontStyle: "normal !important",
        fontWeight: "normal !important",
        fontSize: "1.4rem !important",
        lineHeight: "1.6rem !important",
        letterSpacing: "-0.025em !important",
      },
    },
  };
  const MenuProps = {
    PaperProps: {
      style: {
        width: "inherit",
        maxHeight: "250px",
        padding: "0px !important",
      },
    },
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
      }}
    >
    <ThemeProvider theme={themeMultiSelect}>
      <Select
        sx={{
          minHeight: "4.2rem",
          width: "inherit",
          borderColor: "red",
          ".MuiSelect-select": {
            padding: "0.7rem !important",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px !important",
            borderColor: "#E6E9F0 !important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: MarutiBlue500,
          },
        }}
        multiple
        value={selected}
        // onChange={(e) => setSelectedNames(e.target.value)}
        onChange={(e) => handleSelect(e.target.value)}
        MenuProps={MenuProps}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                sx={{
                  background: "#E6E9F0 !important",
                  height: "2.8rem",
                  "& .MuiChip-label": {
                    display: "block",
                    fontSize: "1.4rem",
                    color: "#343536",
                    whiteSpace: "normal",
                  },
                }}
                key={value?.topicId}
                label={value?.topicName}
                onDelete={() =>
                  handleSelect(
                    selected.filter((item) => item.topicId !== value.topicId)
                  )
                }
                deleteIcon={
                  <img
                    src={Cross}
                    alt="cross"
                    style={{ width: 18, height: 18 }}
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {options.map((item) => (
          <MenuItem key={item.topicId} value={item} sx={{ gap: 1 }}>
            <Checkbox
              sx={{ padding: "2px !important" }}
              checked={selected.some((obj) => obj.topicId === item.topicId)}
              icon={
                <img
                  alt="download"
                  src={CheckEmpty}
                  style={{
                    cursor: "pointer",
                    height: "1.602rem",
                    width: "1.6rem",
                  }}
                />
              }
              checkedIcon={
                <img
                  alt="download"
                  src={CheckFill}
                  style={{
                    cursor: "pointer",
                    height: "1.602rem",
                    width: "1.6rem",
                  }}
                />
              }
            />
            {item.topicName}
          </MenuItem>
        ))}
      </Select>
      </ThemeProvider>
    </Box>
  );
}
