import * as React from "react";
import {DialogTitle,IconButton,Dialog} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./CustomDialogCard.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const themeDialog = createTheme(
  {breakpoints: {
    values: {
      xs: 0,
      sm: window.screen.width<=1280?(600*80/100):600,
      md: window.screen.width<=1280?(900*80/100):900,
      lg: window.screen.width<=1280?(1200*80/100):1200,
      xl: window.screen.width<=1280?(1536*80/100):1536,
    },
  },}
);
themeDialog.components = {
  MuiTabPanel: {
    styleOverrides: {
      root: {
        padding: "1rem 0 0 0 !important",
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      textColorPrimary: {
        fontWeight: "600",
        fontSize: "1.4rem !important",
        lineHeight: "1.6rem !important",
        letterSpacing: "-0.025em !important",
        color: "#66696B",
        textTransform: "capitalize !important",
        minWidth: "fit-content !important",
        width: "fit-content !important",
        minHeight: "3.2rem !important",
        "& .bulk-tab-title .bulk-tab-subtitle":{
          fontWeight: "normal",
        }
      },
      root: {
        "&.Mui-selected": {
          fontWeight: "600 !important",
          color: "#343536 !important",
          "& .MuiTouchRipple-child":{
            backgroundColor: "#171C8F !important"
          }
        },
      },
    },
  },
};
themeDialog.components.MuiTabs = {
  styleOverrides: {
    root:{
      minHeight:"fit-content !important",
    },
    indicator: {
      backgroundColor: "#171C8F !important",
    },
  },
};
themeDialog.components.MuiDialogActions={
  styleOverrides:{
    root:{
      justifyContent:"space-between"
    }
  }
}

const DialogCard = (props) => {
  return (
    <ThemeProvider theme={themeDialog}>
      <Dialog
        open={props.open ? props.open : false}
        onClose={props.handleClose}
        fullWidth={props.fullWidth}
        maxWidth={props.maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="custom-dialog-title-container">
          <div className="custom-dialog-title">{props.title}</div>
          <div className="custom-dialog-close">
            {props.handleClose!==undefined && <IconButton aria-label="close" onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>}
          </div>
        </DialogTitle>
        {props.children}
      </Dialog>
    </ThemeProvider>
  );
};
export default DialogCard;
