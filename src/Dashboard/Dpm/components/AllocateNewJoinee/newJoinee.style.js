import { Box, Typography } from "@mui/material";

import styled from "styled-components";
import { variables } from "../../../../styles/theme";

export const NewJoineeContainer = styled.div`
  padding: 20px 40px;
  background-color: #f4f5f8;
`;

export const NewJoineeHeader = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin-bottom: 10px;
`;

export const NewJoineeText = styled.p`
  font-size: 14px;
  color: #171c8f;
  font-weight: 400;
  padding: 0;
  margin: 0;
`;

export const NewJoineeSubText = styled.p`
  font-size: 14px;
  color: #343536;
  font-weight: 400;
  color: #7a7c7e;
  padding: 0;
  margin: 0;
`;
export const NewJoineeSubText2 = styled.p`
  font-size: 24px;
  color: #343536;
  font-weight: 600;
  padding: 0;
  margin: 0 0 10px 0;
`;
export const NewJoineeBox = styled.div`
  border-radius: 8px;
  border: 1px solid #e6e9f0;
  padding: 16px;
  background-color: white;
`;
export const NewJoineeBoxHeader = styled.div`
  display: flex;
  gap: 20px;
  align-items: start;
  background-color: #e6e9f0;
  border-radius: 8px;
  padding: 16px;
`;

export const NewJoineeBoxText = styled.p`
  font-size: 14px;
  color: #66696b;
  font-weight: 400;
  padding: 0;
  margin: 0 0 5px 0;
`;

export const NewJoineeBoxSubText = styled.p`
  font-size: 20px;
  color: #343536;
  font-weight: 600;
  padding: 0;
  margin: 0;
`;
export const TableText = styled.p`
  font-size: 16px;
  color: #343536;
  font-weight: 600;
  padding: 0;
  margin-bottom: 10px;
`;
export const DataTable = styled.div`
  padding: 0px;
  height: 429px;
  overflow-y: auto;
  /* Hide scrollbar for Webkit browsers */
  &::-webkit-scrollbar {
    width: 2px; /* Hide scrollbar */
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: visible; /* For Firefox */

  /* Remove scrollbar track and thumb styling */
  &::-webkit-scrollbar-thumb {
    display: visible; /* Hide the scrollbar thumb */
  }

  &::-webkit-scrollbar-track {
    display: visible; /* Hide the scrollbar track */
  }
`;
export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;
export const SubmitPopHeading = styled(Typography)({
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "20px",
  letterSpacing: "-0.025em",
  textAlign: "left",
  padding: "0px 10px",
});
export const SubmitPopContent = styled(Typography)({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "16px",
  letterSpacing: "-0.025em",
  textAlign: "left",
  color: variables.textColor,
  margin: "0",
  borderBottom: "1px solid #d9d9db",
  padding: "15px 10px",
});

export const SubmitPopButton = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  padding: "10px 0",
  gap: "10px",
});
