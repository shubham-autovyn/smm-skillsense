import TabContext from "@mui/lab/TabContext";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import * as shopReducer from "../../../../redux/Reducers/SMMShopReducer";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DpmManpowerPlanning from "./ManPowerPlanning/manpowerplanning";
import SurplusManpower from "./SurplusManpower/surplusmanpower";
import { PlantTab, PlantTabs } from "./tabIndex.style";

const TabPanel = ({ value, index, children }) => {
  return value === index ? <Box>{children}</Box> : null;
};
const DpmTabIndex = ({ sendLabelName }) => {
  const shop = useSelector(shopReducer.getShop);
  const [value, setValue] = useState("1");
  const [labelName, setLabelName] = useState("Manpower Planning");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLabelName(tabLabels[newValue] ?? "Manpower Planning");
  };

  const tabLabels = {
    1: "Manpower Planning",
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
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px 20px 0",
          }}
        >
          <Typography variant="h4">{shop.shop_name}</Typography>
          <PlantTabs value={value} onChange={handleChange}>
            <PlantTab label="Manpower Planning" value="1" />
            <PlantTab label="Surplus Manpower" value="2" />
          </PlantTabs>
          <div></div>
        </Box>
        <TabPanel value={value} index="1">
          <DpmManpowerPlanning></DpmManpowerPlanning>
        </TabPanel>
        <TabPanel value={value} index="2">
          <SurplusManpower></SurplusManpower>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default DpmTabIndex;
