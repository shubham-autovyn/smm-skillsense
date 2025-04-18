import { Box, InputLabel, TextField } from "@mui/material";

import styled from "styled-components";

export const SelectDataBoxLabel = styled(InputLabel)({
  color: "#7a7c7e",
  fontWeight: "600",
  fontSize: "19px",
});

export const StyledBox = styled(Box)({
  padding: "12px",
  // width: "350px",
});

export const HeaderBox = styled(Box)({
  marginBottom: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const StyledTextField = styled(TextField)({
  marginBottom: "10px",
});

export const StationList = styled.ul`
  max-height: 250px; /* Use a hyphen instead of camel case */
  overflow-y: scroll; /* Use hyphen instead of camel case */
  padding: 0px;

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    width: 0px; /* Hide scrollbar */
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: thin; /* For Firefox */

  /* Remove scrollbar track and thumb styling */
  &::-webkit-scrollbar-thumb {
    display: none; /* Hide the scrollbar thumb */
  }

  &::-webkit-scrollbar-track {
    display: none; /* Hide the scrollbar track */
  }
`;

export const StationItem = styled.li`
  display: flex;
  align-items: center;
  margin: 0px;
  gap: 5px;
  padding: 3px 0px;
  list-style: none;
  border-bottom: 1px solid #cfd2d9;
`;

export const DialogText = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #343536;
  margin: 0px;
  padding: 0px;
`;
export const DialogSubText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #343536;
  margin: 0px;
  padding: 0px;
  text-transform: none !important;
`;
export const StationName = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #343536;
  margin: 0px;
  padding: 0px 5px 0px 0px;
  text-transform: none !important;
  border-right: 1px solid #cfd2d9;
`;
export const DialogSubLine = styled.span`
  color: #343536;
  margin: 0px;
  padding: 0px 3px;
  text-transform: none !important;
`;
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
export const MaruSpanSkill = styled(Box)({
  width: "25px",
  height: "18px",
  border: "1px solid #66696B",
  borderRadius: "60%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "8px",
  fontWeight: 600,
  padding: "2px",
});
export const MaruSpanSkillBlank = styled(Box)({
  width: "25px",
  height: "20px",
  border: "1px solid #66696B",
  borderRadius: "60%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#66696B",
});
