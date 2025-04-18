import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SecondaryButton from "../../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import SortIcon from "../../../../../../assets/icons/SortIcon.svg";
import { dateFormat } from "../../../../../../utils/helperFunctions";
import useStyles from "../../../../../styles";
import JoineeTableData from "./JoineeTopicData";
import { MarutiBlue500 } from "../../../../../../../Utilities/colors";

const JoineeList = ({ staffData, selectedCategory, handleStartTraining, handleCancelTraining }) => {
  const classes = useStyles();
  const [filteredData, setFilteredData] = useState();
  const [isAscending, setIsAscending] = useState(true);

  const isNewJoinee = selectedCategory === "New Joinees";

  useEffect(() => {
      setFilteredData(staffData);
    
  }, [staffData]);

  const handleSortClick = (type) => {
    switch (type) {
      case "staffID":
      case "staffName":
        setFilteredData(
          filteredData?.sort((a, b) => {
            return !isAscending
              ? b?.[type]?.localeCompare(a?.[type] || "")
              : a?.[type]?.localeCompare(b?.[type] || "");
          })
        );
        setIsAscending(!isAscending);
        break;
      case "currentLevel":
      case "ExhaustedDay":
        setFilteredData((prevData) => {
          const sortedData = prevData.slice().sort((a, b) => {
            if (isAscending) {
              return a[type] - b[type];
            } else {
              return b[type] - a[type];
            }
          });
          setIsAscending(!isAscending);
          return sortedData;
        });
        break;
      case "stationName":
        setFilteredData(
          filteredData?.sort((a, b) => {
            if (a[type] === null && b[type] === null) {
              return 0;
            } else if (a[type] === null) {
              return 1;
            } else if (b[type] === null) {
              return -1;
            } else {
              return isAscending
                ? a[type].localeCompare(b[type])
                : b[type].localeCompare(a[type]);
            }
          })
        );
        setIsAscending(!isAscending);
        break;
      case "startDate":
        setFilteredData(
          filteredData?.sort((a, b) => {
            if (a[type] === null && b[type] === null) {
              return 0;
            } else if (a[type] === null) {
              return isAscending ? 1 : -1;
            } else if (b[type] === null) {
              return isAscending ? -1 : 1;
            } else {
              return isAscending
                ? dateFormat(a[type], "/") - dateFormat(b[type], "/")
                : dateFormat(b[type], "/") - dateFormat(a[type], "/");
            }
          })
        );
        setIsAscending(!isAscending);
        break;
    }
  };

  const getMapButtonState = () => {
    return !filteredData?.some((item) => item.trainingStatus === "CREATED");
  };

  const getTableHeaders = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">
            <div className={classes.columnHeader}>
              {"Staff ID"}
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("staffID")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell align="left">
            <div className={classes.columnHeader}>
              {"Name"}
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("staffName")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell align="left">
            <div className={classes.columnHeader}>
              {"Process Station"}
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("stationName")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell align="left">
            <div className={classes.columnHeader}>
              {"Training Level"}
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("currentLevel")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell align="left">
            <div className={classes.columnHeader}>
              {"Training Start Date"}
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("startDate")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell align="left">
            <div className={classes.columnHeader}>
              {"Exhausted/Minimum Training Days"}
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("ExhaustedDay")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell align="left">
            <div className={classes.columnHeader}>{"Action"}</div>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };

  return (
    <Box
      sx={{
        width: "80%",
        borderRadius: "8px",
        height:"calc(100% - 2rem) !important",
        border: "1px solid var(--Grey-20, #E6E9F0)",
        ml: 2,
        p: 1.4,
      }}
      className={`${classes["ojt-container-table-dimensions"]}`}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h4">
            {isNewJoinee
              ? "New Joinee OJT Overview"
              : "Existing Operators Multi-Skilling Overview"}
          </Typography>
        </Box>
        <Box>
          <SecondaryButton
            type="button"
            onClick={handleStartTraining}
            disabled={isNewJoinee ? getMapButtonState() : false}
          >
            {isNewJoinee
              ? "Map Station to Start Training"
              : "Add Operators to Start Training"}
          </SecondaryButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="darkTitle">
          Total {filteredData?.length || ""}
        </Typography>
      </Box>
      <TableContainer
        className={`${classes["batch-table-dimensions"]}`}
        component={Paper}
      >
        <Table stickyHeader aria-label="sticky table">
          {getTableHeaders()}
          <TableBody>
            {filteredData?.map((row, index) => (
              <JoineeTableData
                key={index}
                joineeData={row}
                isNewJoinee={isNewJoinee}
                handleCancelTraining={()=>handleCancelTraining(row)}
              />
            ))}
          </TableBody>
        </Table>
        {filteredData?.length === 0 && (
          <Box className={classes["loader-container"]} sx={{ mt: 2 }}>
            <Typography style={{ color: MarutiBlue500 }}>
              No ongoing training
            </Typography>
          </Box>
        )}

      </TableContainer>
    </Box>
  );
};
export default JoineeList;
