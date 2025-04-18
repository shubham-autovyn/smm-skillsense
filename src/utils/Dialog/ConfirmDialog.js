import * as React from "react";
import { DialogTitle, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./DialogCard.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MarutiBlue500 , TypeSecondary, TypePrimary, TypeTertiary} from "../colors";

const themeDialog = createTheme({
  palette: {
    neutral: {
      main: MarutiBlue500,
      contrastText: "#fff",
    },
    first: {
      main: "#CE2A96",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: window.screen.width <= 1536 ? (600 * 80) / 100 : 600,
      md: window.screen.width <= 1536 ? (900 * 80) / 100 : 900,
      lg: window.screen.width <= 1536 ? (1200 * 80) / 100 : 1200,
      xl: window.screen.width <= 1536 ? (1536 * 80) / 100 : 1536,
    },
  },
  typography: {
    root: {
      fontFamily: "Roboto",
    },
    body1: {
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.4rem",
      lineHeight: "2.8rem",
      letterSpacing: "-0.025em",
      color: TypePrimary,
    },
    h3: {
      fontWeight: "normal",
      fontSize: "2.0rem",
      lineHeight: "2.4rem",
      letterSpacing: "-0.025em",
      color: TypeTertiary,
    },
    h4: {
      fontWeight: "bold",
      fontSize: "1.6rem",
      lineHeight: "2rem",
      letterSpacing: "-0.025em",
      color: TypePrimary,
    },
    h5: {
      fontWeight: "bold",
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
    },
    h6: {
      fontWeight: "normal",
      fontSize: "1.2rem",
      lineHeight: "1.4rem",
      letterSpacing: "-0.025em",
    },
    subtitle2: {
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
      fontWeight: 700,
    },
  },
});
themeDialog.components = {
  MuiDialog: {
    styleOverrides: {
      paper: {
        padding: "1.6rem 2rem 0.6rem 2rem !important",
        borderRadius: "0.8rem",
        minWidth: "350px",
        maxWidth: "370px"
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        marginBottom: "1.2rem",
      },
    },
  },
  MuiTabPanel: {
    styleOverrides: {
      root: {
        padding: "1rem 0 0 0 !important",
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: "0 !important",
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
        color: TypeSecondary,
        textTransform: "capitalize !important",
        minWidth: "fit-content !important",
        width: "fit-content !important",
        minHeight: "3.2rem !important",
        "& .bulk-tab-title .bulk-tab-subtitle": {
          fontWeight: "normal",
        },
      },
      root: {
        "&.Mui-selected": {
          fontWeight: "600 !important",
          color: `${TypePrimary} !important`,
          "& .MuiTouchRipple-child": {
            backgroundColor: `${MarutiBlue500} !important`,
          },
        },
      },
    },
  },
};
themeDialog.components.MuiTabs = {
  styleOverrides: {
    root: {
      minHeight: "fit-content !important",
    },
    indicator: {
      backgroundColor: `${MarutiBlue500} !important`,
    },
  },
};
themeDialog.components.MuiDialogActions = {
  styleOverrides: {
    root: {
      justifyContent: "space-between",
    },
  },
};

const DialogCard = (props) => {
  return (
    <ThemeProvider theme={themeDialog}>
      <Dialog
        open={props.open ? props.open : false}
        fullWidth={props.fullWidth}
        maxWidth={props.maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="pqc-dialog-title-container"
        >
          <div className="pqc-dialog-title" style={{color:props.color?props.color:TypeSecondary}}>{props.title}</div>
          <div className="pqc-dialog-close">
            {props.handleClose !== undefined && (
              <CloseIcon
                style={{ cursor: "pointer" }}
                aria-label="close"
                onClick={props.handleClose}
              />
            )}
          </div>
        </DialogTitle>
        {props.children}
      </Dialog>
    </ThemeProvider>
  );
};
export default DialogCard;