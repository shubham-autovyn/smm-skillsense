/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import PrimaryButton from "../../src/utils/Buttons/PrimaryButton/PrimaryButton";
import TransparentButton from "../../src/utils/Buttons/TransparentButton/TransparentButton";
import {
  Grey20,
  StatusAlertSevere,
  TypeSecondary,
} from "../../src/utils/colors";

const CustomText = (infoText, highlightedText) => {
  const text = infoText?.split(" ");
  return (
    <Typography
      variant="body1"
      component={"span"}
      sx={{ color: TypeSecondary }}
    >
      {text.map((text) => {
        if (text === "Warning:") {
          return (
            <Typography component={"span"} sx={{ fontWeight: "700" }}>
              {"Warning:"}
            </Typography>
          );
        } else if (highlightedText?.includes(text)) {
          return (
            <Typography
              variant="body1"
              component={"span"}
              sx={{ color: StatusAlertSevere, fontWeight: "600" }}
            >{`${text} `}</Typography>
          );
        } else if (text === "@") {
          return <div>{"\n"}</div>;
        }
        return `${text} `;
      })}
    </Typography>
  );
};

const ConfirmationDialog = ({
  openConfirm,
  handleClose,
  handleChoice,
  headerText,
  infoText = "",
  confirmButtonText,
  cancelLabel = "Cancel",
  highlightedText = "",
  description = CustomText(infoText, highlightedText),
}) => {
  return (
    <Fragment>
      <Dialog
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
          {/* <CustomText /> */}
          {description}
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
            <PrimaryButton type="button" onClick={handleChoice}>
              {confirmButtonText}
            </PrimaryButton>
          </Box>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default ConfirmationDialog;
