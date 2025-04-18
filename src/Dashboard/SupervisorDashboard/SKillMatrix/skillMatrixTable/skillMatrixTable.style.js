import { Box, Typography } from "@mui/material";
import { styled as muiStyled } from "@mui/styles";
import styled from "styled-components";
export const MaruSpanSkill = styled(Box)({
  minWidth: "28px",
  maxWidth: "32px",
  height: "18px",
  border: "1px solid #66696B",
  borderRadius: "60%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  fontWeight: 600,
});
export const NonMaruSpanSkill = styled(Box)({
  width: "28px",
  height: "18px",
  border: "1px solid #66696B",
  borderRadius: "60%",
  backgroundColor: "#7A7C7E",
});

export const StationsText = styled(Typography)({
  fontSize: "12px",
  margin: "0",
  color: "#66696B",
  width: "65px",
  textAlign: "center",
});
export const HeaderText = styled(Typography)({
  fontSize: "16px",
  margin: "0",
  width: "70px",
  fontWeight: 600,
  textAlign: "center",
});
export const FooterText = styled(Typography)({
  fontSize: "14px",
  margin: "0",
  fontWeight: 600,
  textAlign: "center",
  whiteSpace: "nowrap",
});
export const TableText = styled(Typography)({
  fontSize: "9px",
});

export const SubmitButton = muiStyled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  margin: "20px 30px",
  gap: "20px",
});

export const SubmitPopHeading = muiStyled(Typography)({
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "20px",
  letterSpacing: "-0.025em",
  textAlign: "left",
  padding: "0 10px",
});
