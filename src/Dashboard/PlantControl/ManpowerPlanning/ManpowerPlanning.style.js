import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import styled from "styled-components";

export const MainContainer = styled(Box)({
  border: "2px solid #E6E9F0",
  borderRadius: "10px",
  marginTop: "10px",
  backgroundColor: "white",
});

export const TopBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "10px 25px",
  //   border: '2px solid #e5e6e6',
  justifyContent: "space-between",
});

export const SecondBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#e5e6e6",
  margin: "0 25px 10px 25px",
});

export const TimeButton = styled(Button)({
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent",
  outline: "none",
  border: "none",
  color: "#33378f",
  fontSize: "12px",
  padding: 0,
  textTransform: "none",
  fontWeight: "500",
});

export const CustomDatePicker = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  borderLeft: "2px solid darkgray",
  borderRight: "2px solid darkgray",
  justifyContent: "space-between",
  width: "70%",
  padding: "0 10px",
});
export const FilterBox = styled(Box)({
  padding: "10px 20px 0px",
});
