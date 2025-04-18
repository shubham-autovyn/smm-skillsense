import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";
const themeSelect = createTheme({
  palette: {
    neutral: {
      main: "#171C8F",
    },
    cType1: {
      main: "#6C60FF",
    },
    cType2: {
      main: "#D18A37",
    },
    cType3: {
      main: "#2CBC80",
    },
    cType4: {
      main: "#60C6FF",
    },
    sType1: {
      main: "#2CBC80",
    },
    sType2: {
      main: "#1FE5DA",
    },
    sType3: {
      main: "#FF6753",
    },
    sType4: {
      main: "#CE2A96",
    },
    sType5: {
      main: "#6C60FF",
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
  },
};
themeSelect.components.MuiSelect = {
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
      bottom: "0rem !important",
    },
    multiple: {
      "& .MuiBox-root": {
        bottom: "0.1rem",
        position: "relative",
      },
    },
  },
};
themeSelect.components.MuiInputBase = {
  styleOverrides: {
    formControl: {
      height: "2.6rem !important",
      marginTop: "0.6rem",
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
      marginTop: "-1.1rem !important",
      maxHeight: "fit-content !important",
      maxWidth: "fit-content !important",
      minWidth: "fit-content !important",
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
themeSelect.components.MuiModal = {
  styleOverrides: {
    root: {
      "&.MuiPopover-root.MuiMenu-root": {
        position: "relative !important",
        top: "-75rem !important",
        height: "20rem !important",
      },
    },
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function MultiSelect(props) {
  return (
    <div>
      <ThemeProvider theme={themeSelect}>
        <FormControl
          sx={{
            minWidth: window.screen.width <= 1280 ? (300 * 80) / 100 : 300,
            width: props.width,
            height: "3.2rem",
          }}
        >
          <Select
            color="neutral"
            id="demo-multiple-chip"
            multiple
            className="custom-select"
            startAdornment={
              <InputAdornment position="start">
                <span
                  style={{ position: "relative", bottom: "0.3rem" }}
                  className="select-label font-regular font-normal"
                >
                  {props.label}:
                </span>
              </InputAdornment>
            }
            value={props.value}
            onChange={props.handleChange}
            renderValue={props.renderValue}
            MenuProps={MenuProps}
          >
            {props.children}
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
}
