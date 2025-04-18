import { Box } from "@mui/material";
import styled from "styled-components";

export const StationMain = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "100%",
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

export const StationName = styled.span`
  fontsize: 10px;
`;
export const Approval = styled.div`
  margin-left: 10px;
  border-radius: 10px;
  color: #000;
  background-color: #f1be42;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
`;
export const Check = styled.button`
  border-radius: 100%;
  background-color: ${(props) =>
    props.$approved === "true" ? "#00e741" : "rgb(139, 217, 161)"};
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;

  &:hover {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.3);
    opacity: 1;
  }
`;
export const Cross = styled.button`
  border-radius: 100%;
  background-color: ${(props) =>
    props.$rejected === "true" ? "#d60000" : "rgba(212, 91, 91, 0.54)"};
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease, opacity 0.3s ease;

  &:hover {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.3);
    opacity: 1;
  }
`;
