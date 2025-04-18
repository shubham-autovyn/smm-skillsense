import {
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useState } from "react";
import Delete from "../../../../../assets/icons/Delete.svg";
import SecondaryButton from "../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import {
  Grey20,
  Grey30,
  MarutiBlue500,
  MarutiSilverDark,
  TypeTertiary,
} from "../../../../../../Utilities/colors";
import Cross from "../../../../../../../assets/icons/Cross.svg";
import { SMMTheme } from "../../../../../Theme/theme";
import MaruAAR from "../../../../../assets/icons/MaruAAR.svg";
import NonMaru from "../../../../../assets/icons/NonMaru.svg";
import MaruAR from "../../../../../assets/icons/MaruAR.svg";
import MaruA from "../../../../../assets/icons/MaruA.svg";
import PrimaryButton from "../../../../../components/PrimaryButton/PrimaryButton";

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
      height: "30px",
      padding: "1rem",
      '&[class*="MuiOutlinedInput-root"]': {
        padding: 0,
      },
      "& .MuiAutocomplete-input": {
        padding: "0 !important",
      },
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
      overflowY: "scroll !important",
      scrollbarWidth: "thin",
      scrollbarColor: "#c4c4c4 #ffffff",
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#c4c4c4",
        "&:hover": {
          backgroundColor: "#97999B !important",
        },
        // border: "0.4rem solid #ffffff",
      },
    },
  },
};

