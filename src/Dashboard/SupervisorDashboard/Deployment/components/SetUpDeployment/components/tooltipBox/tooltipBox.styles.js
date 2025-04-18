import { Box, Typography } from "@mui/material";
import styled from "styled-components";

export const TraineeApart = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "10px",
  minHeight: "56px",
  cursor: "pointer",
  width: "100%",
  justifyContent: "space-between",
});
export const OptDetails = styled(Box)({
  display: "flex",
  gap: "10px",
});
export const OptImg = styled("img")({
  width: "36px",
  height: "36px",
});
export const OptNameId = styled(Box)({
  marginTop: "4px",
  marginLeft: "2px",
});
export const Optname = styled(Typography)({
  margin: 0,
  fontWeight: "400",
  fontSize: 12,
  color: "#343536",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
export const OptIdLevel = styled(Typography)({
  margin: 0,
  fontWeight: "400",
  fontSize: 11,
  color: "#66696b",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
export const UpdateCheck = styled(Box)({
  display: "flex",
  gap: "10px",
});
export const Update = styled("span")({
  color: "#343536",
  fontWeight: "400",
  fontSize: "11px",
  borderRadius: "8px",
  backgroundColor: "#F1BE424A",
  padding: "0 10px",
  marginLeft: "18px",
  position: "relative",
  zIndex: 200,
});
export const CheckBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const CheckBoxMain = styled(Box)({
  padding: 0,
  width: "20px",
  height: "20px",
});
export const CheckImg = styled("img")({
  width: "16px",
  height: "16px",
  objectFit: "contain",
});
export const BtnsAll = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  padding: "9px 15px",
});
