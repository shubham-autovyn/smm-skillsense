import { Box, Switch, Typography } from "@mui/material";
import styled from "styled-components";

export const ManPowerBoxTop = styled(Box)({
  backgroundColor: "#F4F5F8",
  padding: "0px 8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "8px",
});

export const CustomSwitch = styled(Switch)({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#171C8F", // custom color for the switch handle
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#001b5a", // custom color for the track
  },
});

export const TypographyText = styled(Typography)({
  fontSize: "12px",
  fontWeight: "400",
  color: "#343536",
  lineHeight: "25px",
});

export const MonthBtn = styled.button`
  color: #33378f;
  font-size: 12px;
  padding: 4px;
  outline: none;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  text-transform: capitalize;

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
