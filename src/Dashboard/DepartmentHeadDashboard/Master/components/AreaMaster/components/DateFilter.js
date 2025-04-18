import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  MarutiBlue500,
  TypePrimary,
  TypeSecondary,
} from "../../../../../../utils/colors";
import { useState } from "react";
import CalenderIcon from "../../../../../../assets/icons/Calender.svg";
import { Box} from "@mui/material";
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
  },
});
const Calender = () => (<img src={CalenderIcon} />);
const RenderDatePicker = ({
  fromDate, updateFromDate
}) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  currentDate.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState(fromDate || currentDate);
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    if (updateFromDate) {
      updateFromDate(newValue);
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: "150px" }}>
          <DesktopDatePicker
            components={{
              OpenPickerIcon: Calender,
            }}
            ampm={true}
            inputFormat="dd/MM/yyyy"
            value={selectedDate}
            minDate={currentDate}
            onChange={handleDateChange}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  sx={{
                    backgroundColor: "transparent",
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
        </Box>

      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default RenderDatePicker;
