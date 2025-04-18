import { Box, Typography } from "@mui/material";
import styled from "styled-components";

export const MainBox = styled(Box)({
  backgroundColor: "#E6E9F0",
  margin: "75px 20px 20px 20px",
});

export const ThankYouText = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "16px",
  letterSpacing: "-0.025em",
  textAlign: "center",
  color: "#66696B",
});
export const MsgBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "85vh",
  textAlign: "center",
  padding: "20px 20px 0px 20px",
  marginTop: "20px",
  backgroundColor: "#FFFFFF",
  borderRadius: " 8px",
  border: "1px solid #E2E2E2",
});
