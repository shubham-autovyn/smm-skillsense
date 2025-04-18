import { Box, Dialog } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "styled-components";
import { variables } from "../../../../styles/theme";

export const BootstrapDialog = styled(Dialog)(({}) => ({
  "& .MuiPaper-root": {
    width: "80%",
    maxWidth: "100%",
  },
}));
export const HiringTabBox = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  textTransform: "none",
  paddingBottom: "10px",
});

export const HiringTabs = styled(Tabs)({
  width: "100%",
  marginTop: 0,
  "& .MuiTabs-indicator": {
    backgroundColor: variables.primaryColor,
  },
});
export const HiringTabSection = styled(Tab)({
  minWidth: 50,
  fontWeight: 400,
  padding: "2px 12px",
  letterSpacing: 0,
  margin: "0 8px",
  "&.Mui-selected": {
    fontWeight: 600,
    fontSize: "12px !important",
    color: `${variables.primaryColor} !important`,
  },
  "&.MuiButtonBase-root": {
    color: variables.textColor,
    textTransform: "none",
    fontWeight: 600,
    fontSize: "12px !important",
  },
});
