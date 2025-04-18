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
import PendingBatchData from "./PendingBatchData";

const PendingBatch = ({ pendingBatchData, path }) => {
  const classes = useStyles();
  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const batchData = pendingBatchData || [
    {
      shopId: "40",
      trainingBatchId: "a4dcfcd2-d56b-11ee-98ba-3a91943b8bb4",
      trainingType: "Department change",
      startDate: 1709036907,
      endDate: 1709036987,
      attendeeCount: 1,
      traineeType: "operator",
      pendingSince: 2,
    },
  ];

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

  const handleAllocateClick = (item) => {
    navigate("/SMM/AllocateAreas", {
      state: {
        trainingBatchId: item.trainingBatchId,
        stepValue: item?.isAttendanceMarkedToday ? 2 : 1,
        trainingType: item.trainingType,
      },
    });
  };

  const handleSortClick = (type) => {
    switch (type) {
      case "pendingSince":
      case "attendeeCount":
      case "traineeType":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? b[type].localeCompare(a[type])
              : a[type].localeCompare(b[type])
          )
        );
        setIsAscending(!isAscending);
        break;
      case "startDate":
      case "endDate":
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
            Pending Since
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("pendingSince")}
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
              onClick={() => handleSortClick("startDate")}
            >
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            End Date & Time
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("endDate")}
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
              onClick={() => handleSortClick("attendeeCount")}
            >
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            Attendee Type
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("traineeType")}
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
        <Typography variant="darkTitle">
          Batches Pending for Allocation to Areas
        </Typography>
      </Box>
      <TableContainer
        className={`${classes["master-table"]} ${classes["batch-table-dimensions"]}`}
        component={Paper}
      >
        <Table stickyHeader>
          {getHeader()}
          <TableBody>
            {filteredData?.map((item, index) => (
              <PendingBatchData
                key={index}
                rowData={item}
                handleAllocateClick={() => handleAllocateClick(item)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default PendingBatch;
