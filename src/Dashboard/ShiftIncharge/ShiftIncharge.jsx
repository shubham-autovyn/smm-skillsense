import CheckIcon from "@mui/icons-material/Check";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Link } from "@mui/material";
import React, { useState } from "react";
import { DataGridTable } from "../../components/Data-table/dataTable.styles";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Approve from "../LineIncharge/components/approve";
import "./ShiftIncharge.css";
import {
  Check,
  Cross,
  StationMain,
  Table,
  TableButton,
} from "./ShiftIncharge.style";

const ShiftIncharge = () => {
  const [actionType, setActionType] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [approve, setApprove] = useState(false);
  const [rowData, setRowData] = useState([
    { id: 546282, name: "Siddharth Patel", area: "CHASSIS-2", shift: "A" },
    { id: 537128, name: "Ravi Gupta", area: "DRSA", shift: "B" },
    { id: 593729, name: "Ramesh Kumar", area: "TRIM-1", shift: "A" },
    { id: 504203, name: "Harsh Desai", area: "TRIM-2", shift: "B" },
    { id: 531919, name: "Arjun Sharma", area: "CHASSIS-1", shift: "A" },
  ]);
  // const rows = [
  //   { id: 546282, name: "Siddharth Patel", area: "CHASSIS-2", shift: "A" },
  //   { id: 537128, name: "Ravi Gupta", area: "DRSA", shift: "B" },
  //   { id: 593729, name: "Ramesh Kumar", area: "TRIM-1", shift: "A" },
  //   { id: 504203, name: "Harsh Desai", area: "TRIM-2", shift: "B" },
  //   { id: 531919, name: "Arjun Sharma", area: "CHASSIS-1", shift: "A" },
  // ];

  const columns = [
    { field: "id", headerName: "Supervisor ID", flex: 1, fontWeight: "bold" },
    { field: "name", headerName: "Supervisor Name", flex: 1.5 },
    { field: "area", headerName: "Area", flex: 1 },
    {
      field: "trainingPlan",
      headerName: "Multi Skilling Training Plan",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            color: "#47badf",
            textDecoration: "underline",
            textAlign: "center",
          }}
        >
          <Link href="#" underline="hover">
            <p style={{ color: "#47badf" }}>View Training Plan</p>
          </Link>
        </Box>
      ),
    },
    { field: "shift", headerName: "Shift", flex: 1 },
    {
      field: "status",
      headerName: "Checked Status",
      flex: 1,
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
  ];

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
  console.log(rowData, "rowData");

  return (
    <>
      <div className="FlexBox">
        <h1 className="heading">SMART MANPOWER MANAGEMENT</h1>
      </div>

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px 10px 0 0",
          padding: "20px",
          marginTop: "10px",
          height: "70vh",
        }}
      >
        <Table>
          <DataGridTable
            columns={columns}
            rows={rowData}
            disableSelectionOnClick
            disableColumnMenu
            disableColumnResize
            disableColumnSorting
            sx={{
              "& .MuiDataGrid-cell": {
                color: "#c9cbcf",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
            }}
          ></DataGridTable>
        </Table>

        <TableButton>
          <PrimaryButton>Submit</PrimaryButton>
        </TableButton>
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
      </Box>
    </>
  );
};

export default ShiftIncharge;
