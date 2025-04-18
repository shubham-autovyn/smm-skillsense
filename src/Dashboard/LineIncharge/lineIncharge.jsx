import CheckIcon from "@mui/icons-material/Check";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Box, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import PrimaryButton from "../../utils/Buttons/PrimaryButton/PrimaryButton";
import MaruA from "../../assets/icons/MaruA.svg";
import MaruAAR from "../../assets/icons/MaruAAR.svg";
import MaruAR from "../../assets/icons/MaruAR.svg";
import NonMaru from "../../assets/icons/NonMaru.svg";
import { DataGridTable } from "../../components/Data-table/dataTable.styles";
import JoineeNames from "../SupervisorDashboard/JobTraining/L0ToL3New/components/JoineeNames/JoineeName";
import Approve from "./components/approve";
import SuccessDialog from "./components/successDialog";
import "./lineIncharge.css";
import {
  Approval,
  Check,
  Cross,
  StationMain,
  StationName,
} from "./lineIncharge.style";

const LineIncharge = () => {
  const [selectedStaffRow, setSelectedStaffRow] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("New Joinees");
  const [expandedCategory, setExpandedCategory] = useState("New Joinees");
  const [actionType, setActionType] = useState(null);
  const [success, setSuccess] = useState(false);
  const [rowData, setRowData] = useState([
    {
      id: 1,
      staff: "S001",
      name: "John Doe",
      processStation: {
        maru: null,
        stationName: "7RA",
        description: "Break Pipe Fitment",
      },
      trainingLevel: "L1",
    },
    {
      id: 2,
      staff: "S002",
      name: "Jane Smith",
      processStation: {
        maru: "A/AR",
        stationName: "7RB",
        description: "TMC Fitment",
      },
      trainingLevel: "L2",
    },
    {
      id: 3,
      staff: "S003",
      name: "Alice Johnson",
      processStation: {
        maru: "AR",
        stationName: "7RC",
        description: "Sunvisor Fitment",
      },
      trainingLevel: "L3",
    },
  ]);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [approve, setApprove] = useState(false);

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

  const processStation = (rowData) => {
    const maruIcon = getMaruIcon(rowData?.processStation?.maru);

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <img src={maruIcon} alt="Maru icon" width={18} height={16} />
        {`${rowData?.processStation?.stationName} | ${rowData?.processStation?.description}`}
      </Box>
    );
  };

  const columns = useMemo(
    () => [
      {
        field: "staff",
        headerName: "Staff ID",
        resizable: false,
        flex: 1,
        headerClassName: "super-app-theme--header",
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
              Staff ID
            </Typography>
          </Box>
        ),
      },
      {
        field: "name",
        headerName: "Name",
        resizable: false,
        sortable: true,
        flex: 1,
        headerClassName: "super-app-theme--header",
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
              Name
            </Typography>
          </Box>
        ),
      },
      {
        field: "processStation",
        headerName: "Process Station",
        resizable: false,
        sortable: true,
        flex: 2,
        headerClassName: "super-app-theme--header",
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
              Process Station
            </Typography>
          </Box>
        ),

        renderCell: (params) => processStation(params.row),
      },
      {
        field: "trainingLevel",
        headerName: "Training Level",
        resizable: false,
        sortable: true,
        flex: 2,
        headerClassName: "super-app-theme--header",
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
              Training Level
            </Typography>
          </Box>
        ),
        renderCell: (params) => (
          <StationMain>
            <StationName>{params.value}</StationName>
            {!params.row.approved && !params.row.rejected && (
              <Approval>
                <StationName>Pending For Approval</StationName>
              </Approval>
            )}
          </StationMain>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        resizable: false,
        flex: 1,
        sortable: true,
        headerClassName: "super-app-theme--header",
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
              Status
            </Typography>
          </Box>
        ),
        renderCell: (params) => (
          <StationMain>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Check
                onClick={() => handleApprove(params.row.id)}
                $approved={params.row.approved === true ? "true" : "false"}
              >
                <CheckIcon sx={{ color: "white", fontSize: "18px" }} />
              </Check>
              <Cross
                onClick={() => handleReject(params.row.id)}
                $rejected={params.row.rejected === true ? "true" : "false"}
              >
                <CloseRoundedIcon sx={{ color: "white", fontSize: "18px" }} />
              </Cross>
            </Box>
          </StationMain>
        ),
      },
    ],
    []
  );

  const handleApprove = (id) => {
    setSelectedUserId(id);
    setActionType("approve");
    setApprove(true);
  };
  const handleReject = (id) => {
    setSelectedUserId(id);
    setActionType("reject");
    setApprove(true);
  };

  const dataL0ToL3 = {
    response: {
      newJoinee: [
        {
          ID: 127,
          shopId: 40,
          staffID: "658178",
          areaName: "FINAL",
          trainingStatus: "Started",
          startDate: "30/03/2024",
          staffName: "MR. YASH",
          isTrainingOngoing: true,
          plannedMonth: "Feb",
          ExhaustedDay: 11,
          plannedDays: 19,
          stationName: "10L",
          description: "LT STRUT MTG.",
          currentLevel: 0,
          plannedLevel: 2,
          groupName: "A",
          lineName: "1",
          maru: "A",
        },
      ],
      existingOperator: [
        {
          ID: 127,
          shopId: 40,
          staffID: "653221",
          areaName: "FINAL",
          trainingStatus: "Started",
          startDate: "30/06/2024",
          staffName: "MR. YASH RAOooo",
          isTrainingOngoing: true,
          plannedMonth: "Feb",
          ExhaustedDay: 4,
          plannedDays: 19,
          stationName: "10L",
          description: "LT STRUT MTG.",
          currentLevel: 2,
          plannedLevel: 2,
          groupName: "A",
          lineName: "1",
          maru: null,
        },
      ],
    },
  };

  const handleCategorySelect = (name) => {
    setSelectedCategory(name);
    setSelectedStaffRow({});
  };

  const getStaffData = (filterStatus = false) => {
    if (!dataL0ToL3 || !dataL0ToL3?.response) {
      return [];
    }

    if (selectedCategory === "New Joinees") {
      if (filterStatus) {
        return dataL0ToL3?.response.newJoinee.filter(
          (data) => data.trainingStatus === "STARTED"
        );
      }
      return dataL0ToL3?.response.newJoinee;
    } else if (selectedCategory === "Existing Operators Multi-Skilling") {
      return dataL0ToL3?.response.existingOperator;
    }

    return [];
  };

  const handleStaffClick = (staffData) => {
    setSelectedStaffRow(staffData);
  };
  const isSubmitDisabled = !rowData.some((row) => row.approved || row.rejected);

  const handleSubmit = () => {
    setSuccess(true);
    setRowData((prevRows) =>
      prevRows.filter((row) => !row.approved && !row.rejected)
    );
  };
  return (
    <>
      <div className="FlexBox my1">
        <h1 className="heading">Smart Manpower Management</h1>
        <NotificationsRoundedIcon sx={{ color: "#989898", fontSize: "26px" }} />
      </div>

      <div>
        <Box
          //   className={`${classes["ojt-container-table-dimensions"]}`}
          sx={{
            display: "flex",
            gap: "10px",
            padding: "10px",
            backgroundColor: "#fff",
            width: "100%",
            height: "73vh",
          }}
        >
          <JoineeNames
            joineeData={dataL0ToL3?.response}
            handleCategorySelect={handleCategorySelect}
            handleStaffClick={handleStaffClick}
            selectedStaffData={selectedStaffRow}
            expandedCategory={expandedCategory}
            setExpandedCategory={(val) => setExpandedCategory(val)}
          />

          {/* {selectedStaffRow?.staffID !== undefined && ( */}
          <Box
            sx={{
              // overflowY: "scroll",
              width: "80%",
              p: 2,
              // scrollbarWidth: "thin",
              border: "1px solid var(--Grey-20, #E6E9F0)",
            }}
          >
            <div>
              <h1>New Joinee Summary</h1>
              <h2 style={{ marginTop: "10px" }}>Total 6</h2>
            </div>{" "}
            <div className="table-box">
              <DataGridTable
                disableAutosize
                disableColumnMenu
                disableColumnSorting
                columns={columns}
                rows={rowData}
              />
            </div>
            <div className="submitBtn">
              <div>
                <PrimaryButton
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled}
                >
                  Submit
                </PrimaryButton>
              </div>
            </div>
          </Box>
          {approve && (
            <Approve
              open={approve}
              setApprove={setApprove}
              actionType={actionType}
              sentForApproval={() => {
                setRowData((prevRows) =>
                  prevRows.map((row) =>
                    row.id === selectedUserId
                      ? {
                          ...row,
                          approved: actionType === "approve",
                          rejected: actionType === "reject",
                        }
                      : row
                  )
                );
              }}
            />
          )}
          {success && <SuccessDialog open={success} setOpen={setSuccess} />}
        </Box>
      </div>
    </>
  );
};

export default LineIncharge;
