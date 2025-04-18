import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Paper, Tab, ThemeProvider } from "@mui/material";
import { Fragment, useState } from "react";
import { SMMTheme } from "../../../Theme/theme";

const Requirement = () => {
  return (
    <ThemeProvider theme={SMMTheme}>
      <Fragment>
        <Paper sx={{ my: 1, p: 1.6 }}>
          <Box sx={{ width: "100%" }}>
           TODO
          </Box>
        </Paper>
      </Fragment>
    </ThemeProvider>
  );
};
export default Requirement;
