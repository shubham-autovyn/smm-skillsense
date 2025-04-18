import { Box, Typography } from "@mui/material";
import { styled as muiStyled } from "@mui/styles";
import styled from "styled-components";

export const SurplusBoxTop = styled(Box)({
  backgroundColor: "#F4F5F8",
  padding: "0px 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "8px",
});

export const TypographyText = styled(Typography)({
  fontSize: "12px",
  fontWeight: "400",
  color: "#343536",
  lineHeight: "16px",
});

export const MonthBtn = styled.button`
  color: #33378f;
  font-size: 12px;
  cursor: pointer;
  padding: 4px;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  text-transform: capitalize;
  background-color: ${(props) => (props.active ? "#cfd2d9" : "initial")};
  // &:focus {
  //   background-color: #cfd2d9;
  // }
`;
export const TextBtn = styled.button({
  color: "#33378F",
  fontSize: "12px",
  backgroundColor: "transparent",
  outline: "none",
  border: "none",
  padding: "4px",
  borderRadius: "4px",
  fontWeight: "400",
});

export const ChartBox = styled(Box)({
  borderRadius: "8px",
  border: "1px solid #E6E9F0",
  padding: "16px",
  backgroundColor: "#FFFFFF",
  margin: "20px 0",
});

export const SurplusBoxMain = styled(Box)({
  padding: "10px 8px 16px",
});

export const DateContainer = styled(Box)({
  display: "flex",
  gap: "8px",
  borderRight: "1px solid #7D8087",
  borderLeft: "1px solid #7D8087",
  padding: "0 10px",
});
export const TopLeftBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});
export const TopRightBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const ResetBtn = styled.button`
  color: #9ea1a7;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const FilterBox = muiStyled(Box)({
  width: "170px",
});
export const InputBox = styled.input`
  outline: none;
  border: 1px solid #cfd2d9;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #343536;
  background-color: transparent;
  margin: 0px 0px 10px 0px;
  padding: 5px 8px;
  width: 260px;
`;
