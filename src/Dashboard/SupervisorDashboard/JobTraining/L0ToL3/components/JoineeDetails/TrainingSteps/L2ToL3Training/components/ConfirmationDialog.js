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
import PrimaryButton from "../../../../../../../../../components/PrimaryButton/PrimaryButton";
import TransparentButton from "../../../../../../../../../../Utilities/Buttons/TransparentButton/TransparentButton";
import {
  Grey20,
  StatusAlertSevere,
  TypePrimary,
  TypeSecondary,
} from "../../../../../../../../../../Utilities/colors";
import MaruAAR from "../../../../../../../../../assets/icons/MaruAAR.svg";
import NonMaru from "../../../../../../../../../assets/icons/NonMaru.svg";
import MaruAR from "../../../../../../../../../assets/icons/MaruAR.svg";
import MaruA from "../../../../../../../../../assets/icons/MaruA.svg";
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
const getMaruIcon = (maruType) => {
  switch (maruType) {
    case "A":
      return <img src={MaruA} alt="Maru A" width={18} height={16} />;
    case "A/AR":
      return <img src={MaruAAR} alt="Maru A/AR" width={18} height={16} />;
    case "AR":
      return <img src={MaruAR} alt="Maru AR" width={18} height={16} />;
    default:
      return <img src={NonMaru} alt="Non Maru" width={18} height={16} />;
  }
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
  selectedStaffRow,
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <Box>{description}</Box>
            <Box sx={{ display: "flex", gap: "5rem" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <Typography variant="subtitle2" color={TypeSecondary}>
                  Operator
                </Typography>
                <Typography variant="subtitle2" color={TypeSecondary}>
                  Station
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <Typography
                  variant="body1"
                  color={TypePrimary}
                >{`${selectedStaffRow?.staffName}(${selectedStaffRow?.staffID})`}</Typography>
                <Box sx={{ display: "flex",alignItems:"center",gap:"1rem"}}>
                  {getMaruIcon(selectedStaffRow?.maru)}
                  <Typography
                    variant="body1"
                    color={TypePrimary}
                  >{`${selectedStaffRow?.stationName}|${selectedStaffRow?.description}`}</Typography>
                </Box>
              </Box>
            </Box>
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
