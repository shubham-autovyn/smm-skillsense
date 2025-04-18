import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MarutiBlue500, StatusGreen, StatusRed } from "../../../../src/utils/colors";
import "./RoundFilterButton.css";
const theme = createTheme({
  palette: {
    neutral: {
      main: MarutiBlue500,
      contrastText: "#fff",
    },
    Blue: {
      main: MarutiBlue500,
      contrastText: "#fff",
    },
  },
});
const RoundFilterButton = ({ sx = {}, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        sx={{
          ...sx,
          borderRadius:"20px !important",
          "&.Mui-disabled": {
            color: "#9EA1A7",
            borderColor: "#9EA1A7",
            opacity:0.6
          },
        }}
        onClick={props.onClick}
        className="secondary-button-root"
        color="neutral"
        variant="outlined"
        disabled={props.disabled ? props.disabled : false}
      >
        {props.children}
      </Button>
    </ThemeProvider>
  );
};
export default RoundFilterButton;
