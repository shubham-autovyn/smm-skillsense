import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Paper, Tab, ThemeProvider } from "@mui/material";
import { Fragment, useState } from "react";
import { SMMTheme } from "../../../Theme/theme";
import L0ToL3New from "./L0ToL3New/L0ToL3New";
import { L3ToL4 } from "./L3ToL4/L3ToL4";

const JobTraining = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <ThemeProvider theme={SMMTheme}>
      <Fragment>
        <Paper sx={{ p: 1.6 }}>
          <Box sx={{ width: "100%" }}>
            <TabContext value={selectedTab}>
              <TabList
                onChange={handleChange}
                aria-label="dialog-tabs"
                sx={{
                  "& button": {
                    borderRadius: 1,
                  },
                  "& .Mui-selected": {
                    borderBottomColor: "blue",
                    backgroundColor: "#F4F5F8",
                  },
                }}
              >
                <Tab label="L0 to L3" value="1" />
                <Tab label="L3 to L4" value="2" />
              </TabList>

              <TabPanel
                value="1"
                sx={{
                  minWidth: "90vw",
                  padding: "0rem 0rem 0rem 0rem !important",
                }}
              >
                <L0ToL3New />
              </TabPanel>
              <TabPanel
                value="2"
                sx={{
                  minWidth: "90vw",
                  padding: "0rem 0rem 0rem 0rem !important",
                }}
              >
                <L3ToL4 />
              </TabPanel>
            </TabContext>
          </Box>
        </Paper>
      </Fragment>
    </ThemeProvider>
  );
};
export default JobTraining;
