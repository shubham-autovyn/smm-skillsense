import { IconButton, TextField } from "@mui/material";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import {
  Grey30,
  MarutiBlue500,
  TypeTertiary,
} from "../../../../../../Utilities/colors";
import Magnify from "../../../../../assets/icons/Magnify.svg";
const theme = createTheme({
  palette: {
    neutral: {
      main: MarutiBlue500,
    },
  },
});

theme.components.MuiInputBase = {
  styleOverrides: {
    formControl: {
      height: "3.2rem !important",
    },
  },
};
theme.components.MuiOutlinedInput = {
  styleOverrides: {
    root: {
      outline: Grey30,
      height: "3.2rem",
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
      flexWrap: "inherit !important",
      minWidth: "50px !important",
      paddingRight: "5rem !important",
      paddingLeft: "0rem",
    },
    endAdornment: {
      paddingTop: "0",
      "@media (min-width: 1281px)": {
        // paddingTop: "1.5%",
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
    option: {
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

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState("");
  const SearchIcon = () => {
    return (
      <img
        style={{
          height: "1.601rem",
          width: "1.601rem",
        }}
        src={Magnify}
        alt="search"
      />
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        disablePortal
        noOptionsText="No record found"
        clearIcon={null}
        inputValue={inputValue}
        popupIcon={
          <IconButton onClick={props.onSearchClick}>
            <SearchIcon />
          </IconButton>
        }
        options={props.options}
        sx={{
          width: 300,
          [`& .${autocompleteClasses.popupIndicator}`]: {
            transform: "none",
          },
        }}
        getOptionLabel={(option) => {
          if (option?.name) {
            return `${option.name} | ${option.id}`;
          }
          return "";
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name} | {option.id}
          </li>
        )}
        onChange={(event, value) => {
          props.onChange(value);
          setInputValue(value?.name || "");
        }}
        onInputChange={(event, value, reason) => {
          if (reason !== "reset") {
            setInputValue(value);
            props.onInputChange(value);
          }
        }}
        renderInput={(params) => (
          <TextField
            placeholder={props.placeholder}
            {...params}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
    </ThemeProvider>
  );
};

export default SearchBar;
