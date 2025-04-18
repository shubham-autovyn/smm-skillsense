import { Table, TableCell, TableRow, Typography } from "@mui/material";
import { styled as muiStyled } from "@mui/styles";
import styled from "styled-components";
// import { variables } from "../../../../styles/theme";

// add this style for edit mode td
export const EditInput = styled.input`
  outline: none;
  border: none;
  font-size: 15px;
  font-weight: 400;
  color: #343536;
  max-width: 20px;
  background-color: transparent;
`;
export const TableBox = styled(Table)`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  
  }
`;
export const Row = styled(TableRow)`
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  text-align: start;
  padding: 4px 8px;
  color: #343536;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  border-right: 1px solid #e7e7e763;
  border-left: 1px solid #e7e7e763;
  max-width: 10px;
  white-space: nowrap;
  &:nth-child(1) {
    color: #343536;
  }
`;

export const Cell = styled(TableCell)`
  font-size: 14px !important;
  padding: ${(props) =>
    props.depth > 0
      ? `4px 8px 4px ${props.depth * 32}px`
      : `4px 8px 4px 4px`} !important;
  text-align: start;
  color: #66696b;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  border-right: 1px solid #e7e7e763;
  border-left: 1px solid #e7e7e763;
  min-width: 180px;
  height: 24px;
`;

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
  // color: variables.textColor,
  marginBottom: "10px",
  borderBottom: "1px solid #d9d9db",
  padding: "15px 10px",
});
