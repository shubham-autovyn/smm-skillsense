import { Box, Button } from "@mui/material";
import styled from "styled-components";

export const MainBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f4f5f8",
  padding: "6px 10px",
  borderRadius: "5px",
  marginTop: "10px",
});
export const TimeButton = styled(Button)({
  //   display: 'flex',
  alignItems: "center",
  backgroundColor: "transparent",
  outline: "none",
  border: "none",
  fontSize: "10px",
  color: "#171c8f",
});
export const CustomDatePickers = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  borderLeft: "2px solid darkgray",
  justifyContent: "space-between",
  padding: "0 10px",
});
export const TableBox = styled(Box)({
  border: "1px solid #e6e9f0",
  height: "50vh",

  borderRadius: "8px",
  "& .bZbISZ .MuiDataGrid-filler": {
    height: "21px !important", // Example style
  },
});
export const MonthBtn = styled.button`
  color: #33378f;
  font-size: 12px;
  padding: 4px;
  outline: none;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  text-transform: capitalize;

  // &:focus {
  //   background-color: #cfd2d9;
  // }
`;
