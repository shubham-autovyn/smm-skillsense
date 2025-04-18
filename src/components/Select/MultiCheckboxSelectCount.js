import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem, ListItemText, Select, Checkbox, Box } from "@mui/material";
import { MarutiBlue500 } from "../../utils/colors"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckEmpty from "../../assets/icons/CheckEmpty.svg";
import CheckFill from "../../assets/icons/CheckFill.svg";
const themeMultiSelect = createTheme({
  palette: {
    neutral: {
      main: "#171C8F",
    },
  },
});

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
      bottom: "-0.2rem !important",
      padding: " 1rem 0.6rem",
    },
    multiple: {
      "& .MuiBox-root": {
        bottom: "0.1rem",
        position: "relative",
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
      marginTop: "-1.1rem !important",
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
        height: "60rem !important",
        marginTop: "10px",
        width: "20rem !important",
      },
    },
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "inherit !important",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
};

export default function MultiSelectWithGreyChips({
  selected,
  data,
  placeholder,
  sx = {},
  handleChange,
  disabled,
}) {
  return (
    <ThemeProvider theme={themeMultiSelect}>
      <Select
        disabled={disabled}
        color="neutral"
        sx={{
          height: "3.2rem !important",
          width: "inherit",
          fontWeight: "",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: MarutiBlue500,
          },
          ...sx,
        }}
        id="demo-multiple-chip"
        multiple
        displayEmpty
        className="custom-select"
        value={selected}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownIcon}
        renderValue={(selected) => {
          if (selected?.length === 0) {
            return placeholder;
          }
          if (selected?.length === 1) {
            return selected[0];
          }
          return `${selected?.length} Items`;
        }}
        MenuProps={MenuProps}
      >
        {data?.map((val, index) => (
          <MenuItem
            key={index}
            value={val}
            sx={{ height: "3.2rem !important", ...sx }}
          >
            <Checkbox
              sx={{
                color: MarutiBlue500,
                "&.Mui-checked": {
                  color: MarutiBlue500,
                },
              }}
              checked={selected.indexOf(val) > -1}
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
            <ListItemText primary={val} />
          </MenuItem>
        ))}
      </Select>
    </ThemeProvider>
  );
}
