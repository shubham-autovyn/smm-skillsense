import LockIcon from "@mui/icons-material/Lock";
import { Box, Button, Typography } from "@mui/material";

import styled from "styled-components";

export const DownloadButton = styled(Button)({
  textAlign: "center",
  "&.MuiButton-outlined": {
    padding: "7px !important",
    minWidth: "20px",
    border: "none",
  },
});
export const JobMainContainer = styled(Box)({
  padding: "16px",
});
export const JobContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
export const OperatorButton = styled(Typography)({
  margin: "0",
});
export const StationMain = styled(Box)({
  display: "flex",
  alignItems: "center",
});
export const StationContainer = styled(Box)({
  border: "1px solid #374957",
  borderRadius: "50%",
  width: "28px",
  height: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "6px",
  fontSize: "14px",
});
export const StatusLock = styled(Box)({
  color: "rgb(55, 73, 87)",
  background: "rgb(218, 220, 224)",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  height: "24px",
  width: "85px",
  gap: "4px",
  padding: "0 8px",
  margin: "5px 0px",
});
export const StatusUnlock = styled(Box)({
  color: "#58A55C",
  background: "#DFF6DD",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  height: "24px",
  width: "85px",
  gap: "10px",
  padding: "0 8px",
  margin: "5px 0px",
});

export const IconInfo = styled.span`
  font-size: 14px;
  line-height: 1;
`;
export const BtnInfo = styled(Button)({
  color: "#171C8F",
  font: "roboto",
  fontSize: "14px",
  lineHeight: "16px",
  "&.MuiButtonBase-root": {
    textTransform: "capitalize",
  },
});
export const DownloadBox = styled(Box)({
  textAlign: "center",
});
export const UnlockInfo = styled.span`
font-size: '14px',
line-height: '1'
`;
export const LockIcons = styled(LockIcon)({
  "&.MuiSvgIcon-root ": {
    fontSize: "large",
  },
});
export const StationName = styled.span`
  fontsize: 10px;
`;
export const SnackBarContainer = styled.div`
  background-color: #dff6dd;
  border-radius: 4px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  color: #343536;
  font-size: 14px;
  font-weight: 400;
`;
export const TopText = styled.div`
  background-color: #fbecc8;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 400;
  color: #343536;
`;
export const StyledSecondaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff; /* White background */
  color: #4f46e5; /* Purple text color */
  border: 1px solid #4f46e5; /* Purple border */
  border-radius: 4px; /* Rounded corners */
  padding: 8px 16px; /* Padding */
  font-size: 14px; /* Font size */
  font-weight: 600; /* Semi-bold text */
  cursor: pointer;
  transition: all 0.3s ease-in-out; /* Smooth hover effect */

  &:hover {
    background-color: #f3f4f6; /* Light gray background on hover */
    color: #3b82f6; /* Brighter purple on hover */
  }

  &:disabled {
    background-color: #e5e7eb; /* Gray background for disabled */
    color: #9ca3af; /* Gray text for disabled */
    border-color: #d1d5db; /* Light gray border for disabled */
    cursor: not-allowed;
  }
`;
