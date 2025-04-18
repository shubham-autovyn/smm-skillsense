import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    neutral: {
      main: "#171C8F",
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
theme.components.MuiSelect = {
  styleOverrides: {
    outlined: {
      fontFamily: "Roboto !important",
      fontStyle: "normal !important",
      fontWeight: "normal !important",
      fontSize: "1.4rem !important",
      lineHeight: "1.6rem !important",
      letterSpacing: "-0.025em !important",
      color: " #66696B !important",
      marginLeft: "0.5rem !important",
      position: "relative !important",
      top: "0.2rem !important",
    },
  },
};
theme.components.MuiList = {
  styleOverrides: {
    padding: {
      padding: "0.8rem !important",
    },
    root: {
      maxHeight: "16rem",
      overflowY:"auto",
      scrollbarWidth: "thin",
      scrollbarColor: "#c4c4c4 #f4f5f8",
      '&::-webkit-scrollbar': {
        width:" 1.2rem",
      },
      '&::-webkit-scrollbar-track': {
        background:" #ffffff",
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: "#c4c4c4",
        "&:hover":{
          backgroundColor: "#97999B !important"
        },
        height: "3rem",
        borderRadius: "2rem",
        border: "0.4rem solid #ffffff",
      }
    },
  },
};
theme.components.MuiPaper = {
  styleOverrides: {
    elevation: {
      position: "relative !important",
      marginTop: "-1.1rem !important",
      maxHeight: "fit-content !important",
      maxWidth: "fit-content !important",
      borderRadius: "0.8rem",
    },
  },
};
theme.components.MuiMenuItem = {
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
theme.components.MuiOutlinedInput = {
    styleOverrides: {
      root: {
        height: "3.2rem",
        borderColor: "#CFD2D9 !important",
  
        outline: "#CFD2D9",
        "& fieldset": {
          borderColor: "#CFD2D9",
          ouline: "none",
        },
  
        "&.Mui-focused": {
          "&:hover fieldset": {
            borderColor: "#CFD2D9",
            ouline: "none",
          },
        },
        "&:hover": {
          "&:hover fieldset": {
            borderColor: "#CFD2D9",
            ouline: "none",
          },
        },
      },
      input: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        padding: "0.4rem",
        fontWeight: "normal",
        fontSize: "1.4rem",
        borderColor: "#CFD2D9 !important",
        lineHeight: "1.6rem",
        letterSpacing: "-0.025em",
        color: "#66696B",
        "&::placeholder": {
          color: "#9EA1A7 !important",
        },
      },
    },
  };

const FormInputSelect = (props) => {
  return (
    <ThemeProvider theme={theme}>
        <TextField
          id={props.id}
          name={props.name}
          required={props.required}
          select
          onBlur={props.blur}
          style={{ minWidth: "9.9rem" }}
          className="custom-select"
          disabled={props.disabled ? props.disabled : false}
          fullWidth={true}
          value={props.value}
          color="neutral"
          placeholder={props.placeholder}
          onChange={props.onChange}>
          {props.children}
        </TextField>
    </ThemeProvider>
  );
};
export default FormInputSelect;
