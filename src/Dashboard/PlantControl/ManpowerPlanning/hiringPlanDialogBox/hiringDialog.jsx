import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  BootstrapDialog,
  HiringTabBox,
  HiringTabs,
  HiringTabSection,
} from "./hiringDialog.styles";
import NewHiringPlan from "./NewHiringPlan/newHiring";
import PreviousExports from "./previousExports/previousExports";

const HiringDialog = ({ open, onClose }) => {
  const [value, setValue] = useState("1");

  const TabPanel = ({ value, index, children }) => {
    return value === index ? <Box>{children}</Box> : null;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0, padding: "0px 0px 15px 6px" }}
        id="customized-dialog-title"
      >
        <Typography
          variant="h3"
          style={{
            margin: "0px",
            color: "inherit",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Export Hiring Plan
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 12,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          // overflowY: "hidden !important",
          overflowY: "auto", // Enables vertical scrolling
          maxWidth: "100vw", // Ensures it doesn’t exceed viewport width
          maxHeight: "98vh",
          whiteSpace: "nowrap",
        }}
      >
        <HiringTabBox>
          <HiringTabs value={value} onChange={handleChange}>
            <HiringTabSection label="New Hiring Plan" value="1" />
            <HiringTabSection label="Previous Exports" value="2" />
          </HiringTabs>
        </HiringTabBox>
        <TabPanel value={value} index="1">
          <NewHiringPlan onClose={onClose} />
        </TabPanel>
        <TabPanel value={value} index="2">
          <PreviousExports />
        </TabPanel>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default HiringDialog;
