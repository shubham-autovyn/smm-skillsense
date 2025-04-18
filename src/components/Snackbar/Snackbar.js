import { Alert, Snackbar } from '@mui/material';

const SnackBar = ({
  showSuccessAlert,
  responseCode,
  alertMessage,
  handleClose,
  hideDuration,
}) => {
  return (
    <Snackbar
      open={showSuccessAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={hideDuration || 4000}
      onClose={handleClose}
      onExited={handleClose} // Ensures cleanup after animation
    >
      <Alert
        onClose={handleClose}
        severity={
          String(responseCode) === '200' || responseCode === 'SMM200'
            ? 'success'
            : 'error'
        }
        variant="filled"
        sx={{ width: '100%', fontSize: '14px' }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
