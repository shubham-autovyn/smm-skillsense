import { Box, Button, Typography } from "@mui/material";
import { styled as muiStyled } from "@mui/styles";
import styled from "styled-components";

import { variables } from "../../../../styles/theme";

export const AttendeesHeading = muiStyled(Typography)({
  margin: "0 30px 15px 30px",
});

export const MainContainer = muiStyled(Box)({
  padding: "12px",
  margin: "0px 30px",
  borderRadius: "8px",
  border: `1px solid ${variables.dashboardBg}`,
  backgroundColor: variables.bgColor,
});

export const TopBox = muiStyled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  padding: " 8px 16px",
  backgroundColor: "#F4F5F8",
});

export const ClearBtn = muiStyled(Button)({
  textTransform: "none",
  color: variables.primaryColor,
  margin: "0",
  fontSize: " 14px",
});
export const Filter = muiStyled(Typography)({
  textTransform: "none",
  color: variables.textColor,
  margin: "0",
});
export const SubmitButton = muiStyled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  margin: "15px 30px",
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
export const SubmitPopContent = muiStyled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "16px",
  letterSpacing: "-0.025em",
  textAlign: "left",
  color: variables.textColor,
  marginBottom: "10px",
  borderBottom: "1px solid #d9d9db",
  padding: "15px 10px",
});
export const SubmitPopButton = muiStyled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "20px",
});
export const Container = muiStyled(Box)({
  display: "flex",
});
export const LeftContainer = muiStyled(Box)({
  width: "20%",
});
export const RightContainer = muiStyled(Box)({
  width: "80%",
});
export const ContainerHeading = muiStyled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  padding: "20px",
  gap: "20px",
});
export const Remaining = muiStyled(Box)({
  display: "flex",
  flexDirection: "column",
  border: "1px solid #E6E9F0",
  borderRadius: "8px 0px 0px 8px",
  padding: "16px",
  gap: "8px",
  height: "297px",
  overflowY: "auto",
  position: "sticky",
  top: "0px",
});
export const Recommended = muiStyled(Box)({
  display: "flex",
  flexDirection: "column",
  border: "1px solid #E6E9F0",
  borderRadius: "0px 8px 8px 0px",
  padding: "16px",
});
export const FilterBox = muiStyled(Box)({
  width: "30%",
});

export const HeadingAllocation = muiStyled(Typography)({
  color: "#343536",
  fontWeight: "600",
  margin: "10px 0",
});

export const CardAllocation = muiStyled(Box)({
  border: "1px dashed #97999B",
  borderRadius: "30px",
  padding: "4px",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  boxShadow: "0px 0.6px 1.8px 0px #0000001A",
});
export const ImageAllocation = muiStyled(Box)({
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  backgroundColor: "#9C9ECA",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const ImageName = muiStyled(Typography)({
  color: "white",
  fontWeight: "700",
  margin: "0",
  fontSize: "14px",
  lineHeight: "16px",
});

export const RecommendedBoxHeading = muiStyled(Typography)({
  color: "#343536",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "16px",
  letterSpacing: "-0.025em",
  textAlign: "left",
  marginBottom: "10px",
});
export const RecommendedBox = muiStyled(Box)({
  backgroundColor: "#F4F5F8",
  padding: "16px",
  margin: "10px 0",
});
export const RecommendedBoxContent = muiStyled(Typography)({
  fontSize: "14px",
  fontWeight: "600",
  lineHeight: "16px",
  margin: "0",
  display: "inline-block",
  paddingLeft: "15px",
});

export const RecommendedCardBox = muiStyled(Box)({
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
});
export const RecommendedCardContent = muiStyled(Box)({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  justifyContent: "space-between",
});
export const BoxHeader = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin: 10px 30px;
`;

export const BoxText = styled.p`
  font-size: 14px;
  color: #171c8f;
  font-weight: 400;
  padding: 0;
  margin: 0;
`;

export const BoxSubText = styled.p`
  font-size: 14px;
  color: #343536;
  font-weight: 400;
  color: #7a7c7e;
  padding: 0;
  margin: 0;
`;
