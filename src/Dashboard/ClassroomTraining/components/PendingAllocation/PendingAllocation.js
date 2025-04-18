import {
  Backdrop,
  Box,
  CircularProgress,
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
import { useLocation, useNavigate } from "react-router-dom";

import BackIcon from "../../../../assets/icons/BackIcon.svg";
import SortIcon from "../../../../assets/icons/SortIcon.svg";

import { Grey10 } from "../../../../utils/colors";
import useFetchBatchesPendingAllocation from "../../../Dpm/hooks/batchesAllocationPending";
import useStyles from "../../../styles";
import PendingAllocationData from "./PendingAllocationData";

const PendingAllocation = () => {
  const classes = useStyles();
  const [filteredData, setFilteredData] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  const shopId = location.state?.shop_id;
  const {
    dataGraph: pendingAllocationBatchesData,
    fetchData: fetchPendingAllocation,
    loading,
  } = useFetchBatchesPendingAllocation();

  useEffect(() => {
    if (pendingAllocationBatchesData?.pending_batch_details) {
      setFilteredData(pendingAllocationBatchesData.pending_batch_details);
    }
  }, [pendingAllocationBatchesData]);

  const handleBack = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   if (Array.isArray(batchData)) {
  //     setFilteredData(
  //       batchData?.sort((a, b) => parseInt(b.startDate) - parseInt(a.startDate))
  //     );
  //   }
  // }, [batchData]);

  const handleTrackClick = (item) => {
    navigate("/SMM/AllocateAreas", {
      state: {
        trainingBatchId: item.trainingBatchId,
        shopId: shopId,
      },
    });
  };

  const handleSortToggle = () => {
    setFilteredData([...filteredData].reverse());
    setIsAscending(!isAscending); // Toggle the sorting direction
  };

  const handleSortClick = (type) => {
    switch (type) {
      case "pendingSince":
      case "attendeeCount":
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
      default:
        console.log(`Unknown type: ${type}`);
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
              onClick={() => {
                handleSortClick("pendingSince");
                handleSortToggle();
              }}
            >
              <img
                src={SortIcon}
                alt="Sort"
                style={{ width: "10px", height: "10px" }}
              />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            Training Start Date & Time
            <IconButton
              sx={{ p: 0 }}
              onClick={() => {
                handleSortClick("startDate");
                handleSortToggle();
              }}
            >
              <img
                src={SortIcon}
                alt="Sort"
                style={{ width: "10px", height: "10px" }}
              />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            Training End Date & Time
            <IconButton
              sx={{ p: 0 }}
              onClick={() => {
                handleSortClick("endDate");
                handleSortToggle();
              }}
            >
              <img
                src={SortIcon}
                alt="Sort"
                style={{ width: "10px", height: "10px" }}
              />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            No. of Attendees
            <IconButton
              sx={{ p: 0 }}
              onClick={() => {
                handleSortClick("attendeeCount");
                handleSortToggle();
              }}
            >
              <img
                src={SortIcon}
                alt="Sort"
                style={{ width: "10px", height: "10px" }}
              />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            Attendee Type
            <IconButton
              sx={{ p: 0 }}
              onClick={() => {
                handleSortClick("traineeType");
                handleSortToggle();
              }}
            >
              <img
                src={SortIcon}
                alt="Sort"
                style={{ width: "10px", height: "10px" }}
              />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
  return (
    <Box sx={{ mb: "2rem", padding: "20px" }}>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          p: 1,
          background: Grey10,
          display: "flex",
          borderRadius: "8px",
          alignItems: "center",
          gap: "10px",
          mb: "2rem",
        }}
      >
        <img
          src={BackIcon}
          alt="icon"
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        />

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
              <PendingAllocationData
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
export default PendingAllocation;
