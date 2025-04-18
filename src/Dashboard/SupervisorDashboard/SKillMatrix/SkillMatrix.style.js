import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";

export const SkillMatrixContainer = styled(Box)({
  //   width: '100%',
  backgroundColor: "white",
  borderRadius: "8px",
});
export const SkillMatrixBox = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 16px",
});
export const FlexBoxMatrix = styled(Box)({
  //   width: '100%',
  display: "flex",
  gap: "20px",
  alignItems: "center",
  //   padding: '10px 16px',
});
export const ContainerHeading = styled(Typography)({
  // width: "100%",
  fontSize: "18px",
  fontWeight: 600,
  lineHeight: "16px",
  letterSpacing: "-0.025em",
  margin: "0 ",
  display: "flex",
  justifyContent: "space-between",
});
export const TimerHeading = styled(Typography)({
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "16px",
  letterSpacing: "-0.025em",
});
export const DownloadButton = styled(Button)({
  "&.MuiButton-outlined": {
    padding: "7px !important",
    // borderColor: variables.primaryColor,
    minWidth: "20px",
  },
});
