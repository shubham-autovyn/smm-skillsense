import { Button, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from "react";
import { MarutiBlue500 } from "../../../src/utils/colors";

const theme = createTheme({
  palette: {
    neutral: {
      main: MarutiBlue500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          textColor: MarutiBlue500,
          minWidth: "9.9rem",
          height: "3.2rem",
          fontFamily: "Roboto",
          fontWeight: "normal",
          fontSize: "1.4rem",
          lineHeight: "1.6rem",
          letterSpacing: "-0.025em",
          textTransform: "none",
          "&:disabled": {
            backgroundColor: "rgb(187 187 187) !important",
            color: "#BDBDBD",
            borderColor: "rgb(187 187 187) !important",
            cursor: "not-allowed",
          },
        },
      },
    },
  },
});

const SecondaryButtonWithIcon = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        color="neutral"
        className="custom-button"
        disabled={props?.disabled}
        style={{
          borderColor: MarutiBlue500,
          backgroundColor: props.backgroundColor,
          color: props.textColor,
        }}
        {...props}
      >
        {props.children}
      </Button>
    </ThemeProvider>
  );
};

export default SecondaryButtonWithIcon;
