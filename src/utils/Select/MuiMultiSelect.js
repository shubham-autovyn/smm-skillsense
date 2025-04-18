import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { Grey30 } from "../colors";
const themeSelect = createTheme({
  palette: {
    neutral: {
      main: "#171C8F",
    },
  },
});
themeSelect.components.MuiOutlinedInput = {
  styleOverrides: {
    notchedOutline: {
      "& legend": {
        display: "none",
      },
    },
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
themeSelect.components.MuiSelect = {
  styleOverrides: {
    outlined: {
      fontFamily: "Roboto !important",
      fontStyle: "normal !important",
      fontWeight: "normal !important",
      fontSize: "1.4rem !important",
      // lineHeight: "2.8rem !important",
      letterSpacing: "-0.025em !important",
      color: " #000000 !important",
      marginLeft: "-0.6rem !important",
      position: "relative !important",
      bottom: "0rem !important",
    },
    // multiple: {
    //   "& .MuiBox-root": {
    //     bottom: "0.1rem",
    //     position: "relative",
    //   },
    // },
  },
};
themeSelect.components.MuiInputBase = {
  styleOverrides: {
    formControl: {
      height: "2.4rem !important",
      marginTop: "0.8rem",
      // height: "3.2rem !important",
    },
  },
};
themeSelect.components.MuiList = {
  styleOverrides: {
    padding: {
      padding: "0.8rem !important",
      "&.MuiList-root.MuiMenu-list": {
        maxHeight: "15rem !important",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "#c4c4c4 #f4f5f8",
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
  },
};
themeSelect.components.MuiPaper = {
  styleOverrides: {
    rounded: {
      borderRadius: "0.8rem",
    },
  },
};
themeSelect.components.MuiPaper = {
  styleOverrides: {
    elevation: {
      position: "relative !important",
      maxHeight: "fit-content !important",
      maxWidth: "fit-content !important",
    },
  },
};
themeSelect.components.MuiMenuItem = {
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

export default function MultiSelect(props) {
  return (
    <div>
      <ThemeProvider theme={themeSelect}>
        <FormControl
          sx={{
            width: "100%",
            // height: "3.2rem",
          }}
          error={props?.error}
        >
          <Select
            color="neutral"
            // id="demo-multiple-chip"
            multiple
            className="custom-select"
            value={props.value}
            onChange={props.onChange}
            renderValue={props.renderValue}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
            }}
          >
            {props.children ? (
              props.children
            ) : (
              <MenuItem style={{ display: "none" }} key={"none"} value={""}>
                ""
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
}
