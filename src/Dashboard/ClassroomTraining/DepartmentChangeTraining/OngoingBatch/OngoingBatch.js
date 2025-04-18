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
import { useNavigate } from "react-router-dom";
import { Grey10 } from "../../../../utils/colors";
import SortIcon from "../../../../assets/icons/SortIcon.svg";
import useStyles from "../../../styles";
import OngoingBatchData from "./OngoingBatchData";

const OngoingBatch = (props) => {
  const classes = useStyles();
  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const batchData = props.ongoingBatchData;

  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(batchData)) {
      setFilteredData(
        batchData?.sort(
          (a, b) =>
            parseInt(b.trainingStartDateTime) -
            parseInt(a.trainingStartDateTime)
        )
      );
    }
  }, [batchData]);

  const handleTrackClick = (item) => {
    navigate("/SMM/NewDepartment", {
      state: {
        trainingBatchId: item.trainingBatchId,
        stepValue: item?.isAttendanceMarkedToday ? 2 : 1,
        attendeeType: item.attendeeType,
      },
    });
  };

  const handleSortClick = (type) => {
    switch (type) {
      case "noOfTopicsCompleted":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? a[type] / a.noOfTopicsAssigned - b[type] / b.noOfTopicsAssigned
              : b[type] / b.noOfTopicsAssigned - a[type] / a.noOfTopicsAssigned
          )
        );
        setIsAscending(!isAscending);
        break;
      case "noAttendies":
      case "trainingStartDateTime":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? parseInt(a[type]) - parseInt(b[type])
              : parseInt(b[type]) - parseInt(a[type])
          )
        );
        setIsAscending(!isAscending);
        break;
    }
  };
  const getHeader = () => (
    <TableHead>
      <TableRow>
        <TableCell>
          <div className={classes.columnHeader}>
            No. of Completed vs Assigned Training Topics
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("noOfTopicsCompleted")}
            >
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            Start Date & Time
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("trainingStartDateTime")}
            >
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            No. of Attendees
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("noAttendies")}
            >
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
  return (
    <Box sx={{ mb: "2rem" }}>
      <Box
        sx={{
          p: 1,
          background: Grey10,
          display: "flex",
          borderRadius: "8px",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "2rem",
        }}
      >
        <Typography variant="darkTitle">Ongoing Batch</Typography>
      </Box>
      <TableContainer
        className={`${classes["master-table"]} ${classes["batch-table-dimensions"]}`}
        component={Paper}
      >
        <Table stickyHeader>
          {getHeader()}
          <TableBody>
            {filteredData?.map((item, index) => (
              <OngoingBatchData
                key={index}
                rowData={item}
                handleTrackClick={() => handleTrackClick(item)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default OngoingBatch;
