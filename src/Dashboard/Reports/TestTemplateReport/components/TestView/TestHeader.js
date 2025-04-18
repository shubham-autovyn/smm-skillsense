import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const TestHeader = ({ testName, testDescription, passingScore }) => {
  return (
    <Box>
      <Paper sx={{ backgroundColor: "#E6E9F0", p: "1.6rem", pb: 1 }}>
        <Box
          sx={{
            pb: "1rem",
            display: "flex",
            borderRadius: "8px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: "24px", lineHeight: "normal" }}
          >
            {testName}
          </Typography>
        </Box>
        <Box sx={{ marginTop: "0.6rem" }}>
          <Typography sx={{ fontSize: "14px" }}>
            {testDescription || ""}
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", my: "1.6rem", gap: 16 }}
        >
          <Typography variant="silverTitle" sx={{ fontSize: "14px" }}>
            Passing Score:
          </Typography>
          <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
            {passingScore ? passingScore : ""}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
export default TestHeader;
