import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import * as React from "react";
import { useEffect, useState } from "react";
import ManpowerOverview from "./ManPowerOverView/manpowerOverview";
import { PlantTab, PlantTabs } from "./PlanControlTabs.Style";
import SurplusManpower from "./SurplusManpower/surplusmanpower";

const TabPanel = ({ value, index, children }) => {
  return value === index ? <Box>{children}</Box> : null;
};
const PlanControlTabs = ({ sendLabelName }) => {
  const [value, setValue] = useState("1");
  const [labelName, setLabelName] = useState("Manpower Overview");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLabelName(tabLabels[newValue] ?? "Manpower Overview");
  };

  const tabLabels = {
    1: "Manpower Overview",
    2: "Surplus Manpower",
  };
  useEffect(() => {
    sendLabelName(labelName);
  }, [labelName, sendLabelName]);

  return (
    <Box
      sx={{
        border: "2px solid #E6E9F0",
        borderRadius: "10px",
        marginTop: "10px",
        backgroundColor: "white",
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px 20px",
          }}
        >
          <PlantTabs value={value} onChange={handleChange}>
            <PlantTab
              className="left-btn"
              label="Manpower Overview"
              value="1"
            />
            <PlantTab
              className="right-btn"
              label="Surplus Manpower"
              value="2"
            />
          </PlantTabs>
        </Box>
        <TabPanel value={value} index="1">
          <ManpowerOverview></ManpowerOverview>
        </TabPanel>
        <TabPanel value={value} index="2">
          <SurplusManpower></SurplusManpower>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default PlanControlTabs;
