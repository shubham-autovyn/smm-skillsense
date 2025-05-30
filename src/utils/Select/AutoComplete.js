import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grey30, MarutiBlue500 } from "../colors";
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
      borderColor: `${Grey30} !important`,
      paddingTop: "0px !important",
      paddingBottom: "0px !important",
      outline: Grey30,
      "& fieldset": {
        borderColor: Grey30,
        ouline: "none",
      },
      // "& span":{
      //   // paddingBottom: "3.5%",
      //   "@media (min-width: 1281px)": {
      //     // paddingBottom: "2%",
      //   },
      // },

      "&.Mui-focused": {
        "&:hover fieldset": {
          borderColor: Grey30,
          ouline: "none",
        },
      },
      "&:hover": {
        "&:hover fieldset": {
          borderColor: Grey30,
          ouline: "none",
        },
      },
    },
    input: {
      fontFamily: "Roboto !important",
      fontStyle: "normal !important",
      fontWeight: "normal !important",
      fontSize: "1.4rem !important",
      lineHeight: "1.6rem !important",
      letterSpacing: "-0.025em !important",
      color: " #000000 !important",
      left:1,
      // width:"6rem"
      // backgroundColor:"yellow",
      // right: "1rem !important",
      // position: "relative",
      // border:"1px solid red !important",

      // bottom: "13%",
      // "@media (min-width: 1281px)": {
      //   bottom: "6%",
      // },
      
    },
  },
};
theme.components.MuiAutocomplete = {
  styleOverrides: {
    root: {
      width: "100% !important",
      
      // border:"1px solid red"
      
    },
    inputRoot:{
      flexWrap:"inherit !important",
      minWidth:"50px !important"
    },
    endAdornment: {
      paddingTop: "2%",
      "@media (min-width: 1281px)": {
        paddingTop: "1%",
      },
    },
    input:{
     
    },
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
        "&:hover":{
          backgroundColor: "#97999B !important"
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

const CustomAutoComplete = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={props.data}
        color="neutral"
        sx={{ width: 200 }}
        value={props.value ? props.value : ""}
        onChange={(event, newValue) => {
          props.onChange(newValue !== null ? newValue : "");
        }}
        inputValue={props.value}
        onInputChange={(event, newInputValue) => {
          props.onChange(newInputValue !== null ? newInputValue : "");
        }}
        renderInput={(params) => {
          // console.log(params);
          return (
            <TextField
              color="neutral"
              style={{ minWidth: "12rem" }}
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <span
                    className="select-label font-regular font-normal"
                    style={{
                      // border:"1px solid green"
                      // paddingBottom: "4%",
                      // "@media (min-width: 1281px)": {
                      //   paddingBottom: "0%",
                      // },
                    }}
                  >
                    {props.label}:
                  </span>
                ),
              }}
            />
          );
        }}
      />
    </ThemeProvider>
  );
};

export default CustomAutoComplete;
