import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import FileIcon from "../../.../../../../../../../../../../assets/icons/downloadIcon.svg";
import TransparentButton from "../../../../../../../../../../utils/Buttons/TransparentButton/TransparentButton";
import PrimaryButton from "../../../../../../../../../../components/PrimaryButton/PrimaryButton";
import useStyles from "../../../../../../../../../styles";

const SendForApproval = ({
  open,
  handleClose,
  fileName,
  filePath,
  handleBack,
}) => {
  const classes = useStyles();

  // const navigate = useNavigate();
  // const handleBack = () => {
  //   navigate(-1); // Navigates back to the previous page
  // };
  console.log("Downloading file from:", filePath);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "10px" }}
        >
          <Typography variant="h4">Send For Approval</Typography>
          <CloseIcon
            style={{ cursor: "pointer" }}
            aria-label="close"
            onClick={handleClose}
          />
        </Box>
        <DialogContent>
          <Box>
            <Typography variant="h4">
              New Operator Training Method Sheet
            </Typography>
            <Box
              className={classes["container-flex"]}
              sx={{
                gap: "0.8rem",
                width: "auto",
                pb: "1.6rem",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <label
                htmlFor="pqc_file_upload"
                className="sl-file-container"
                style={{
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingRight: "0.5rem",
                }}
              >
                <Typography variant="body1" noWrap sx={{ width: "270px" }}>
                  {fileName ? fileName : "NA"}
                </Typography>
                {filePath ? (
                  <a>
                    <img
                      src={FileIcon}
                      height="16rem"
                      width="16rem"
                      alt="file icon"
                      style={{ cursor: "pointer" }}
                    />
                  </a>
                ) : (
                  <img
                    src={FileIcon}
                    height="16rem"
                    width="16rem"
                    alt="file icon"
                    style={{ opacity: 0.5 }}
                  />
                )}
              </label>
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              <Typography variant="h4">Confirm Approval</Typography>
              <Typography
                sx={{ marginTop: "10px" }}
                variant="body1"
                color={"#66696B"}
              >
                Request for skill upgrade will be sent to the Line incharge, On
                approval, the skill level will be automatically updated to L3 in
                the skill matrix. Are you sure you want to proceed with
                approval?
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ alignSelf: "flex-end" }}>
          <Box>
            <TransparentButton type="button" onClick={handleBack}>
              Back
            </TransparentButton>
          </Box>
          <Box>
            <PrimaryButton
              type="button"
              onClick={() => {
                handleClose();
              }}
            >
              Send for Approval
            </PrimaryButton>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default SendForApproval;
