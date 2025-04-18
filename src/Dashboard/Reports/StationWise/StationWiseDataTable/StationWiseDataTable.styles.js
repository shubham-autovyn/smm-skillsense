import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import {} from "../../../../Theme/theme";

export const TableDropFirstDetails = styled(Box)({
  width: "100%",
  maxWidth: "170px",
  minWidth: "170px",
  height: "52px",
  border: "1px solid green",
  backgroundColor: "#dff6dd",
  borderRadius: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "10px",
  padding: "0 10px",
  boxSizing: "border-box",
});
export const TableImg = styled("img")({
  width: "36px",
  height: "36px",
});
export const TableBoxDetails = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
export const TableIdLevel = styled(Typography)({
  margin: 0,
  fontWeight: "400",
  fontSize: 11,
  color: "#66696b",
});

export const TableNames = styled(Typography)({
  margin: 0,
  fontWeight: "400",
  fontSize: 12,
  color: "#343536",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "90px",
});

export const TagTrainee = styled(Box)({
  position: "absolute",
  fontSize: "8px",
  fontWeight: "700",
  color: "#ffffff",
  backgroundColor: "#343536",
  borderRadius: "12px",
  padding: "1px 4px",
  bottom: "-2px",
});

export const TableDropSecondDetail = styled(Box)({
  width: "100%",
  maxWidth: "150px",
  minWidth: "150px",
  height: "52px",
  border: "1px solid red",
  backgroundColor: "#fed9cc",
  borderRadius: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "10px",
  padding: "0 10px",
  boxSizing: "border-box",
});
