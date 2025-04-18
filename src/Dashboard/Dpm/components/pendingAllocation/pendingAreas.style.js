import { Box, Typography } from "@mui/material";

import styled from "styled-components";
import { variables } from "../../../../styles/theme";

export const PendingHeading = styled(Typography)({
  margin: "0 30px 15px 30px",
});
export const MainContainer = styled(Box)({
  padding: "16px",
  margin: "0px 30px",
  borderRadius: "8px",
  border: `1px solid ${variables.dashboardBg}`,
  backgroundColor: variables.bgColor,
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
