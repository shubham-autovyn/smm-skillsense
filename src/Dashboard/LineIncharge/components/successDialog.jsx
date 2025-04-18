import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, DialogContent } from "@mui/material";
import { Check } from "./successDialog.style";

const SuccessDialog = ({ open, PaperProps, setOpen }) => {
  const handleBack = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleBack}
        PaperProps={{
          sx: { width: "300px", maxWidth: "90%" },
          ...PaperProps,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "10px" }}>
          <CloseIcon
            aria-label="close"
            sx={{ fontSize: "20px", cursor: "pointer" }}
            onClick={handleBack}
          />
        </Box>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Check>
              <CheckIcon sx={{ color: "white", fontSize: "40px" }} />
            </Check>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: "15px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            SUBMITTED SUCCESSFULLY!
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SuccessDialog;
