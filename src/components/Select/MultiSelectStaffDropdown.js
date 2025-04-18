import { Autocomplete, Box, TextField, Chip, Stack } from "@mui/material";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grey30, MarutiBlue500, TypeTertiary } from "../../utils/colors";
import { SMMTheme } from "../../Theme/theme";
import Magnify from "../../assets/icons/Magnify.svg";
import Cross from "../../assets/icons/Cross.svg";

const theme = createTheme({
  ...SMMTheme,
  palette: {
    neutral: {
      main: MarutiBlue500,
    },
  },
});

theme.components.MuiOutlinedInput = {
  styleOverrides: {
    root: {
      outline: Grey30,
      height: "2rem",
      P: 0,
      m: 0,
      backgroundColor: "white",
      ouline: "none",
      borderColor: Grey30,
      width: "100%",
    },
    input: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      padding: "0.4rem",
      fontWeight: "normal",
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
      width: "100%",
      "&::placeholder": {
        color: TypeTertiary,
        opacity: 1,
      },
    },
  },
};
theme.components.MuiAutocomplete = {
  styleOverrides: {
    root: {
      width: "100% !important",
    },
    inputRoot: {
      // flexWrap: "inherit !important",
      minWidth: "50px !important",
      paddingRight: "5rem !important",
      paddingLeft: "0.4rem",
      paddingTop: "0rem",
      paddingBottom: "0rem",
      height: "auto",
    },
    endAdornment: {
      paddingTop: "3%",
      "@media (min-width: 1281px)": {
        paddingTop: "1.5%",
      },
    },
    input: {},
    paper: {
      borderRadius: "0.8rem",
    },
    listbox: {
      padding: "0.8rem !important",
      maxHeight: "16rem",
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
        "&:hover": {
          backgroundColor: "#97999B !important",
        },
        height: "3rem",
        borderRadius: "2rem",
        border: "0.4rem solid #ffffff",
      },
    },
  },
};

const MultiSelectStaffDropdown = ({
  placeHolder,
  handleChange,
  options,
  disabled,
  limitTags = 1, // Number only
  selectedOptions = [],
}) => {
  const SearchIcon = () => {
    return (
      <div style={{ position: "absolute", right: 10, top: 6, bottom: 10 }}>
        <img
          style={{ height: "1.601rem", width: "1.601rem", marginTop: 1 }}
          src={Magnify}
        />
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Autocomplete
          clearIcon={null}
          multiple
          value={selectedOptions}
          limitTags={limitTags}
          disabled={disabled}
          noOptionsText="No record found"
          onChange={(event, newValue) => {
            const filterNew = newValue?.filter((check) => check?.value);
            handleChange(filterNew);
          }}
          options={options}
          getOptionLabel={(option) => {
            return option?.label ? option?.label : "";
          }}
          isOptionEqualToValue={(check, item) => {
            return check?.value === item?.value;
          }}
          sx={{
            padding: "0px !important",
            width: "inherit",
            ".MuiSelect-select": {
              padding: "0.7rem !important",
            },
            "& .MuiOutlinedInput": {
              height: "3.2rem !important",
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderWidth: "1px !important",
              borderColor: "#E6E9F0 !important",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: MarutiBlue500,
            },
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              return (
                <Stack key={index} direction="row" spacing={1}>
                  <Chip
                    sx={{
                      background: "#E6E9F0 !important",
                      height: "2.8rem",
                      "& .MuiChip-label": {
                        display: "block",
                        fontSize: "1.4rem",
                        color: "#343536",
                        whiteSpace: "normal",
                        fontFamily: "Roboto",
                      },
                    }}
                    label={option?.label}
                    {...getTagProps({ index })}
                    onDelete={() => {
                      const newValues = [...selectedOptions];
                      newValues.splice(index, 1);
                      handleChange(newValues);
                    }}
                    deleteIcon={
                      <img
                        src={Cross}
                        alt="cross"
                        style={{ width: 18, height: 18 }}
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                  />
                </Stack>
              );
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: false,
                style: { position: "unset" },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    <SearchIcon />
                  </React.Fragment>
                ),
              }}
              variant="outlined"
              placeholder={placeHolder || "Search by Staff Id, Name"}
            />
          )}
        />
      </Box>
    </ThemeProvider>
  );
};
export default MultiSelectStaffDropdown;
