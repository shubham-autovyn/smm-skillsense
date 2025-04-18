import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grey30, MarutiBlue500 } from "../colors";
const theme = createTheme({
  palette: {
    neutral: {
      main: MarutiBlue500,
    },
  },
});
theme.components.MuiOutlinedInput = {
  styleOverrides: {
    root: {
      borderColor: `${Grey30} !important`,

      outline: Grey30,
      "& fieldset": {
        borderColor: Grey30,
        ouline: "none",
      },

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
  },
};
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
      lineHeight: "2.8rem !important",
      letterSpacing: "-0.025em !important",
      color: " #000000 !important",
      marginLeft: "-0.6rem !important",
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
      overflowY: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: "#c4c4c4 #fff",
      "&::-webkit-scrollbar": {
        width: " 1rem",
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
theme.components.MuiPaper = {
  styleOverrides: {
    elevation: {
      position: "relative !important",
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

const MuiSelect = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        error={props?.error}
        id={props.id}
        name={props.name}
        required={props.required}
        select
        SelectProps={{
          MenuProps: {
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          },
        }}
        style={{ minWidth: "9.9rem" }}
        className="custom-select"
        disabled={props.disabled ? props.disabled : false}
        fullWidth={true}
        value={props.value ? props.value : ""}
        color="neutral"
        onChange={props.onChange}
      >
        {props.children ? (
          props.children
        ) : (
          <MenuItem style={{ display: "none" }} key={"none"} value={""}>
            ""
          </MenuItem>
        )}
      </TextField>
    </ThemeProvider>
  );
};
export default MuiSelect;
