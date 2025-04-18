import React from 'react';
import { Button, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { MarutiBlue500 , Grey30} from '../../../Utilities/colors';

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
          minWidth: "9.9rem",
          height: "3.2rem",
          fontFamily: "Roboto",
          fontWeight: "normal",
          fontSize: "1.4rem",
          lineHeight: "1.6rem",
          letterSpacing: "-0.025em",
          color: "#66696b",
          borderColor: Grey30,
          textTransform: "none",
        },
      },
    },
  },
});

const CustomButton = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        color="neutral"
        className="custom-button"
        style={{ borderColor: Grey30 }} 
        {...props} 
      >
        {props.children}
      </Button>
    </ThemeProvider>
  );
};

export default CustomButton;
