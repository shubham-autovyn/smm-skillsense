import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { Box, Chip, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGridTable } from "../../../../../../components/Data-table/dataTable.styles";
import { SelectBoxHead } from "../Deployment/Deployment.styles";
import { StyledBox } from "./ClassRoomTraining.styles";

import Select from "../../../../../../utils/Select/Select";
import sorting from "../../../../../../assets/icons/SortIcon.svg";
import CustomDatePicker from "../../../../../../components/DatePicker/DatePicker";

import moment from "moment";
import useClassRoomTraining from "../../../../hooks/classRoomTraning";
import {} from "./ClassRoomTraining.css";

const rows = [
  {
    id: 1,
    trainingType: "Refresher",
    trainingTopic: "ISO 45001 Safety Training",
    trainingTestName: "ISO 45001 Safety Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "546282",
    trainerName: "Ravi Gupta",
  },
  {
    id: 2,
    trainingType: "Refresher",
    trainingTopic: "Punch Operator Training",
    trainingTestName: "Punch Operator Training",
    preTest: "Fail",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "537128",
    trainerName: "Zaire Lubin",
  },
  {
    id: 3,
    trainingType: "Refresher",
    trainingTopic: "5 ‘S’ Training",
    trainingTestName: "5 ‘S’ Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "593729",
    trainerName: "Alfredo Westervelt",
  },
  {
    id: 4,
    trainingType: "Refresher",
    trainingTopic: "ISO 9001 Quality Awareness Training",
    trainingTestName: "ISO 9001 Quality Awareness Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "504203",
    trainerName: "Nolan Dokidis",
  },
  {
    id: 5,
    trainingType: "Refresher",
    trainingTopic: "Driver Training",
    trainingTestName: "Driver Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "531919",
    trainerName: "Charlie Baptista",
  },
  {
    id: 6,
    trainingType: "Refresher",
    trainingTopic: "Driver Training",
    trainingTestName: "Driver Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "531919",
    trainerName: "Charlie Baptista",
  },
  {
    id: 7,
    trainingType: "Refresher",
    trainingTopic: "Driver Training",
    trainingTestName: "Driver Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "531919",
    trainerName: "Charlie Baptista",
  },
  {
    id: 8,
    trainingType: "Refresher",
    trainingTopic: "Driver Training",
    trainingTestName: "Driver Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "531919",
    trainerName: "Charlie Baptista",
  },
  {
    id: 9,
    trainingType: "Refresher",
    trainingTopic: "Driver Training",
    trainingTestName: "Driver Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "531919",
    trainerName: "Charlie Baptista",
  },
  {
    id: 10,
    trainingType: "Refresher",
    trainingTopic: "Driver Training",
    trainingTestName: "Driver Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "531919",
    trainerName: "Charlie Baptista",
  },
  {
    id: 11,
    trainingType: "Refresher",
    trainingTopic: "Driver Training",
    trainingTestName: "Driver Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "531919",
    trainerName: "Charlie Baptista",
  },
  {
    id: 12,
    trainingType: "Refresher",
    trainingTopic: "Driver Training",
    trainingTestName: "Driver Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "531919",
    trainerName: "Charlie Baptista",
  },
  {
    id: 13,
    trainingType: "Refresher",
    trainingTopic: "Driver Training",
    trainingTestName: "Driver Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "531919",
    trainerName: "Charlie Baptista",
  },
  {
    id: 14,
    trainingType: "Refresher",
    trainingTopic: "Driver Training",
    trainingTestName: "Driver Training",
    preTest: "Pass",
    postTest: "Pass",
    trainingDateTime: "12/05/2023, 14:27:35",
    trainerStaffId: "531919",
    trainerName: "Charlie Baptista",
  },
];