const StartTrainingModal = ({
  isOpen,
  onClose,
  staffData,
  isMapStation,
  operators,
  stations,
  onMapStationAndStartTraining,
}) => {
  const [selectionSets, setSelectionSets] = useState([
    { staffID: "", stationName: "" },
  ]);
  const [selectedStations, setSelectedStations] = useState([]);
  const [selectedOperators, setSelectedOperators] = useState([]);
  const [selectionSetValidity, setSelectionSetValidity] = useState(
    selectionSets.map(() => false)
  );

  const handleOperatorChange = (value, index) => {
    const newSelectedOperators = [...selectedOperators];
    newSelectedOperators[index] = value;
    const newSelectedStations = [...selectedStations];
    if (newSelectedStations?.[index]) {
      newSelectedStations[index].staffID = value?.staffID;
      setSelectedStations(newSelectedStations);
    }
    setSelectedOperators(newSelectedOperators);

    const items = [...selectionSets];
    items[index].staffID = value?.staffID;
    setSelectionSets(items);
    handleButtonValidity(value, selectedStations, index);
  };

  const handleStationChange = (value, index, staffID) => {
    const newSelectedStations = [...selectedStations];
    newSelectedStations[index] = value;
    newSelectedStations[index].staffID = staffID;
    setSelectedStations(newSelectedStations);

    const items = [...selectionSets];
    items[index].stationName = value?.stationName;
    setSelectionSets(items);
    handleButtonValidity(value, selectedOperators, index);
  };

  const handleDialogClose = () => {
    onClose();
  };

  const addSelectionSet = () => {
    if (
      selectedOperators[selectionSets.length - 1] &&
      selectedStations[selectionSets.length - 1]
    ) {
      setSelectionSets((prevState) => [
        ...prevState,
        { staffID: "", stationName: "" },
      ]);
      setSelectionSetValidity((prevState) => [...prevState, false]);
    }
  };

  const handleButtonValidity = (value, arr, index) => {
    if (value && arr[index]) {
      setSelectionSetValidity((prevState) =>
        prevState.map((_, i) => (i === index ? true : prevState[i]))
      );
    } else {
      setSelectionSetValidity((prevState) =>
        prevState.map((_, i) => (i === index ? false : prevState[i]))
      );
    }
  };

  const deleteSelectionSet = (index, staff) => {
    const dataOperator = selectedOperators?.filter(
      (item) => item.staffID !== staff.staffID
    );
    const dataStation = selectedStations?.filter(
      (item) => item.staffID !== staff.staffID
    );
    setSelectedOperators(dataOperator);
    setSelectedStations(dataStation);
    const data = selectionSets?.filter(
      (item) => item.staffID !== staff.staffID
    );
    const newSelectionSetValidity = [...selectionSetValidity];
    newSelectionSetValidity.splice(index, 1);
    setSelectionSetValidity(newSelectionSetValidity);
    setTimeout(() => {
      setSelectionSets(data);
    }, 100);
  };

  const getMaruIcon = (maruType) => {
    switch (maruType) {
      case "A":
        return MaruA;
      case "A/AR":
        return MaruAAR;
      case "AR":
        return MaruAR;
      default:
        return NonMaru;
    }
  };
  const getFilterStations = () => {
    if (selectedStations && selectedStations.length) {
      return stations?.filter(
        (value) =>
          !selectedStations.some(
            (item) =>
              value.stationName.toLowerCase() ===
              item?.stationName.toLowerCase()
          )
      );
    }
    return stations?.filter(
      (value) =>
        !["absenteeism", "reliever", "under training"].includes(
          value.stationName.toLowerCase()
        )
    );
  };

  const handleStartTraining = () => {
    const numberOfStations = selectedStations.length;
    onMapStationAndStartTraining(selectedStations, numberOfStations);
    onClose();
  };

  const getOperator = (staff) => {
    const data = selectedOperators?.filter(
      (item) => item?.staffID === staff?.staffID
    );
    return data?.[0] || null;
  };

  const getStation = (staff) => {
    const data = selectedStations?.filter(
      (item) => item?.staffID === staff?.staffID
    );
    return data?.[0] || null;
  };

  const renderSelectionSet = (index, staff = {}) => {
    return (
      <Box>
        <Box sx={{ display: "flex", mb: 2, gap: 2 }}>
          <Box sx={{ width: "44%" }}>
            <Typography variant="h4" mb={1} sx={{ color: MarutiSilverDark }}>
              Operator
            </Typography>
            <Autocomplete
              clearIcon={null}
              options={operators.filter((e) => !selectedOperators.includes(e))}
              value={isMapStation ? staff : getOperator(staff)}
              onChange={(event, newValue) => {
                handleOperatorChange(newValue, index);
              }}
              disabled={isMapStation}
              getOptionLabel={(option) => {
                return (
                  option.label || `${option.staffName} | ${option?.staffID}`
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select"
                  InputLabelProps={{
                    shrink: false,
                    style: { position: "unset" },
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ width: "44%" }}>
            <Typography variant="h4" mb={1} sx={{ color: MarutiSilverDark }}>
              Applicable Station
            </Typography>
            <Autocomplete
              clearIcon={null}
              options={getFilterStations()}
              value={getStation(staff)}
              onChange={(event, newValue) => {
                handleStationChange(
                  newValue,
                  index,
                  staff?.staffID || selectedOperators?.[index]?.staffID
                );
              }}
              getOptionLabel={(option) =>
                option.label || `${option.stationName} | ${option?.description}`
              }
              renderOption={(props, option) => (
                <li
                  {...props}
                  style={{
                    borderBottom: `1px solid ${Grey20}`,
                  }}
                >
                  <img
                    src={getMaruIcon(option.maru)}
                    style={{ marginRight: 6, width: 18, height: 18 }}
                  />
                  {option.stationName} | {option.description}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Filter by Station Name"
                  InputLabelProps={{
                    shrink: false,
                    style: { position: "unset" },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: selectedStations[index] ? (
                      <InputAdornment position="start">
                        <img
                          src={getMaruIcon(selectedStations[index]?.maru)}
                          style={{
                            marginLeft: 10,
                            marginRight: -10,
                            width: 20,
                            height: 20,
                          }}
                        />
                      </InputAdornment>
                    ) : null,
                  }}
                />
              )}
            />
          </Box>
          {index !== 0 && !isMapStation ? (
            <Box sx={{ alignSelf: "flex-end", mb: "4px" }}>
              <img
                src={Delete}
                alt="Delete"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => deleteSelectionSet(index, staff)}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Dialog
          open={isOpen}
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
              mb: "10px",
              width: "auto",
            }}
          >
            <Typography variant="h4">
              {isMapStation
                ? "Map Station to Start Training"
                : "Add Operators to Start Training"}
            </Typography>
            <img
              src={Cross}
              alt="cross"
              style={{ cursor: "pointer" }}
              aria-label="close"
              onClick={handleDialogClose}
            />
          </Box>
          <DialogContent sx={{ width: "100%" }}>
            {isMapStation
              ? staffData?.map((staff, index) => (
                  <React.Fragment key={index}>
                    {renderSelectionSet(index, staff)}
                  </React.Fragment>
                ))
              : selectionSets.map((staff, index) => (
                  <React.Fragment key={index}>
                    {renderSelectionSet(index, staff)}
                  </React.Fragment>
                ))}
          </DialogContent>
          {!isMapStation && (
            <Box sx={{ width: "35%" }}>
              <SecondaryButton
                onClick={addSelectionSet}
                disabled={!selectionSetValidity[selectionSets.length - 1]}
              >
                Add Another Operator
              </SecondaryButton>
            </Box>
          )}
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
          <DialogActions sx={{ alignSelf: "flex-end", p: 0, pt: 2 }}>
            <Box>
              <SecondaryButton onClick={handleDialogClose}>
                Cancel
              </SecondaryButton>
            </Box>
            <Box>
              <PrimaryButton
                disabled={
                  isMapStation
                    ? !selectedStations?.length
                    : !selectionSetValidity.every((valid) => valid)
                }
                onClick={handleStartTraining}
              >
                {isMapStation
                  ? "Map Station and Start Training"
                  : "Add Operators and Start Training"}
              </PrimaryButton>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default StartTrainingModal;
