import { Box, Button } from "@mui/material";
import styled from "styled-components";

export const TopHiringBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f4f5f8",
  margin: "10px 10px 15px 0px",
  padding: "3px 10px",
  borderRadius: "5px",
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
export const CustomDatePicker = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  borderLeft: "2px solid darkgray",
  justifyContent: "space-between",

  padding: "0 10px",
});

export const SecondHiringBox = styled(Box)({
  backgroundColor: "#e6e9f0",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "6px 10px",
  margin: "10px 10px 15px 0px",
  borderRadius: "5px",
});
export const TableBox = styled(Box)({
  border: "1px solid #e6e9f0",
  borderRadius: "8px",
  marginRight: "10px",
  "& .MuiDataGrid-filler": {
    height: "21px !important",
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

  &:focus {
    background-color: #cfd2d9;
  }
`;
