import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  MarutiBlue500,
  TypePrimary,
  TypeSecondary,
} from "../../../Utilities/colors";
import "./DateTimePicker.css";

const theme = createTheme({
  palette: {
    primary: {
      main: MarutiBlue500,
    },
  },
  typography: {
    caption: {
      fontFamily: "Roboto !important",
      fontSize: "inhert",
      lineHeight: "1.4rem",
      letterSpacing: "-0.025em",
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "3.2rem !important",
          background: "white !important",
        },
        input: {
          fontFamily: "Roboto !important",
          fontSize: "1.4rem !important",
          lineHeight: "1.6rem !important",
          letterSpacing: "-0.025em !important",
          color: TypePrimary,
          "&::placeholder": {
            color: TypeSecondary,
            opacity: 1,
            fontFamily: "Roboto !important",
            fontSize: "1.4rem !important",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          height: "2.4rem",
          width: "2.4rem",
        },
      },
    },
  },
});
const FilterDatePicker = ({
  handleChange,
  value,
  disabled,
  dateFormat,
  minDate,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <DesktopDatePicker
          disabled={disabled}
          components={{
            OpenPickerIcon: KeyboardArrowDownIcon,
          }}
          ampm={true}
          inputFormat={dateFormat}
          value={value}
          minDate={minDate || null}
          maxDate={new Date()}
          onChange={handleChange}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                disabled={disabled}
                inputProps={{
                  ...params.inputProps,
                  placeholder: "Select",
                }}
                InputProps={{
                  endAdornment: params.InputProps.endAdornment,
                  placeholder: "Select",
                }}
                sx={{
                  backgroundColor: disabled ? "#E6E9F0" : "transparent",
                  borderRadius: "0.4rem",
                  input: {
                    fontWeight: "normal",
                    color: TypePrimary,
                    fontFamily: "Roboto",
                    fontSize: "1.4rem",
                    lineHeight: "1.6rem",
                    letterSpacing: "-2.5%",
                    pl: 0,
                  },
                }}
              />
            );
          }}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default FilterDatePicker;
