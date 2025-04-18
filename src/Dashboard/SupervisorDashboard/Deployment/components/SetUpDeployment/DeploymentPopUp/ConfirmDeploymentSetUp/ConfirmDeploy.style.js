import { Box, Typography } from "@mui/material";
import styled from "styled-components";

export const Details = styled(Typography)({
  fontSize: "12px",
  fontWeight: "400",
  color: "#66696b",
  padding: "10px 10px",
});
export const BtnBox = styled(Box)({
  borderTop: "1px solid #e6e9f0",
  paddingTop: "10px",
});
export const BtnAll = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
});
