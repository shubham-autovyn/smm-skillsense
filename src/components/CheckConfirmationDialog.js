/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import PrimaryButton from "../utils/Buttons/PrimaryButton/PrimaryButton";
import TransparentButton from "../utils/Buttons/TransparentButton/TransparentButton";
import { Grey20 } from "../utils/colors";
import CheckEmpty from "../assets/icons/CheckEmpty.svg";
import CheckFill from "../assets/icons/CheckFill.svg";

const CheckConfirmationDialog = ({
  openConfirm,
  handleClose,
  handleChoice,
  headerText,
  infoText,
  confirmButtonText,
  cancelLabel = "Cancel",
}) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <Fragment>
      <Dialog
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "10px" }}
        >
          <Typography variant="h4">{headerText}</Typography>
          <CloseIcon
            style={{ cursor: "pointer" }}
            aria-label="close"
            onClick={handleClose}
          />
        </Box>
        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <Checkbox
              sx={{
                padding: "0 1rem 0 0 !important",
                alignItems: "flex-start",
              }}
              checked={isChecked}
              onChange={(event) => {
                setChecked(event?.target?.checked);
              }}
              icon={
                <img
                  alt="unchecked"
                  src={CheckEmpty}
                  style={{
                    cursor: "pointer",
                    height: "2rem",
                    width: "2rem",
                  }}
                />
              }
              checkedIcon={
                <img
                  alt="checked"
                  src={CheckFill}
                  style={{
                    cursor: "pointer",
                    height: "2rem",
                    width: "2rem",
                  }}
                />
              }
            />
            <Typography variant="body1" component={"span"}>
              {infoText}
            </Typography>
          </Box>
        </DialogContent>
        <Box
          sx={{
            border: "1px solid transparent",
            borderBottomColor: Grey20,
            borderBottomWidth: 1,
            mt: "10px",
            mb: "6px",
          }}
        />
        <DialogActions sx={{ alignSelf: "flex-end" }}>
          <Box>
            <TransparentButton onClick={handleClose}>
              {cancelLabel}
            </TransparentButton>
          </Box>
          <Box>
            <PrimaryButton
              type="button"
              onClick={handleChoice}
              disabled={!isChecked}
            >
              {confirmButtonText}
            </PrimaryButton>
          </Box>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default CheckConfirmationDialog;
