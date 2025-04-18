import { Box, Tab, Tabs, Typography } from "@mui/material";
import styled from "styled-components";

const breakpoints = {
  sm: "@media (max-width: 600px)",
};

export const MainContainer = styled(Box)({
  height: "auto",
  borderRadius: "8px",
  backgroundColor: "#fff",
  gap: "16px",
});

export const MainBox = styled(Box)({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "row",
  marginTop: "16px",
  gap: "10px",
});

export const PlantTabs = styled(Tabs)({
  marginTop: 0,
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

export const PlantTab = styled(Tab)({
  fontWeight: 400,
  padding: "6px 24px",
  minHeight: "inherit",
  textTransform: "none",
  minWidth: "inherit",
  letterSpacing: 0,
  margin: "0",
  color: "#66696B",
  borderTop: "1px solid #66696B",
  borderBottom: "1px solid #66696B",
  "&:nth-child(1)": {
    borderRadius: "4px 0 0 4px ",
    borderLeft: "1px solid #66696B",
  },
  "&:nth-child(2)": {
    borderRadius: "0 4px 4px 0 ",
    borderRight: "1px solid #66696B",
  },
  "&.Mui-selected": {
    color: "#fff",
    fontWeight: 600,
    fontSize: "14px",
    backgroundColor: "#171C8F",
  },
});

export const UsersName = styled(Box)({
  height: "568px",
  width: "25%",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "start",
  borderRadius: "8px",
  border: "1px solid #E6E9F0",
  overflowY: "auto",
});
export const UserCard = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "58px",
  width: "100%",
  borderBottom: "1px solid #E6E9F0",
  padding: "8px 10px 8px 10px",
  gap: "8px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#eef3fd !important",
  },
});

export const UserCardStatus = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  height: "36px",
  marginLeft: "10px",
});

export const UserCardName = styled(Typography)({
  margin: "0px",
  fontWeight: "100",
  fontSize: "17px",
});
export const UserCardPara = styled(Typography)({
  margin: "0px",
  width: "95px",
});

export const MainBox2 = styled(Box)({
  width: "75%",
  height: "auto",
  borderRadius: "8px",
  border: "1px solid #E6E9F0",
});
export const UserInfo = styled(Box)({
  width: "100%",
  height: "auto", // Adjust to content
  borderRadius: "8px",
  backgroundColor: "#e8e8f4",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "16px",
  padding: "16px 16px 0px 16px",
  [breakpoints.sm]: {
    padding: "12px",
  },
});

export const UserNameImg = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "0 32px",
  [breakpoints.sm]: {
    padding: "0 16px",
  },
});

export const UserNameDate = styled(Box)({
  width: "248px",
  height: "auto",
  [breakpoints.sm]: {
    width: "100%", // Adjust width for smaller screens
  },
});

export const UserName = styled(Typography)({
  lineHeight: "30px",
  fontWeight: "600",
  fontSize: "18px",
  [breakpoints.sm]: {
    fontSize: "16px",
  },
});

export const TagTrainee = styled(Box)({
  position: "absolute",
  fontSize: "7px",
  fontWeight: "600",
  color: "#ffffff",
  backgroundColor: "#343536",
  borderRadius: "12px",
  padding: "2px 6px",
  bottom: "-2px",
});

export const UserDetail = styled(Typography)({
  lineHeight: "20px",
  fontSize: "12px",
  [breakpoints.sm]: {
    fontSize: "12px",
  },
});

export const UserDate = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "20px",
  gap: "8px",
  [breakpoints.sm]: {
    gap: "4px",
  },
});

export const UserDateBirth = styled(Typography)({
  lineHeight: "1px",
  color: "#66696B",
  fontSize: "12px",
  [breakpoints.sm]: {
    fontSize: "10px",
  },
});

export const UserDaysDetail = styled(Box)({
  color: "red",
  fontSize: "12px",
});
export const UserAttendance = styled(Box)({
  height: "auto",
  display: "flex",
  flexDirection: "column",
});
export const CloseIcons = styled(Box)({
  width: "16px",
  height: "16px",
  cursor: "pointer",
});
export const UserAllDetail = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
});
export const UserData = styled(Box)({
  width: "100%",
});

export const UserTabs = styled(Tabs)({
  width: "100%",
  "& .MuiTabs-indicator": {
    backgroundColor: "#171C8F",
  },
});

export const UserTab = styled(Tab)({
  minWidth: 50,
  fontWeight: 400,
  letterSpacing: 0,
  margin: "0 8px",
  color: "#66696b",
});
