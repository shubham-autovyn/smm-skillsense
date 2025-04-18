import { Box, Typography } from "@mui/material";

import styled from "styled-components";
// import Typography from "../../../../../../../components/Typography";
export const Head = styled(Box)({
  height: "54px",
  textAlign: "center",
  backgroundColor: "#FFFFFF",
});
export const MainBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#E6E9F0",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  overflow: "scroll",
  padding: "40px 0 0 0",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

export const Header = styled(Box)({
  display: "flex",
  justifyContent: "center",
});
export const Question = styled(Typography)({
  fontFamily: "ITF Devanagari",
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "16px",
  letterSpacing: "-0.025em",
  textAlign: "left",
  textUnderlinePosition: "from-font",
  textDecorationSkipInk: "none",
});

export const FlexBetweenBox = styled(Box)({
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#CED0D4",
  padding: "6px 15px",
  marginTop: "-10px",
  borderRadius: "8px",
  marginBottom: "15px",
});
export const BootamText = styled(Typography)({
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "14.06px",
  letterSpacing: "-0.025em",
});
export const Toptext = styled(Typography)({
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "20px",
  letterSpacing: "-0.025em",
});
export const TopTextSecond = styled(Typography)({
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "16px",
  letterSpacing: "-0.025em",
});
export const TopTextScor = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "16px",
  letterSpacing: "-0.025em",
});
export const UpArrowImg = styled("img")({
  "&:hover": {
    color: "white",
  },
});
