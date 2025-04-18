import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";

export const MainContainer = styled(Box)({
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "8px 20px",
  margin: "10px",
  border: "1px solid #e0e0e0",
});

export const FirstHeading = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  fontWeight: 600,
  fontSize: "16px",
});
export const SecondHeading = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
export const SecHeadGrpBtn = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  alignItems: "center",
});
export const Btn1RefIcon = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const Btn2 = styled(Button)({
  display: "flex",
  alignItems: "center",
  borderRadius: "5px",
  border: "1px solid #171c8f !important",
  padding: "8px 10px",
  cursor: "pointer",
  fontSize: "10px",
});
export const FirstHeadingP = styled("p")({
  fontSize: "17px",
  fontWeight: "600",
  marginBottom: "10px",
});
export const TopHeading = styled("p")({
  fontSize: "20px",
  fontWeight: "600",
  margin: "0",
});
export const FirstHeadingSpan = styled("span")({
  fontWeight: "600",
  fontSize: "14px",
  paddingLeft: "10px",
});
export const SecondHeadingP = styled("p")({
  fontWeight: "600",
  fontSize: "14px",
  marginBottom: "10px",
});
export const SecondHeadingIng = styled("img")({
  borderRadius: "5px",
  padding: "8px 10px",
});
export const Btn2P = styled("p")({
  margin: "0",
  color: "#171c8f",
  fontSize: "smaller",
});
export const Btn2Img = styled("img")({
  paddingLeft: "5px",
});
export const TableMain = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 0px",
  gap: "15px",
});
export const TableFirstBox = styled(Box)({
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  overflow: "auto",
  height: "60vh",
});
export const TableBoxes = styled(Box)({
  width: "81%",
  display: "flex",
});
export const TableFirstCard = styled(Box)({
  backgroundColor: "#f4f5f8",
  borderRadius: "8px",
  padding: "5px 0px 3px 3px",
  width: "177px",
  height: "fit-content",
});
export const WorkersCard = styled(Box)({
  border: "1px solid #374957",
  borderRadius: "50%",
  width: 25,
  height: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 8,
  fontWeight: 600,
  flexDirection: "row",
  color: "#66696b",
});
export const WorkerCardData = styled(Box)({
  display: "flex",
  gap: "5px",
  alignItems: "center",
  margin: "0px",
});
export const ProcessStation = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "5px",
  fontSize: "9px",
  fontWeight: "600",
  color: "#66696b",
  margin: "0px",
});
export const CardImg = styled("img")({
  borderRadius: "50%",
  width: "32px",
  height: "30px",
});
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
  fontSize: "10px",
  fontWeight: "500",
});
export const ButtonGroup = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  // paddingTop: "20px",
  paddingBottom: "20px",
  marginTop: "20px",
  position: "relative",
  flexWrap: "wrap",
});

export const OperatorId = styled(Box)({
  color: "#66696B",
  fontSize: "8px",
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
export const SecondRelievers = styled(Box)({
  width: "20%",
  borderRadius: "8px",
  border: "1px solid #cfd2d9",
  backgroundColor: "#f4f5f8",
});
export const SecondRelieversP = styled("p")({
  fontSize: "14px",
  fontWeight: "600",
  backgroundColor: "#cfd2d9",
  margin: "0",
  padding: "10px",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
});
export const AssignedP = styled("p")({
  padding: "5px 0px",
  margin: "0",
  fontSize: "10px",
  fontWeight: "600",
  color: "#66696b",
});
export const AssignedSpan = styled("span")({
  color: "#343536",
  fontSize: "12px",
  fontWeight: "700",
});
export const AsidName = styled(Box)({
  color: "#343536",
  fontSize: "12px",
  fontWeight: "600",
});
export const IdId = styled(Box)({
  color: "#66696B",
  fontSize: "11px",
  fontWeight: "600",
});
export const OpsInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0 10px",
  width: "100%",
});
export const OpsName = styled(Box)({
  color: "#343536",
  fontSize: "12px",
  fontWeight: "600",
});
export const OpsId = styled(Box)({
  color: "#66696B",
  fontSize: "11px",
  fontWeight: "600",
});

export const SurplusP = styled("p")({
  // padding: "0px 10px",
  fontSize: "10px",
  fontWeight: "600",
  color: "#66696b",
});
export const SurplusSpan = styled("span")({
  color: "#343536",
  fontSize: "12px",
  fontWeight: "700",
});
export const SurplusInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0px",
  marginTop: "10px",
  padding: "0 10px",
});
export const SurplusName = styled(Box)({
  color: "#343536",
  fontSize: "12px",
  fontWeight: "600",
});
export const SurplusId = styled(Box)({
  color: "#66696B",
  fontSize: "11px",
  fontWeight: "600",
});
export const AdditionalOperators = styled(Box)({
  padding: "20px 0px",
});
export const AdditionalOperatorsPHeading = styled("p")({
  fontSize: "14px",
  fontWeight: "600",
  backgroundColor: "#cfd2d9",
  margin: "0",
  padding: "10px",
});
export const AdditionalOperatorsTotal = styled("p")({
  padding: "0px 10px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#66696b",
});
export const AdditionalOperatorsTotalSpan = styled("span")({
  color: "#343536",
  fontSize: "12px",
  fontWeight: "700",
});
export const AdditionalOperatorsInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0px",
  marginTop: "10px",
  padding: "0 10px",
  width: "100%",
});
export const AdditionalOperatorName = styled(Box)({
  color: "#343536",
  fontSize: "12px",
  fontWeight: "600",
});
export const AdditionalOperatorId = styled(Box)({
  color: "#66696B",
  fontSize: "11px",
  fontWeight: "600",
});

export const LabourBox = styled(Box)({
  display: "flex",
  gap: "10px",
  height: "100%",
  alignItems: "center",
});
export const LabourCard = styled(Box)({
  display: "flex",
  gap: "5px",
  alignItems: "center",
  backgroundColor: "#DFF6DD",
  border: "1px solid #30C0304D",
  borderRadius: "50px",
  height: "70%",
  padding: "5px 7px",
  "& p": {
    height: "15px",
  },
  "& img": {
    margin: "0",
    width: "30px",
    borderRadius: "50%",
  },
});

export const LabourText = styled(Typography)({
  fontSize: "10px",
  margin: "0",
  color: "#343536",
  fontWeight: 400,
});

export const MainSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  gap: "5px",
  paddingRight: "10px",
  justifyContent: "end",
});
export const CardBox = styled(Box)({
  display: "flex",
  margin: "2px",
  alignItems: "center",
  gap: "5px",
  padding: "5px 0px 8px 5px",
  borderRadius: "30px",
  position: "relative",
  boxShadow: "5px 5px 10px #e8e8e8, -5px -5px 10px #e8e8e8",
  width: "135px",
});
export const RelieverCardBox = styled(Box)({
  display: "flex",
  margin: "2px",
  alignItems: "center",
  marginTop: "10px",
  gap: "5px",
  padding: "5px 0px 8px 5px",
  borderRadius: "30px",
  position: "relative",
  boxShadow: "5px 5px 10px #e8e8e8, -5px -5px 10px #e8e8e8",
  width: "100%",
});
export const AdditionalCardBox = styled(Box)({
  display: "flex",
  margin: "2px",
  alignItems: "center",
  marginTop: "10px",
  gap: "5px",
  padding: "5px 0px 8px 5px",
  borderRadius: "30px",
  position: "relative",
  boxShadow: "5px 5px 10px #e8e8e8, -5px -5px 10px #e8e8e8",
  width: "100%",
});
