/* eslint-disable react-hooks/exhaustive-deps */
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, ThemeProvider } from "@mui/material";
import { Fragment, useState } from "react";
import { MarutiBlue500 } from "../../../../utils/colors";
import DialogCard from "../../../../components/Dialog/CustomDialogCard";
import { SMMTheme } from "../../../../Theme/theme";
import L0ToL1TrainingDetail from "./components/L0ToL1TrainingDetail";

const TrainingDetailsModal = ({
  open,
  handleClose,
  title,
  trainingDetailsData,
}) => {
  const [selectedTab, setSelectedTab] = useState("1");

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleDialogClose = () => {
    handleClose();
    setSelectedTab("1");
  };

  return (
    <ThemeProvider theme={SMMTheme}>
      <Fragment>
        <DialogCard
          open={open}
          handleClose={handleDialogClose}
          maxWidth={"lg"}
          minHeigh={"lg"}
          fullWidth={true}
          title={title}
        >
          <Box sx={{ p: 2, pt: 0 }}>
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
                      color: `${MarutiBlue500} !important`,
                    },
                  }}
                >
                  <Tab label="L0 to L1" value="1" />
                  <Tab label="L1 to L2" value="2" />
                  <Tab label="L2 to L3" value="3" />
                </TabList>
                <TabPanel value="1">
                  <L0ToL1TrainingDetail
                    trainingDetailsData={trainingDetailsData}
                    level={"L1"}
                  />
                </TabPanel>
                <TabPanel value="2">
                  <L0ToL1TrainingDetail
                    trainingDetailsData={trainingDetailsData}
                    level={"L2"}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <L0ToL1TrainingDetail
                    trainingDetailsData={trainingDetailsData}
                    level={"L3"}
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </Box>
        </DialogCard>
      </Fragment>
    </ThemeProvider>
  );
};
export default TrainingDetailsModal;
