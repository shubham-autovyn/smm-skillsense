import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { fontSizes, variables } from "../../../../styles/theme";

export const PlantTabs = styled(Tabs)({
  marginTop: 0,
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

export const PlantTab = styled(Tab)({
  fontWeight: 400,
  padding: "6px 24px",
  minHeight: "inherit",
  textTransform: "none",
  minWidth: "inherit",
  letterSpacing: 0,
  margin: "0",
  color: "#66696B",
  borderTop: "1px solid #66696B",
  borderBottom: "1px solid #66696B",
  "&:nth-child(1)": {
    borderRadius: "4px 0 0 4px ",
    borderLeft: "1px solid #66696B",
  },
  "&:nth-child(2)": {
    borderRadius: "0 4px 4px 0 ",
    borderRight: "1px solid #66696B",
  },
  "&.Mui-selected": {
    color: `${variables.bgColor} !important`,
    fontWeight: `600 !important`,
    fontSize: `${fontSizes.p4} !important`,
    backgroundColor: `${variables.primaryColor} !important`,
  },
});

export const AsText = styled("p")({
  fontSize: "16px",
  fontWeight: 600,
  color: "#343536",
});
