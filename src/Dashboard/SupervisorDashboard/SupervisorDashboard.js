import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import ReportDashboard from "../Reports/ReportDashboard";
import useStyles from "../styles";
import AreaDashboard from "../SupervisorDashboard/AreaDashboard/AreaDashboard";
import JobTraining from "./JobTraining/JobTraining";

const SupervisorDashboard =({ selectedTab, handleChange }) => {
  const classes = useStyles();

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ width: "100%" }}>
        <TabContext value={selectedTab}>
          <Box sx={{ display: "flex"}}>
            <Box>
            <Typography variant="h2">SKILLSENSE</Typography>
            </Box>
            <Box sx={{ display: "flex",width:"100%",justifyContent: "center" }}>
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
              <Tab label="AREA DASHBOARD" value="1" />
              <Tab label="DEPLOYMENT" value="2" />
              <Tab label="ON THE JOB TRAINING" value="3" />
              <Tab label="SKILL MATRIX" value="4" />
              <Tab label="REPORTS" value="5" />
            </TabList>
            </Box>
          </Box>
          <TabPanel value="1" sx={{ minWidth: "90vw" }}>
            <h2>Repositories</h2>
            <AreaDashboard/>
          </TabPanel>
          <TabPanel value="2" sx={{ minWidth: "90vw" }}>
            {/* <Deployment/> */}
          </TabPanel>
          <TabPanel value="3" sx={{ minWidth: "90vw" }}>
            <JobTraining />
          </TabPanel>
          <TabPanel value="4" sx={{ minWidth: "90vw" }}>
            {/*  */}
          </TabPanel>
          <TabPanel value="5" sx={{ minWidth: "90vw" }}>
            <ReportDashboard isSupervisor={true} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};
export default SupervisorDashboard;
