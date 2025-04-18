import {
  Autocomplete,
  Box,
  createTheme,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import {
  Grey20,
  MarutiBlue500,
  TypeSecondary,
} from "../../../../../../utils/colors";
import Magnify from "../../../../../../assets/icons/Magnify.svg";
import CommonAccordion from "../../../../../../components/Accordion/CommonAccordion";
import { SMMTheme } from "../../../../../../Theme/theme";
import useStyles from "../../../../../styles";

const theme = createTheme({
  ...SMMTheme,
  palette: {
    neutral: {
      main: MarutiBlue500,
    },
  },
});

theme.components.MuiAutocomplete = {
  styleOverrides: {
    inputRoot: {
      minWidth: "60px !important",
      height: "25px",
      padding: "1rem",
      '&[class*="MuiOutlinedInput-root"]': {
        padding: 0,
      },
      "& .MuiAutocomplete-input": {
        padding: "0 !important",
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
      scrollbarColor: "#c4c4c4 #ffffff",
      "&::-webkit-scrollbar": {
        width: " 1rem",
      },
    },
  },
};
const JoineeNames = ({
  joineeData,
  selectedStaffData,
  handleCategorySelect,
  handleStaffClick,
  expandedCategory,
  setExpandedCategory,
}) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState(null);
  //const [expandedCategory, setExpandedCategory] = useState("New Joinees");

  const allStaff = [
    ...(joineeData?.newJoinee?.map((item) => item) || []),
    ...(joineeData?.existingOperator?.map((item) => item) || []),
  ];

  const listRef = useRef(null);
  const handleNameClick = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "instant", block: "center" });
    }
  };

  const handleStaffNameClick = (selectedStaffRow) => {
    setSearchValue(null);
    handleStaffClick(selectedStaffRow);
  };

  const RenderTrainingData = ({ staffData, categoryName }) => {
    const isActive = expandedCategory === categoryName;
    const staffDataLength = staffData ? staffData.length : 0;
    return (
      <Box>
        <CommonAccordion
          onItemClick={handleNameClick}
          value={selectedStaffData}
          isActive={isActive}
          handleOptionClick={() => {
            setExpandedCategory(
              expandedCategory === categoryName ? "" : categoryName
            );
            handleCategorySelect(categoryName);
          }}
          titleComponent={
            <Typography variant="h5" sx={{ color: TypeSecondary }}>
              {" "}
              {`${categoryName} (${staffDataLength})`}
            </Typography>
          }
        >
          {staffData?.map((item, index) => {
            const isSelected = selectedStaffData?.staffID === item?.staffID;
            return (
              <Box
                key={index}
                ref={isSelected ? listRef : null}
                onClick={() => handleStaffNameClick(item)}
                sx={{
                  cursor: "pointer",
                  backgroundColor: isSelected ? Grey20 : "white",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: isSelected ? MarutiBlue500 : TypeSecondary,
                    fontWeight: isSelected ? "600" : "500",
                    p: 1,
                  }}
                >
                  {item?.staffName || ""}
                </Typography>
              </Box>
            );
          })}
        </CommonAccordion>
      </Box>
    );
  };
  const SearchIcon = () => {
    return (
      <div style={{ position: "absolute", right: 10, top: 6, bottom: 10 }}>
        <img
          style={{ height: "1.601rem", width: "1.601rem", marginTop: 1 }}
          src={Magnify}
        />
      </div>
    );
  };

  const filterArr = (arr, value) => {
    return arr?.some((item) => item.staffID === value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "20%",
          borderRadius: "8px",
          height: "calc(100% - 2rem) !important",
          border: "1px solid var(--Grey-20, #E6E9F0)",
          // overflowY: "scroll !important",
        }}
        className={`${classes["ojt-container-table-dimensions"]}`}
      >
        <Box
          sx={{
            marginLeft: "1.7rem",
            marginTop: "1.6rem",
            marginRight: "1.6rem",
          }}
        >
          <Autocomplete
            clearIcon={null}
            value={searchValue}
            onChange={(event, newValue) => {
              setSearchValue(newValue);
              if (filterArr(joineeData?.newJoinee, newValue)) {
                setExpandedCategory("New Joinees");
              }
              if (filterArr(joineeData?.existingOperator, newValue)) {
                setExpandedCategory("Existing Operators Multi-Skilling");
              }
              handleStaffNameClick(newValue);
            }}
            options={allStaff}
            getOptionLabel={(option) => {
              return option ? `${option.staffName} | ${option.staffID}` : "";
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{
                  shrink: false,
                  style: { position: "unset" },
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      <SearchIcon />
                    </React.Fragment>
                  ),
                }}
                variant="outlined"
                placeholder="Search Staff Id, Name"
              />
            )}
          />
        </Box>
        <Box style={{ padding: 0, paddingTop: "2rem" }}>
          <RenderTrainingData
            staffData={joineeData?.newJoinee}
            categoryName={"New Joinees"}
          />
          <RenderTrainingData
            staffData={joineeData?.existingOperator}
            categoryName={"Existing Operators Multi-Skilling"}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default JoineeNames;
