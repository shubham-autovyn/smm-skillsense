import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../../../../../Utilities/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import {
  Grey20,
  Grey30,
  MarutiBlue500,
  TypeSecondary,
  TypeTertiary,
} from "../../../../../Utilities/colors";
import Cross from "../../../../assets/icons/Cross.svg";
import Magnify from "../../../../assets/icons/MagnifyBlue.svg";
import { fetchStaffSearchData } from "../../../../redux/Actions/ClassroomAction";
import {
  getFetchStaffSearchData,
  getStaffListData,
  getTrainingBatchId,
} from "../../../../redux/Reducers/SMMClassroomReducer";
import { getShop } from "../../../../redux/Reducers/SMMShopReducer";
import { SMMTheme } from "../../../../Theme/theme";

const filter = createFilterOptions();

const theme = createTheme({
  ...SMMTheme,
  palette: {
    neutral: {
      main: MarutiBlue500,
    },
  },
});

theme.components.MuiOutlinedInput = {
  styleOverrides: {
    root: {
      outline: Grey30,
      height: "3.2rem",
      backgroundColor: "white",
      ouline: "none",
      borderColor: Grey30,
      width: "100%",
    },
    input: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      padding: "0.4rem",
      fontWeight: "normal",
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      letterSpacing: "-0.025em",
      width: "100%",
      "&::placeholder": {
        color: TypeTertiary,
        opacity: 1,
      },
    },
  },
};
theme.components.MuiAutocomplete = {
  styleOverrides: {
    root: {
      width: "100% !important",
    },
    inputRoot: {
      // flexWrap: "inherit !important",
      minWidth: "50px !important",
      paddingRight: "5rem !important",
      paddingLeft: "0.4rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.4rem",
      height: "auto",
    },
    endAdornment: {
      paddingTop: "3%",
      "@media (min-width: 1281px)": {
        paddingTop: "1.5%",
      },
    },
    input: {},
    paper: {
      borderRadius: "0.8rem",
    },
    listbox: {
      padding: "0.8rem !important",
      maxHeight: "16rem",
      overflowY: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: "#c4c4c4 #f4f5f8",
      "&::-webkit-scrollbar": {
        width: " 1.2rem",
      },
      "&::-webkit-scrollbar-track": {
        background: " #ffffff",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#c4c4c4",
        "&:hover": {
          backgroundColor: "#97999B !important",
        },
        height: "3rem",
        borderRadius: "2rem",
        border: "0.4rem solid #ffffff",
      },
    },
  },
};

