import Box from "@mui/material/Box";
import styled from "styled-components";
import DataTable from "../../../../components/Data-table/data-table";

export const BoxContainer = styled.div`
  padding: 10px 70px;
  background-color: #f4f5f8;
`;
export const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 10px;
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
  padding: 0;
  margin: 0;
`;
export const BoxHeading = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #343536;
  margin: 0 0 10px 0;
`;
export const StepBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;
export const StepText = styled.p`
  font-size: 14px;
  color: #ffffff;
  font-weight: 600;
  padding: 0;
  margin: 0;
`;
export const StepSubText = styled.p`
  font-size: 14px;
  color: #ffffff;
  font-weight: 400;
  padding: 0;
  margin: 0;
`;
export const StepBoxOne = styled.div`
  padding: 10px 50px 10px 20px;
  background-color: #171c8f;
  clip-path: polygon(88% 0, 95% 50%, 88% 100%, 0 100%, 0 49%, 0 0);
  border-radius: 4px 0 0 4px;
  width: 360px;
`;

export const StepBoxTwo = styled.div`
  padding: 10px 20px 10px 40px;
  border: 1px solid #c1c9d2;
  background-color: #ffffff;
  clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 6.5% 50%, 0% 0%);
  border-radius: 0 4px 4px 0;
  position: relative;
  right: 39px;
  width: 357px;
  height: 64px;
`;
export const StepBoxWrapper = styled.div`
  padding: 0px 0px 0 40px;
  border: 1px solid #c1c9d2;
  clip-path: polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 6.5% 50%, 0% 0%);
  border-radius: 0 4px 4px 0;
  position: relative;
  right: 45px;
  width: 360px;
  background-color: #c1c9d2;
`;
export const StepText2 = styled.p`
  font-size: 14px;
  color: #66696b;
  font-weight: 600;
  padding: 0;
  margin: 0;
`;
export const StepSubText2 = styled.p`
  font-size: 14px;
  color: #66696b;
  font-weight: 400;
  padding: 0;
  margin: 0;
`;
export const TableContainer = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e6e9f0;
`;
export const TableHeading = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.025em;
  color: #343536;
  margin-bottom: 12px;
  margin-top: 0px;
`;
export const TableSubText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #343536;
`;

export const TableSubText2 = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #f4f5f8;
`;

export const TableBox = styled(Box)({
  width: "60%",
  borderRadius: "8px",
  border: "2px solid #E6E9F0",
});

export const DataGridTable = styled(DataTable)(({ theme }) => ({
  "& .MuiDataGrid-cell": {
    backgroundColor: "#f4f5f8",
    fontSize: "12px",
  },

  "& .MuiDataGrid-cell[data-field='delete']": {
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontSize: "12px",
    fontWeight: "600",
  },
}));
