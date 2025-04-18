import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useState } from "react";
import useStyles from "../styles";
import Requirement from "./Requirement/Requirement";
import Master from "../../Dashboard/DepartmentHeadDashboard/Master/Master";
import ReportDashboard from "../Reports/ReportDashboard";

const DepartmentHeadDashboard = ({ selectedTab, handleChange }) => {
  const classes = useStyles();

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ width: "100%" }}>
        <TabContext value={selectedTab}>
          <Box sx={{ display: "flex" }}>
            <Box>
              <Typography variant="h2">SKILLSENSE</Typography>
            </Box>
            <Box
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}
            >
              <TabList
                onChange={handleChange}
                aria-label="dialog-tabs"
                sx={{
                  "& button": {
                    borderBottom: "2px solid white",
                  },
                  "& .Mui-selected": {
                    borderBottomColor: "blue",
                  },
                }}
              >
                <Tab label="BASIC REQUIREMENTS" value="1" />
                <Tab label="REPORTS" value="2" />
                <Tab label="MASTER" value="3" />
              </TabList>
            </Box>
            <Box>
              <Typography variant="h2" sx={{ color: "transparent" }}>
                SKILLSENSE
              </Typography>
            </Box>
          </Box>
          <TabPanel value="1" sx={{ minWidth: "90vw" }}>
            <Requirement />
          </TabPanel>
          <TabPanel value="2" sx={{ minWidth: "90vw" }}>
            <ReportDashboard isDepartmentHead={true} />
          </TabPanel>
          <TabPanel value="3" sx={{ minWidth: "90vw" }}>
            <Master />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};
export default DepartmentHeadDashboard;
