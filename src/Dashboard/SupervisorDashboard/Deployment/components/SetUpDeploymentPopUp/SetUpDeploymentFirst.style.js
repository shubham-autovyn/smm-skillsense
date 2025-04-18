import { Box, Typography } from "@mui/material";
import styled from "styled-components";

export const MainContainer = styled(Box)({
  padding: "20px 70px 20px 70px",
  backgroundColor: "#E6E9F0",
});
export const MainHeading = styled(Typography)({
  fontSize: 24,
  color: "#343536",
  fontWeight: 600,
  fontFamily: "Roboto",
  marginTop: "25 px",
});
export const SecondHeading = styled(Typography)({
  fontSize: 14,
  color: "#343536",
  fontWeight: 400,
  marginTop: "20px",
});
export const TabContainer = styled(Box)({
  display: "flex",
  marginRight: "2",
  marginLeft: "2",
  marginTop: "20px",
  height: "365px",
  gap: "20px",
});
export const TableManagement = styled(Box)({
  width: "80%",
  border: "8px solid #e6e9fo",
  borderRadius: "8px",
  overflow: "auto",
  marginTop: "2",
  backgroundColor: "#ffffff",
});
export const TableDrop = styled(Box)({
  width: "20%",
  height: "365px",
  border: "1px solid #e6e9fo",
  textAlign: "center",
  backgroundColor: "#ffffff",
  overflow: "auto",
});
export const TableDropName = styled(Typography)({
  fontWeight: "600",
  fontSize: "12px",
  padding: "19px",
});
export const TableDropList = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  flexDirection: "column",
});
export const TableDropFirstDetails = styled(Box)({
  width: "142px",
  height: "44px",
  border: "1px solid #9598a1",
  borderStyle: "dashed",
  borderRadius: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
});
export const TableDropSecondDetails = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "163px",
  height: "44px",
  top: "13px",
  left: "382px",
  gap: "10px",
  border: "1px solid #171c8f",
  borderStyle: "dashed",
  borderRadius: "30px",
});
export const TableDropSecondName = styled(Typography)({
  margin: "auto",
  color: "#171caf",
});

export const ButtonGrp = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  paddingTop: "10px",
});
export const TableImg = styled("img")({
  width: "36px",
  height: "36px",
});
export const TableBoxDeatils = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
export const TableNames = styled(Typography)({
  margin: 0,
  fontWeight: "400",
  fontSize: 12,
  color: "#343536",
});
export const TableIdLevel = styled(Typography)({
  margin: 0,
  fontWeight: "400",
  fontSize: 11,
  color: "#66696b",
});
export const TraineeBox = styled(Box)({
  width: "142px",
  height: "44px",
  border: "1px solid #171c8f",
  borderStyle: "dashed",
  borderRadius: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});
export const TraineeP = styled("p")({
  color: "#171c8f",
  margin: "0",
  fontSize: "12px",
  fontWeight: "400",
});

export const ConfirmBox = styled(Box)({
  padding: "10px 14px",
  width: "400px",
});
export const ProcessStations = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});
export const ProcessIcons = styled(Box)({
  border: "1px solid #374957",
  borderRadius: "50%",
  width: 28,
  height: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  flexDirection: "row",
});
export const ProcessP = styled(Typography)({
  fontWeight: "600",
  fontSize: "10px",
});
export const ProcessSpan1 = styled("span")({
  fontWeight: "700",
  fontSize: "14px",
});
export const ProcessSpan2 = styled("span")({
  fontWeight: "400",
  fontSize: "14px",
});
export const MainOperatorBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  width: "142px",
  gap: "10px",
  border: "1px dashed grey",
  borderRadius: "30px",
  padding: "5px 10px",
});
export const MainOprImg = styled("img")({
  width: "36px",
});
export const MainOprDetails = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
export const MainOprSapn = styled("span")({
  fontWeight: "400",
  fontSize: 12,
  color: "#343536",
});
export const MainOprSapn1 = styled("span")({
  fontWeight: "400",
  fontSize: 11,
  color: "#66696b",
});
export const TraineeBoxx = styled(Box)({
  display: "flex",
  alignItems: "center",
  top: "13px",
  cursor: "pointer",
  left: "382px",
  gap: "10px",
});
export const TranieeAssign = styled(Box)({
  width: "142px",
  height: "44px",
  border: "1px solid #171c8f",
  borderStyle: "dashed",
  borderRadius: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
export const TranieeP = styled(Typography)({
  color: "#171c8f",
  margin: "0",
});
export const IconUpdate = styled(Box)({
  border: "1px solid grey",
  borderRadius: "50%",
  width: 28,
  height: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 16,
  flexDirection: "row",
});
// export const DialogTitle = styled()({
//   display: 'none !important',
// })

export const SBMain = styled(Box)({
  paddingBottom: "10px",
});
export const SearchBox = styled(Box)({
  padding: "0 10px",
  minWidth: "208px",
});
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
export const DragDropBox = styled(Box)({
  //   backgroundColor: "#E8E8F4 !important",
});
