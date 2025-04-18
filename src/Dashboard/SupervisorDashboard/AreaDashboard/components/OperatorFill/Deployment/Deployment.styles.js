import { Box } from "@mui/material";
import styled from "styled-components";

export const DeployedBox = styled(Box)`
  padding: 10px 20px;

  @media (max-width: 768px) {
    padding: 8px 15px;
  }
`;

export const SelectBoxHead = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const DeployedBoxData = styled(Box)`
  overflow-y: auto;
  max-height: 83vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    max-height: 83vh;
  }
`;

export const FilterContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  .date-picker-container {
    min-width: 440px;

    @media (max-width: 768px) {
      min-width: 100%;
    }
  }

  .filter-select-container {
    min-width: 300px;

    @media (max-width: 768px) {
      min-width: 100%;
    }
  }
`;
