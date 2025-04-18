import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grey30,
  MarutiBlue500,
  TypeSecondary,
  TypeTertiary,
} from "../../../utils/colors";
import Cross from "../../../assets/icons/Cross.svg";
import Magnify from "../../../assets/icons/MagnifyBlue.svg";
import { setStaffDetailsData } from "../../../redux/ActionCreator/ReportActionCreator";
import { fetchStaffSearchApi } from "../../../redux/Actions/ReportActions";
import { getStaffSearchData } from "../../../redux/Reducers/SMMReportReducer";
import { getShop } from "../../../redux/Reducers/SMMShopReducer";
import { SMMTheme } from "../../../Theme/theme";

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
      height: "2rem",
      P: 0,
      m: 0,
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
      paddingTop: "0rem",
      paddingBottom: "0rem",
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

const SearchAttendeeTrainer = ({
  userType,
  handleStaffSelection,
  selectedData,
  placeholder,
  operatorOptions,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [shouldRender, setShouldRender] = useState(false);

  const shop = useSelector(getShop);
  const staffData = useSelector(getStaffSearchData);

  const dispatch = useDispatch();

  useEffect(() => {
    setShouldRender(true);
  }, []);

  // useEffect(() => {
  //   if (staffData) {
  //     const data = staffData?.map((staff) => {
  //       return {
  //         // label: `${staff?.name} | ${staff?.staffId}`,
  //         label: staff?.name,
  //         value: staff?.staffId,
  //       };
  //     });
  //     setOptions(data);
  //   }
  // }, [staffData]);
  useEffect(() => {
    if (operatorOptions) {
      const operatorData =
        operatorOptions?.map((operator) => ({
          label: operator?.label,
          value: operator?.value,
        })) || [];

      setOptions(operatorData);
    }
  }, [operatorOptions]);

  useEffect(() => {
    if (Array.isArray(selectedData)) {
      setSelectedValues(selectedData);
    }
  }, [selectedData]);

  // const handleSearch = (inputValue) => {
  //   if (shop && shop?.id && inputValue) {
  //     let payload = {
  //       query: inputValue,
  //       shop_id: shop?.id?.toString(),
  //     };
  //     if (userType === "Trainer") {
  //       payload = {
  //         ...payload,
  //         is_trainer: true,
  //       };
  //     }
  //     dispatch(fetchStaffSearchApi(payload));
  //   }
  // };
  const handleSearch = (inputValue) => {
    if (shop && shop?.id && inputValue) {
      let payload = {
        query: inputValue,
        shop_id: shop?.id?.toString(),
      };
      if (userType === "Trainer") {
        payload = { ...payload, is_trainer: true };
      }
      dispatch(fetchStaffSearchApi(payload));
    } else {
      setOptions([]); // Clear options when no input
    }
  };

  const handleInputChange = (event, newInputValue) => {
    handleSearch(newInputValue);
    if (newInputValue === "") {
      setOptions([]);
      dispatch(setStaffDetailsData([]));
    }
  };
  // const getSelectedValues = (values) => {
  //   if (selectedValues) {
  //     const data = values
  //       ?.filter((check) => check?.value)
  //       .map((value) => value.label);
  //     return data;
  //   }
  //   return [];
  // };

  const getSelectedValues = (values) => {
    if (Array.isArray(values)) {
      return values?.filter((check) => check?.value);
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
            width: "100%",
          }}
        >
          <Typography
            variant="silverTitle"
            sx={{
              color: isAdded ? TypeTertiary : TypeSecondary,
              fontWeight: "500",
            }}
          >
            {options.label
              ? options.label
              : options?.title
              ? options.title
              : ""}
          </Typography>
        </Box>
      </li>
    );
  };

  const SearchIcon = () => {
    if (!shouldRender) {
      return null;
    }
    return (
      <div
        style={{
          position: "absolute",
          right: 10,
          top: 8,
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
        <Autocomplete
          multiple
          id="search-select"
          noOptionsText="No record found"
          options={options}
          freeSolo
          clearIcon={null}
          limitTags={1}
          value={getSelectedValues(selectedValues)}
          onOpen={() => {
            if (!options.length && operatorOptions?.length) {
              setOptions(operatorOptions);
            }
          }}
          onInputChange={(event, newInputValue, reason) => {
            if (reason === "input") {
              return; // Do nothing on typing
            }
            if (reason === "clear") {
              setOptions(operatorOptions); // Reset on clear
            }
          }}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          getOptionLabel={(value) => {
            if (value?.label) {
              return value.label;
            } else if (value?.title) {
              return value.title;
            }
            return "";
          }}
          onChange={(event, newValue) => {
            setSelectedValues(newValue);
            handleStaffSelection(newValue);
          }}
          // filterOptions={(optionData, params) => {
          //   const filtered = filter(optionData, params);

          //   const { inputValue } = params;
          //   // Suggest the creation of a new value
          //   const isExisting = optionData.some(
          //     (option) => inputValue === option.label
          //   );
          //   if (inputValue !== "" && !isExisting && !filtered?.length) {
          //     filtered.push({
          //       inputValue,
          //       title: "No record found",
          //     });
          //   }
          //   return inputValue ? filtered : [];
          // }}
          filterOptions={(optionData, params) => {
            const { inputValue } = params;
            if (!inputValue) return optionData; // Show full list if no input

            // Filter only matching options
            const filtered = optionData.filter((option) =>
              option.label.toLowerCase().includes(inputValue.toLowerCase())
            );

            // Show "No record found" if nothing matches
            if (filtered.length === 0) {
              return [{ inputValue, title: "No record found" }];
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
            "& .MuiOutlinedInput-input": {
              height: "17px !important",
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
                  label={option.label}
                  {...getTagProps({ index })}
                  onDelete={() => {
                    const newValues = [...selectedValues];
                    newValues.splice(index, 1);
                    setSelectedValues(newValues);
                    handleStaffSelection(newValues);
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
              placeholder={placeholder || ""}
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
    </ThemeProvider>
  );
};

export default SearchAttendeeTrainer;
