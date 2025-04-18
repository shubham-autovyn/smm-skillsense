import { Fragment, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import SecondaryButton from "../../utils/Buttons/SecondaryButton/SecondaryButton";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { StatusDone, MarutiWhite, TypePrimary } from "../../utils/colors";
import { Box, Typography } from "@mui/material";
import useStyles from "../../Dashboard/styles";
import DialogCard from "../../utils/Dialog/DialogCard";
import Alert from "../../components/Snackbar/Snackbar";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 9,
  borderRadius: 5,

  //Empty Background Color
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: MarutiWhite,
  },
  //Filled Background Color
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: [5, 5],
    backgroundColor: StatusDone,
  },
}));

const CommonDownload = (props) => {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState("");
  const [downloadInfo, setDownloadInfo] = useState({
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0,
  });
  useEffect(()=>{
    setDownloadInfo({
      progress: 100,
      completed: true,
      total: 0,
      loaded: 0,
    })
  },[])
  const handleErrorClose = () => {
    setOpenAlert(false);
  };

  const handleSubmit = () => {
    props.handleClose();
  };

  return (
    <Fragment>
      <DialogCard
        open={props.open}
        handleClose={props.handleClose}
        maxWidth={"sm"}
        fullWidth={true}
        title={"Downloading In Progress"}
      >
        <Box className={classes["download-modal-container"]}>
          <Box className={classes["download-modal-progress"]}>
            <Typography
              variant="h5"
              color={TypePrimary}
              sx={{ fontWeight: "bold" }}
            >
              {downloadInfo.progress + "%"}
            </Typography>
            <Box sx={{ flex: 1 }}>
              <BorderLinearProgress
                variant="determinate"
                value={downloadInfo.progress}
              />
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <SecondaryButton
              disabled={parseInt(downloadInfo.progress) !== parseInt(100)}
              type="button"
              onClick={handleSubmit}
            >
              Ok
            </SecondaryButton>
          </Box>
        </Box>
      </DialogCard>
      <Alert
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openAlert}
        onClose={handleErrorClose}
        message={error}
      />
    </Fragment>
  );
};
export default CommonDownload;
