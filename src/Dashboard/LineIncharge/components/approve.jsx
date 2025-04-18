import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import TransparentButton from "../../../utils/Buttons/TransparentButton/TransparentButton";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const Approve = ({
  open,
  PaperProps,
  setApprove,
  sentForApproval,
  actionType,
}) => {
  const isApproval = actionType === "approve";

  const handleApprove = () => {
    sentForApproval();
    setApprove(false);
  };
  const handleBack = () => {
    setApprove(false);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleBack}
        PaperProps={{
          sx: { width: "400px", maxWidth: "90%" },
          ...PaperProps,
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "10px" }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            {isApproval ? "Approve" : "Reject"}
          </Typography>
          <CloseIcon
            style={{ cursor: "pointer" }}
            aria-label="close"
            onClick={handleBack}
          />
        </Box>
        <DialogContent>
          <Box>
            <Typography sx={{ fontSize: "15px", marginTop: "10px" }}>
              Are you sure you want to {isApproval ? "approve" : "reject"} this
              request?
            </Typography>
            <Typography
              sx={{ fontSize: "15px", marginTop: "15px", fontWeight: "600" }}
            >
              Remark
            </Typography>

            <Box
              sx={{
                mt: "15px",
                border: "1px solid #b2b2b2",
                borderRadius: "8px",
              }}
            >
              <input
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  outline: "none",
                  marginTop: "0",
                  borderRadius: "8px",
                }}
                type="text"
                placeholder={
                  isApproval
                    ? "Enter Approval Remark"
                    : "Enter Rejection Remark"
                }
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ alignSelf: "flex-end", mt: "10px" }}>
          <Box>
            <TransparentButton type="button" onClick={handleBack}>
              Cancel
            </TransparentButton>
          </Box>
          <Box>
            <PrimaryButton
              type="button"
              onClick={() => {
                handleApprove();
              }}
            >
              {isApproval ? "Approve" : "Reject"}{" "}
            </PrimaryButton>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Approve;
