import TextField from '@mui/material/TextField';
import './DateTimePicker.css';
// import { LocalizationProvider } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import { DesktopDatePicker } from "@mui/lab";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import {
  MarutiBlue500,
  TypePrimary,
  TypeSecondary,
} from '../../../src/utils/colors';
const dateFormatter = (val) => {
  var list = val.split('/');
  return list[1] + '/' + list[0] + '/' + list[2];
};
const theme = createTheme({
  palette: {
    primary: {
      main: MarutiBlue500,
    },
  },
  typography: {
    caption: {
      fontFamily: 'Roboto !important',
      fontSize: 'inhert',
      lineHeight: '1.4rem',
      letterSpacing: '-0.025em',
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '3.2rem !important',
          background: 'white !important',
        },
        input: {
          fontFamily: 'Roboto !important',
          fontSize: '1.4rem !important',
          lineHeight: '1.6rem !important',
          letterSpacing: '-0.025em !important',
          color: TypePrimary,
          '&::placeholder': {
            color: TypeSecondary,
            opacity: 1,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          height: '2.4rem',
          width: '2.4rem',
          marginRight: '0.1rem',
        },
      },
    },
  },
});

const CustomDatePicker = ({
  props,
  value,
  minDate,
  maxDate,
  handleChange,
  label,
  disabled,
  hideLabel,
  borderBgColor,
  onChange,
  openTo,
  months,
  type,
  onClose,
  dateFormate,
  disabledDates,
  width,
}) => {
  const views =
    months ||
    (type === 'months' ? ['month', 'year'] : ['year', 'month', 'day']);
  const shouldDisableDate = (date) => {
    return disabledDates?.some((disabledDate) =>
      dayjs(disabledDate).isSame(dayjs(date), 'day')
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <DesktopDatePicker
          components={{
            OpenPickerIcon: KeyboardArrowDownIcon,
          }}
          ampm={true}
          inputFormat={
            dateFormate || (type === 'months' ? 'MM/yyyy' : 'dd/MM/yyyy')
          }
          views={views} // Show calendar with days
          minDate={minDate} // Dynamic minDate
          maxDate={maxDate} // Dynamic maxDate
          value={value} // Selected date
          openTo={openTo || 'day'}
          onChange={handleChange} // Update state
          disabled={disabled}
          onClose={onClose}
          shouldDisableDate={shouldDisableDate}
          PopperProps={{
            sx: {
              '& .MuiCalendarPicker-root': {
                width: width ? width : '35rem !important',
                maxHeight: '40rem !important',
                overflow: 'hidden',
              },
              '& .MuiTypography-root': {
                fontSize: '1.3rem',
              },
              '& .MuiPickersCalendarHeader-label': {
                fontSize: '1.2rem',
              },
            },
          }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                disabled={disabled}
                // disabled={props.disabled}
                inputProps={{
                  ...params.inputProps,
                  placeholder: 'Select',
                  readOnly: true,
                }}
                InputProps={{
                  startAdornment: !hideLabel ? (
                    <span className="select-label font-regular font-normal">
                      {`${label}:`}
                    </span>
                  ) : null, // Hide label when `hideLabel` is true
                  endAdornment: params.InputProps.endAdornment,
                  placeholder: 'Select',
                }}
                className="custom-DatePicker"
                sx={{
                  '& fieldset': { borderColor: borderBgColor },
                  borderRadius: '0.4rem',
                  input: {
                    fontWeight: 'bold',
                    color: TypePrimary,
                    fontFamily: 'Roboto',
                    fontSize: '1.4rem',
                    lineHeight: '1.6rem',
                    letterSpacing: '-2.5%',
                    width: '85px',
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

export default CustomDatePicker;
