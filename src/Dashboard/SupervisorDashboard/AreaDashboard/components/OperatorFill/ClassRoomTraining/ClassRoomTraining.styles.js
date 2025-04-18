import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)({
  height: "57vh",
  marginTop: "20px",
  width: "100%",
  "& .MuiDataGrid-columnHeaders": {
    fontSize: "14px",
  },
  "& .MuiDataGrid-row": {
    fontSize: "14px",
    color: "#66696b",
  },
});
