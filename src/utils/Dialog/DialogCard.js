import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@mui/material/styles/styled";
import * as React from "react";
import { MarutiBlue500, TypeSecondary } from "../colors";
import "./DialogCard.css";

const CustomDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    padding: "1.2rem !important",
    borderRadius: "0.8rem",
  },
  "& .MuiDialogTitle-root": {
    marginBottom: "1.2rem",
  },
  "& .MuiTabPanel-root": {
    padding: "1rem 0 0 0 !important",
  },
  "& .MuiDialogContent-root": {
    padding: "0 !important",
  },
  "& .MuiTabs-root": {
    minHeight: "fit-content !important",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: `${MarutiBlue500} !important`,
  },
  "& .MuiDialogActions-root": {
    justifyContent: "space-between",
  },
}));
const DialogCard = (props) => {
  return (
    <CustomDialog
      open={props.open ? props.open : false}
      fullWidth={props.fullWidth}
      maxWidth={props.maxWidth}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ ...props.sx }}
    >
      <DialogTitle
        id="alert-dialog-title"
        className="pqc-dialog-title-container"
      >
        <div
          className="pqc-dialog-title"
          style={{ color: props.color ? props.color : TypeSecondary }}
        >
          {props.title}
        </div>
        <div className="pqc-dialog-close">
          {props.handleClose !== undefined && (
            <CloseIcon
              style={{ cursor: "pointer" }}
              aria-label="close"
              onClick={props.handleClose}
            />
          )}
        </div>
      </DialogTitle>
      {props.children}
    </CustomDialog>
  );
};
export default DialogCard;