export default function ClassRoomTraining() {
  const [filters, setFilters] = useState({
    fromDate: new Date().toISOString().split("T")[0],
    toDate: new Date().toISOString().split("T")[0],
  });
  const [filteredData, setFilteredData] = useState(rows);
  const [isAscending, setIsAscending] = useState(true);
  const [trainingType, setTrainingType] = useState("Refresher");
  const [trainingTopic, setTrainingTopic] = useState("All");
  const { dataClassRoomTraining, fetchClassRoomTraining } =
    useClassRoomTraining();
  const dataHierarchy = JSON.parse(localStorage.getItem("dataHierarchy"));

  useEffect(() => {
    const payload = {
      shop_id: dataHierarchy.shopId,
      training_type: "New joinee",
      topic_names: "Pedestrian Safety Question Paper",
      // training_date_from: moment(filters.fromDate, "YYYY-MM-DD").unix(),
      // training_date_from: moment(filters.fromDate, "YYYY-MM-DD").unix(),
      // training_date_to: moment(filters.toDate, "YYYY-MM-DD").unix(),
      staff_id: 164160,
    };
    fetchClassRoomTraining(payload);
  }, []);
  const columns = [
    {
      field: "trainingType",
      headerName: "Training Type",
      width: 150,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography
            sx={{ fontSize: "12px", fontSize: "12px", fontWeight: "bold" }}
          >
            Training Type
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("trainingType");
            }}
          />
        </Box>
      ),
    },
    {
      field: "trainingTopic",
      headerName: "Training Topic",
      width: 280,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Training Topic
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("trainingTopic");
            }}
          />
        </Box>
      ),
    },
    {
      field: "trainingTestName",
      headerName: "Training Test Name",
      width: 280,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Training Test Name
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("trainingTestName");
            }}
          />
        </Box>
      ),
    },
    {
      field: "preTest",
      headerName: "Pre-Test",
      width: 100,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Pre-Test
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("preTest");
            }}
          />
        </Box>
      ),
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "4px",
            backgroundColor: params.value === "Pass" ? "#DFF6DD" : "#FFE6E6",
            color: params.value === "Pass" ? "#4CAF50" : "#F44336",
            borderRadius: "8px",
          }}
        >
          <Chip
            label={params.value}
            color={params.value === "Pass" ? "success" : "error"}
            size="medium"
            style={{
              fontSize: "14px",
              backgroundColor: "transparent",
              color: params.value === "Pass" ? "#4CAF50" : "#F44336",
            }}
          />
          <OpenInNewOutlinedIcon fontSize="14px" sx={{ cursor: "pointer" }} />
        </Box>
      ),
    },
    {
      field: "postTest",
      headerName: "Post-Test",
      width: 100,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Post-Test
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("postTest");
            }}
          />
        </Box>
      ),
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "4px",
            backgroundColor: params.value === "Pass" ? "#DFF6DD" : "#FFE6E6",
            color: params.value === "Pass" ? "#4CAF50" : "#F44336",
            borderRadius: "8px",
          }}
        >
          <Chip
            label={params.value}
            color={params.value === "Pass" ? "success" : "error"}
            style={{
              fontSize: "14px",
              backgroundColor: "transparent",
              color: params.value === "Pass" ? "#4CAF50" : "#F44336",
            }}
          />
          <OpenInNewOutlinedIcon fontSize="14px" cursor="pointer" />
        </Box>
      ),
    },
    {
      field: "trainingDateTime",
      headerName: "Training Date & Time",
      width: 180,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Training Date & Time
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("trainingDateTime");
            }}
          />
        </Box>
      ),
    },
    {
      field: "trainerStaffId",
      width: 150,
      headerName: "Trainer Staff ID",
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Trainer Staff ID
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("trainerStaffId");
            }}
          />
        </Box>
      ),
    },
    {
      field: "trainerName",
      headerName: "Trainer Name",
      width: 150,
      renderHeader: () => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "default",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Trainer Name
          </Typography>
          <img
            src={sorting}
            alt="sort icon"
            width={10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleSortClick("trainerName");
            }}
          />
        </Box>
      ),
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSortClick = (type) => {
    const sortedData = [...filteredData].sort((a, b) => {
      const valueA = a[type];
      const valueB = b[type];
      if (typeof valueA === "string" && typeof valueB === "string") {
        // Handle alphabetic sorting
        return isAscending
          ? valueA.localeCompare(valueB) // Ascending
          : valueB.localeCompare(valueA); // Descending
      } else if (!isNaN(new Date(valueA)) && !isNaN(new Date(valueB))) {
        // Handle date sorting
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return isAscending ? dateA - dateB : dateB - dateA;
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        // Handle numeric sorting
        return isAscending ? valueA - valueB : valueB - valueA;
      }
      return 0; // Default case for unhandled data types
    });

    setFilteredData(sortedData);
    setIsAscending(!isAscending); // Toggle sorting order
  };

  return (
    <>
      <Box sx={{ padding: "20px 20px" }}>
        <SelectBoxHead className="select-box3">
          <Box sx={{ width: "50%", display: "flex", gap: "10px" }}>
            <Select
              label="Training Type"
              name="site"
              value={trainingType}
              onChange={(e) => setTrainingType(e.target.value)}
            >
              <MenuItem value="Refresher">Refresher</MenuItem>
            </Select>
            <Select
              label="Topic"
              name="location"
              value={trainingTopic}
              onChange={(e) => setTrainingTopic(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
            </Select>
          </Box>
          <Box sx={{ width: "50%", display: "flex", gap: "10px" }}>
            <CustomDatePicker
              label="From"
              value={filters.fromDate}
              handleChange={(date) => handleFilterChange("fromDate", date)}
              maxDate={filters.toDate}
            ></CustomDatePicker>
            <CustomDatePicker
              label="To"
              value={filters.toDate}
              handleChange={(date) => handleFilterChange("toDate", date)}
              minDate={filters.fromDate}
            ></CustomDatePicker>
          </Box>
        </SelectBoxHead>
        <StyledBox>
          <DataGridTable
            rows={filteredData}
            columns={columns}
            disableColumnMenu
            onColumnResize={false}
            disableSelectionOnClick
            disableColumnSorting
            disableColumnResize
            hideFooter
            columnHeaderHeight={40}
            rowHeight={40}
          />
        </StyledBox>
      </Box>
    </>
  );
}
