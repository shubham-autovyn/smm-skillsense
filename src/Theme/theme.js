import { createTheme } from "@mui/material/styles";
import {
  MarutiBlue500,
  MarutiSilverDark,
  Grey20,
  Grey10,
  TypeSecondary,
  MarutiWhite,
  TypePrimary,
  MarutiSilver400,
  MarutiBlack,
  Grey30,
  Blue,
  Red,
  Yellow,
  Green,
  MarutiSilver200,
  TypeTertiary,
  Grey50,
  Yellow100
} from "../../src/utils/colors";

export const SMMTheme = createTheme({
  palette: {
    neutral: {
      main: MarutiBlue500,
      contrastText: "#fff",
    },
    first: {
      main: "#CE2A96",
    },
    Blue: {
      main: MarutiBlue500,
      contrastText: "#fff",
    },
    White: {
      main: MarutiWhite,
    },
    DarkGrey: {
      main: MarutiSilver400,
    },
    Base: {
      main: "#CE2A96",
    },
    LightBlue: {
      main: Blue,
    },
    Red: {
      main: Red,
    },
    Yellow: {
      main: Yellow,
    },
    Mustard: {
      main: "#d79d10",
    },
    Green: {
      main: Green,
    },
    LightGrey: {
      main: Grey10,
    },
    cType1: {
      main: "#2CBC80",
    },
    cType2: {
      main: "#F7D789",
    },
    cType3: {
      main: "#7B61FF",
    },
    Gray: {
      main: MarutiBlue500,
      light: MarutiSilver400,
      dark: MarutiSilverDark,
    },
    Grey: {
      main: TypeSecondary,
      light: Grey50,
      dark: TypePrimary,
    },
    Silver: {
      main: MarutiBlue500,
      light: MarutiSilver400,
      dark: MarutiSilverDark,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: window.screen.width <= 1280 ? (600 * 80) / 100 : 600,
      md: window.screen.width <= 1280 ? (900 * 80) / 100 : 900,
      lg: window.screen.width <= 1280 ? (1200 * 80) / 100 : 1200,
      xl: window.screen.width <= 1280 ? (1536 * 80) / 100 : 1536,
    },
  },
  typography: {
    root: {
      fontFamily: "Roboto",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.4rem",
      lineHeight: "2.8rem",
      letterSpacing: "-0.025em",
      color: "#343536",
    },
    h3: {
      fontWeight: "normal",
      fontSize: "2.0rem",
      lineHeight: "2.4rem",
      letterSpacing: "-0.025em",
      color: "#9EA1A7",
    },
    h4: {
      fontWeight: "bold",
      fontSize: "1.6rem",
      lineHeight: "2rem",
      letterSpacing: "-0.025em",
      color: "#343536",
    },
    h5: {
      fontWeight: "bold",
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
    },
    h6: {
      fontWeight: "400",
      fontSize: "1.2rem",
      lineHeight: "1.4rem",
      letterSpacing: "-0.025em",
    },
    h7: {
      fontSize: "1.6rem",
      lineHeight: "2rem",
      letterSpacing: "-0.025em",
      color: "#343536",
    },
    h8: {
      fontSize: "1.6rem",
      fontWeight: "600",
      lineHeight: "2rem",
      letterSpacing: "-0.025em",
      color: "#7A7C7E",
    },
    body1: {
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
    },
    subtitle2: {
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
      fontWeight: 700,
    },
    subtitle3: {
      fontSize: "1.3rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
      fontWeight: 600,
      color:"#66696B"
    },
    //SMM
    darkTitle:{
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
      fontWeight: 600,
      color: "#343536",
    },
    silverTitle:{
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
      fontWeight: 600,
      color: "#7A7C7E",
    },
    m4: {
      fontWeight: 600,
      fontSize: "12px",
      lineHeight: "normal",
      letterSpacing: "-0.3px",
      color: "#343536",
    },
    m4normal: {
      fontSize: "12px",
      lineHeight: "normal",
      letterSpacing: "-0.3px",
      color: "#343536",
    },
    //SMM test view
    testPrimary:{
      fontSize: "14px",
      lineHeight:"16px",
      color:TypePrimary
    },
  },
  components: {
    //breadcrumb
    MuiBreadcrumbs: {
      styleOverrides: {
        ol: {
          color: MarutiSilverDark,
          "& li": {
            "& .MuiTypography-root": {
              color: MarutiSilverDark,
            },
            "& .MuiLink-underlineAlways": {
              color: `${MarutiBlue500} !important`,
              textDecoration: "none !important",
            },
          },
        },
      },
    },

    //table
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: "0.8rem !important",

          boxShadow: "none",
          border: `0.1rem solid ${Grey20}`,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "inherit",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "0.8rem !important",

          "&.link": {
            color: MarutiBlue500,
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "underline",
          },
        },

        head: {
          fontWeight: "600 !important",
          fontSize: "1.4rem !important",
          lineHeight: "1.6rem !important",
          letterSpacing: "-0.025em !important",
          color: `${TypePrimary} !important`,
          backgroundColor: `${MarutiWhite} !important`,
    
        },
        body: {
          fontWeight: "normal",
          fontSize: "1.4rem !important",
          lineHeight: "1.6rem !important",
          letterSpacing: "-0.025em !important",
          color: TypeSecondary,
        },
        footer: {
          padding: "0rem !important",
          "&:hover": {
            backgroundColor: `${MarutiWhite} !important`,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {

          "&.active": {
            backgroundColor: Yellow100,
            "& .MuiTableCell-root": {
              color: `${TypePrimary} !important`,
            },
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderBottom: "0 !important",
        },
        toolbar: {
          fontSize: "1.4rem !important",
          lineHeight: "1.6rem !important",
          letterSpacing: "-0.025em !important",
          minHeight: "3.646rem !important",
          "&:hover": {
            backgroundColor: `${MarutiWhite} !important`,
          },
        },
        selectLabel: {
          fontSize: "1.4rem !important",
          lineHeight: "1.6rem !important",
          letterSpacing: "-0.025em !important",
        },
        displayedRows: {
          fontSize: "1.4rem !important",
          lineHeight: "1.6rem !important",
          letterSpacing: "-0.025em !important",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: "1.6rem !important",
          borderRadius: "0.8rem",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          marginBottom: "1.2rem",
          padding: 0,
          textTransform: "uppercase",
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
    MuiDialogActions: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
        },
      },
    },
    //Tabs
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: "1rem 0rem 0rem 0rem !important",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        textColorPrimary: {
          fontFamily: "Roboto",
          fontWeight: "normal",
          fontSize: "1.4rem !important",
          lineHeight: "1.6rem !important",
          letterSpacing: "-0.025em !important",
          color: TypeSecondary,
          textTransform: "inherit !important",
          minWidth: "fit-content !important",
          width: "fit-content !important",
          minHeight: "3.2rem !important",
          "& .bulk-tab-title .bulk-tab-subtitle": {
            fontWeight: "normal",
          },
        },
        root: {
          "&.MuiButtonBase-root": {
            height: "3.2rem !important",
          },
          "&.Mui-selected": {
            fontWeight: "600 !important",
            color: `${MarutiBlue500} !important`,
            "& .MuiTouchRipple-child": {
              backgroundColor: `${MarutiBlue500} !important`,
            },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: "fit-content !important",
        },
        indicator: {
          backgroundColor: `${MarutiBlue500} !important`,
        },
      },
    },
    //accordion
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: "none !important",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderBottom: "0 !important",
          borderRadius: "0.4rem",
          backgroundColor: Grey10,
          maxHeight: "4rem",
          padding: "1rem 0.8rem",
        },
        content: {
          "&.Mui-expanded .main-title": {
            color: "#171C8F",
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        padding: {
          padding: "0.8rem",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        gutters: {
          fontStyle: "normal !important",
          fontWeight: "normal !important",
          fontSize: "1.4rem !important",
          lineHeight: "1.6rem !important",
          letterSpacing: "-0.025em !important",
          color: `${TypeSecondary} !important`,
          borderBottom: `0.1rem solid ${Grey20} !important`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          width: "100%",
          border: "1px solid #e6e9f0",
          borderRadius: "0.8rem",
          boxShadow: "none",
        },
      },
    },
  },
});