const SearchSelect = ({
  open,
  onClose,
  handleRecordAttendance,
  trainingType,
  attendedTraineesData,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const shop = useSelector(getShop);
  const staffData = useSelector(getFetchStaffSearchData);
  const { trainingBatchId } = useSelector(getTrainingBatchId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (staffData) {
      const data = staffData?.map((staff) => {
        return {
          label: `${staff?.name} | ${staff?.staffId}`,
          value: staff?.staffId,
        };
      });
      setOptions(data);
    }
  }, [staffData]);

  useEffect(() => {
    if (attendedTraineesData && attendedTraineesData?.length) {
      setSelectedValues(attendedTraineesData);
    }
  }, [attendedTraineesData]);

  const handleSearch = (inputValue) => {
    if (shop && shop?.id && inputValue) {
      const payload = {
        shop_id: shop?.id,
        batch_id: trainingBatchId,
        training_type: trainingType || "",
        query: inputValue || "",
      };
      dispatch(fetchStaffSearchData(payload));
    }
  };

  const handleDialogClose = () => {
    setSelectedValues([]);
    onClose();
  };

  const handleInputChange = (event, newInputValue) => {
    handleSearch(newInputValue);
  };
  const getSelectedValues = (values) => {
    if (selectedValues) {
      const data = values
        ?.filter((check) => check?.value)
        .map((value) => value.label);
      return data;
    }
    return [];
  };

  const renderOption = (props, options) => {
    const isAdded = props?.["aria-selected"];

    return (
      <li
        {...props}
        style={{
          backgroundColor: "transparent",
          borderBottom: "1px solid #E6E9F0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            variant="silverTitle"
            sx={{
              color: isAdded ? TypeTertiary : TypeSecondary,
              fontWeight: "500",
              marginRight: isAdded ? "170px" : 0,
            }}
          >
            {options.label
              ? options.label
              : options?.title
              ? options.title
              : ""}
          </Typography>
          {isAdded && (
            <Typography
              variant="silverTitle"
              sx={{
                color: TypeTertiary,
                fontWeight: "400",
                fontStyle: "italic",
              }}
            >
              Already added
            </Typography>
          )}
        </Box>
      </li>
    );
  };

  const SearchIcon = () => {
    return (
      <div
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          bottom: 10,
        }}
      >
        <img
          style={{
            height: "1.801rem",
            width: "1.801rem",
            marginTop: 1,
          }}
          src={Magnify}
          alt="search"
        />
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Dialog
          open={open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "16px",
              width: "auto",
            }}
          >
            <Typography variant="h4">Record Attendence Manually</Typography>
            <img
              src={Cross}
              alt="cross"
              style={{ cursor: "pointer" }}
              aria-label="close"
              onClick={handleDialogClose}
            />
          </Box>
          <DialogContent sx={{ width: "100%" }}>
            <Typography variant="h4" mb={1.6} sx={{ color: TypeSecondary }}>
              Select Attendees
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "auto",
              }}
            >
              <Autocomplete
                multiple
                id="search-select"
                noOptionsText="No record found"
                options={options}
                freeSolo
                clearIcon={null}
                value={getSelectedValues(selectedValues)}
                onInputChange={handleInputChange}
                // // Show selected option from list
                isOptionEqualToValue={(check, value) => {
                  return check.label === value;
                }}
                getOptionLabel={(value) => {
                  if (value?.label) {
                    return value.label;
                  } else if (value?.title) {
                    return value.title;
                  }
                  return "";
                }}
                onChange={(event, newValue) => {
                  const filterOld = selectedValues?.filter(
                    (check) => check?.value
                  );
                  const filterNew = newValue?.filter((check) => check?.value);
                  if (filterNew && filterNew[0]?.title) {
                    return null;
                  } else {
                    setSelectedValues([...filterOld, ...filterNew]);
                  }
                }}
                filterOptions={(optionData, params) => {
                  const filtered = filter(optionData, params);

                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = optionData.some(
                    (option) => inputValue === option.label
                  );
                  if (inputValue !== "" && !isExisting && !filtered?.length) {
                    filtered.push({
                      inputValue,
                      title: "No record found",
                    });
                  }
                  return filtered;
                }}
                renderOption={renderOption}
                sx={{
                  padding: "0px !important",
                  width: "inherit",
                  ".MuiSelect-select": {
                    padding: "0.7rem !important",
                  },
                  "& .MuiOutlinedInput": {
                    height: "3.2rem !important",
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px !important",
                    borderColor: "#E6E9F0 !important",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: MarutiBlue500,
                  },
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Stack key={index} direction="row" spacing={1}>
                      <Chip
                        sx={{
                          background: "#E6E9F0 !important",

                          height: "2.8rem",
                          "& .MuiChip-label": {
                            display: "block",
                            fontSize: "1.4rem",
                            color: "#343536",
                            whiteSpace: "normal",
                            fontFamily: "Roboto",
                          },
                        }}
                        label={option}
                        {...getTagProps({ index })}
                        onDelete={() => {
                          const newValues = [...selectedValues];
                          newValues.splice(index, 1);
                          setSelectedValues(newValues);
                        }}
                        deleteIcon={
                          <img
                            src={Cross}
                            alt="cross"
                            style={{ width: 18, height: 18 }}
                            onMouseDown={(event) => event.stopPropagation()}
                          />
                        }
                      />
                    </Stack>
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {params.InputProps.endAdornment}
                          <SearchIcon />
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </DialogContent>
          <Box
            sx={{
              border: "1px solid transparent",
              borderBottomColor: Grey20,
              borderBottomWidth: 1,
              mt: "16px",
              gap: "16px",
              justifyContent: "flex-end",
            }}
          />
          <DialogActions
            sx={{ width: "50%", alignSelf: "flex-end", p: 0, pt: 2 }}
          >
            <Box sx={{ width: "36%" }}>
              <SecondaryButton onClick={handleDialogClose}>
                Cancel
              </SecondaryButton>
            </Box>
            <Box sx={{ width: "64%" }}>
              <PrimaryButton
                disabled={!selectedValues?.length}
                onClick={() => handleRecordAttendance(selectedValues)}
              >
                Record Attendance
              </PrimaryButton>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default SearchSelect;
