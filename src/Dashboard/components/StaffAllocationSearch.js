import { Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Grey30,
  MarutiBlue500,
  TypeSecondary,
  TypeTertiary,
} from "../../../Utilities/colors";
import Magnify from "../../assets/icons/MagnifyBlue.svg";
import { SMMTheme } from "../../Theme/theme";

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

const StaffAllocationSearch = ({
  allocationStaffData,
  handleStaffSelection,
  selectedData,
  placeholder,
  handleClearFilter,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [shouldRender, setShouldRender] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setShouldRender(true);
  }, []);

  useEffect(() => {
    if (allocationStaffData) {
      const data = allocationStaffData?.map((staff) => {
        return {
          label: `${staff?.name} | ${staff?.staffId}`,
          value: staff?.staffId,
        };
      });
      setOptions(data);
    }
  }, [allocationStaffData]);

  useEffect(() => {
    setSelectedValue(selectedData);
  }, [selectedData]);

  const renderOption = (props, options) => {
    const isAdded = props?.["aria-selected"];
    return (
      <li
        {...props}
        style={{
          backgroundColor: "transparent",
          borderBottom: "1px solid #E6E9F0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="silverTitle"
            sx={{
              color: isAdded ? TypeTertiary : TypeSecondary,
              fontWeight: "500",
            }}
          >
            {options?.label || ""}
          </Typography>
        </Box>
      </li>
    );
  };

  const SearchIcon = () => {
    if (!shouldRender) {
      return null;
    }
    return (
      <div
        style={{
          position: "absolute",
          right: 10,
          top: 8,
          bottom: 10,
        }}
      >
        <img
          style={{
            height: "1.801rem",
            width: "1.801rem",
            marginTop: 1,
          }}
          src={Magnify}
          alt="search"
        />
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Autocomplete
          id="search-select"
          noOptionsText="No record found"
          options={options}
          clearIcon={null}
          value={selectedValue}
          getOptionLabel={(value) => {
            return value?.label || "";
          }}
          onChange={(event, newValue) => {
            setSelectedValue(newValue);
            handleStaffSelection(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            if (newInputValue === "") {
              handleClearFilter();
            }
          }}
          renderOption={renderOption}
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
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder || ""}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                    <SearchIcon />
                  </>
                ),
              }}
            />
          )}
        />
      </Box>
    </ThemeProvider>
  );
};

export default StaffAllocationSearch;
