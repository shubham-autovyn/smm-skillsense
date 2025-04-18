import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Paper, Tab, ThemeProvider } from "@mui/material";
import { Fragment, useState } from "react";
import { SMMTheme } from "../../../Theme/theme";
import AreaMaster from "./components/AreaMaster/AreaMaster";
import RoleMaster from "./components/RoleMaster/RoleMaster";

const Master = () => {
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
                <Tab label="Area Master" value="1" />
                <Tab label="Role Master" value="2" />
              </TabList>
              <TabPanel value="1" sx={{ minWidth: "90vw" }}>
                <AreaMaster />
              </TabPanel>
              <TabPanel value="2" sx={{ minWidth: "90vw" }}>
                <RoleMaster />
              </TabPanel>
            </TabContext>
          </Box>
        </Paper>
      </Fragment>
    </ThemeProvider>
  );
};
export default Master;
