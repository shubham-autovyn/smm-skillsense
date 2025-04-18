import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  MarutiBlue500,
  MarutiWhite,
  StatusGreen,
  StatusRed,
  TypeTertiary
} from "../../utils/colors";
import "./PrimaryButton.css";

const theme = createTheme({
  palette: {
    neutral: {
      main: MarutiBlue500,
      contrastText: "#fff",
    },
    Green: {
      main: StatusGreen,
      contrastText: MarutiWhite,
    },
    Red: {
      main: StatusRed,
      contrastText: MarutiWhite,
    },
    Blue: {
      main: MarutiBlue500,
      contrastText: MarutiWhite,
    },
  },
});
const colorMapper = {
  neutral: MarutiBlue500,
  Green: StatusGreen,
  Red: StatusRed,
  Blue: MarutiBlue500,
};
const PrimaryButton = ({
  onHover = () => {},
  color = "neutral",
  sx = {},
  ...props
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        sx={{
          ...sx,
          "&.Mui-disabled": {
            color: MarutiWhite,
            backgroundColor: TypeTertiary,
          },
        }}
        type={props.type}
        className="primary-button-root"
        onClick={props.onClick}
        color={color}
        variant="contained"
        disabled={props.disabled ? props.disabled : false}
        onMouseOver={onHover}
      >
        {props.children}
      </Button>
    </ThemeProvider>
  );
};
export default PrimaryButton;
