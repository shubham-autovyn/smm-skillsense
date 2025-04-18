import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Fragment } from "react";

const CustomSnackbar = ({
  open=false,
  handleClose,
  duration = 1000,
  sx = {
    background: "#FBECC8",
    fontSize: "1.4rem",
    color: "#343536",
    width:"100%",
  },
  message = "Test Message",
}) => {
  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
       onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      ContentProps={{
        sx: sx,
      }}
      open={open}
      autoHideDuration={3000}
       onClose={handleClose}
      message={message}
      action={action}
    />
  );
};
export default CustomSnackbar;
