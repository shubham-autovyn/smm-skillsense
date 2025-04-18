import { Label } from "@mui/icons-material";
import {
  Box,
  Button,
  Input,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import styled from "styled-components";
// import styled from "styled-components";
// import Typography from "../../../../../components/Typography";
// import { fontSizes, variables } from "../../../../../styles/theme";
// import { Label } from '@mui/icons-material'

export const Head = styled(Box)({
  height: "54px",
  textAlign: "center",
});
export const TriamAreaBox = styled(Box)({
  width: "auto",
  backgroundColor: "#E6E9F0",
  padding: "0px 5px 10px 10px",
  borderRadius: "8px",
});
export const TriamHead = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
export const HeadInput = styled(Box)({
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  gap: "12px",
});
export const Inptfild = styled(Input)({
  height: "32px",
  borderRadius: "4px",
  border: "1px solid #CFD2D9",
});
export const Btn = styled(Button)({
  display: "flex",
  gap: "10px",
});
export const TriamDetails = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
export const EmpDetails = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const EmpField = styled(Box)({
  width: "40%",
});
export const EmpTextField = styled(Typography)({
  fontWeight: "600",
  lineHeight: "16px",
  letterSpacing: "-0.025em",
  color: "rgb(102, 105, 107)",
  width: "281px",
  fontSize: "14px",
});
export const EmpData = styled(Box)({
  width: "60%",
  whiteSpace: "nowrap",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "16px",
  letterSpacing: "-0.025em",
  display: "flex",
  gap: "5px",
});

export const FormControl = styled(Select)({
  "&.MuiInputBase-root  ": {
    fontSize: "large",
    height: "400px",
  },
});
export const FormControlLabel = styled(Label)({
  "&.MuiFormControlLabel-root  ": {
    fontFamily: "ITF Devanagari",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "16px",
  },
});
export const Plant2Tabs = styled(Tabs)({
  marginTop: 0,
  "& .MuiTabs-indicator": {
    display: "none",
  },
  minHeight: "24px !important",
});
export const QuestionBox = styled(Tabs)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
});
export const Plant2Tab = styled(Tab)({
  height: "24px",
  textTransform: "none",
  minWidth: "inherit",
  minHeight: "24px !important",
  letterSpacing: 0,
  margin: "0",
  color: "##66696B",
  borderTop: "1px solid #66696B !important",
  borderBottom: "1px solid #66696B !important",
  "&:nth-child(1)": {
    borderRadius: "4px 0 0 4px ",
    borderLeft: "1px solid #66696B",
  },
  "&:nth-child(3)": {
    borderRadius: "0 4px 4px 0 ",
    borderRight: "1px solid #66696B",
  },
  "&.Mui-selected": {
    fontWeight: 600,
    // fontSize: fontSizes.p3,
    // backgroundColor: variables.primaryColor,
    backgroundColor: "#171C8F",
    color: "#FFFFFF !important",
  },
});

export const FlexAlign = styled(Box)({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
});

export const FlexBetweenBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#e6e9f0",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "8px",
});
export const FlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const ParaDetail = styled(Typography)({
  fontSize: "14px",
  margin: "0",
  wordSpacing: "10px",
  marginLeft: "4px",
  textAlign: "center",
});
export const Para = styled(Typography)({
  fontSize: "14px",
  margin: "0",
  textAlign: "center",
});

export const FooterNumBox = styled(Box)({
  position: "absolute",
  top: "12px",
  right: "13px",
  fontSize: "5px",
});
export const ChangeHistoryOutlinedIcon = styled(Box)({
  fontSize: "38px",
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
export const FilterItem = styled(Box)({
  display: "flex",
  //   justifyContent: 'space-around',
  gap: "20px",
  margin: "10px 0",
  padding: "10px",
});
