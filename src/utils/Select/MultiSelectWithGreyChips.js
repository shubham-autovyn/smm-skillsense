import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";

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
      backgroundColor: "#ffffff !important",
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
      zIndex: "2000",
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
      backgroundColor: "#ffffff !important",
      zIndex: "2000",
    },
    root: {
      "& .MuiSvgIcon-root": {
        zIndex: "2001",
      },
    },
  },
};
themeMultiSelect.components.MuiList = {
  styleOverrides: {
    padding: {
      padding: "0.8rem !important",
      "&.MuiList-root.MuiMenu-list": {
        maxHeight: "15rem !important",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "#c4c4c4 #fff",
        "&::-webkit-scrollbar": {
          width: " 1rem",
          height: "1rem",
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
themeMultiSelect.components.MuiPaper = {
  styleOverrides: {
    rounded: {
      borderRadius: "0.8rem",
    },
  },
};
themeMultiSelect.components.MuiPaper = {
  styleOverrides: {
    elevation: {
      position: "relative !important",
      maxHeight: "fit-content !important",
      maxWidth: "fit-content !important",
      minWidth: "fit-content !important",
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
      paddingTop: "0rem",
      paddingBottom: "0rem",
      paddingLeft: "0rem",
      paddingRight: "1rem",
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
themeMultiSelect.components.MuiModal = {
  styleOverrides: {
    root: {
      "&.MuiPopover-root.MuiMenu-root": {
        height: "20rem !important",
      },
    },
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultiSelectWithGreyChips(props) {
  return (
    <ThemeProvider theme={themeMultiSelect}>
      <FormControl
        sx={{
          width: props?.width ? props?.width : "21.2rem",
          height: "3.1rem",
        }}
      >
        <Select
          color="neutral"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": props.error
              ? {
                  outline: "auto !important",
                  outlineColor: "#D85140 !important",
                }
              : "inherit",
          }}
          id="demo-multiple-chip"
          multiple
          className="custom-select"
          value={props.value}
          onChange={props.handleChange}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                overflowX: "auto",
                gap: 0.5,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none !important" },
              }}
            >
              {selected.map((value, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#EFECEC",
                    color: "#66696B",
                    borderRadius: "0.4rem",
                    padding: "0.3rem 1rem",
                  }}
                >
                  {value}
                </div>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.children}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}
