import * as React from "react";
import { DialogTitle, Dialog, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "../../../components/WorkflowInbox/styles";

const DescriptionDialogCard = (props) => {
  const classes=useStyles();
  return (
      <Dialog
        open={props.open ? props.open : false}
        onClose={props.handleClose}
        fullWidth={props.fullWidth}
        maxWidth={props.maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle variant="h3" color="Blue.main" sx={{fontWeight:700}} className={classes["container-flex"]}  >
          <Box >{props.title}</Box>
            {props.handleClose !== undefined && (
              <Box className={classes["container-flex"]} sx={{gap:2}}>
                {props.button && props.button()}
                <CloseIcon
                  style={{ cursor: "pointer" }}
                  aria-label="close"
                  onClick={props.handleClose}
                />
              </Box>
            )}
        </DialogTitle>
        <Typography variant="body1" color="Grey.main" sx={{mb:1}}>{props.description}</Typography>
        {props.children}
      </Dialog>
  );
};
export default DescriptionDialogCard;
