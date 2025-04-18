import { Box } from "@mui/material";
import styled from "styled-components";

export const CardName = styled(Box)({
  borderRadius: "50%",
  width: "32px",
  height: "30px",
  border: " 1px solid rgb(207, 210, 217)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "10px",
  fontWeight: "600",
});

export const OperatorName = styled(Box)({
  color: "#343536",
  fontSize: "8px",
  fontWeight: "500",
});
export const OperatorId = styled(Box)({
  color: "#66696B",
  fontSize: "7px",
  fontWeight: "400",
});
export const TagTrainee = styled(Box)({
  position: "absolute",
  left: "0",
  fontSize: "7.5px",
  fontWeight: "600",
  color: "#ffffff",
  backgroundColor: "#343536",
  borderRadius: "12px",
  padding: "2px 6px",
  marginTop: "48px",
});
export const ButtonGrp = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  paddingTop: "10px",
});
