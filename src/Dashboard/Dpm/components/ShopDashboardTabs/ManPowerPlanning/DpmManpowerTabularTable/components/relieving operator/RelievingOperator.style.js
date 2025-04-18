import { Box, Dialog } from "@mui/material";
import styled from "styled-components";
import { DataGridTable } from "../../../../../../../../components/Data-table/dataTable.styles";

export const DialogBox = styled(Dialog)(({}) => ({
  "& .MuiPaper-root": {
    width: "65%",
    maxWidth: "100%",
  },
}));

export const FilterBox = styled(Box)({
  backgroundColor: "#F4F5F8",
  padding: " 10px",
});

export const StyledDataGridReliver = styled(DataGridTable)(({}) => ({
  overflow: "auto",
  width: "100%",
  minHeight: "40vh",
  "& .MuiDataGrid-columnHeaders": {
    textAlign: "center",
    justifyContent: "center",
    fontSize: "12px",
    height: "40px !important",
  },

  "& .MuiDataGrid-row": {
    fontSize: "12px",
  },

  "& .MuiDataGrid-row .MuiDataGrid-cell:last-child": {
    textAlign: "center",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
  },
  "& .MuiDataGrid-columnHeaderTitleContainer": {
    justifyContent: "center",
    height: "40px !important",
  },
  "& .css-1yg33uj li": {
    fontSize: "12px",
    cursor: "pointer",
  },
  "& .MuiDataGrid-columnHeader": {
    "& .MuiDataGrid-sortIcon": {
      visibility: "hidden",
      color: "#c4c6c8",
    },
  },
}));

export const DateTabs = styled(Box)({
  width: "100%",
  paddingTop: "20px",
  "& .MuiSvgIcon-root": {
    height: "3rem",
    width: "3rem",
  },
  "& .MuiTabScrollButton-root": {
    width: "15px",
  },
});
