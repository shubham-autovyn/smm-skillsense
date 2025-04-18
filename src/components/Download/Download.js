/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SecondaryButton from "../../utils/Buttons/SecondaryButton/SecondaryButton";
import { MarutiWhite, StatusDone } from "../../utils/colors";
import DialogCard from "../../utils/Dialog/DialogCard";
import Alert from "../../components/Snackbar/Snackbar";
import useStyles from "../../Dashboard/styles";
import { getShop } from "../../redux/Reducers/SMMShopReducer";
import { downloadReport } from "../../Repository/MasterRepository";

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

const Download = (props) => {
  
  const classes = useStyles();
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState("");
  const shop = useSelector(getShop);
  const [downloadInfo, setDownloadInfo] = useState({
    progress: 0,
    completed: false,
    total: 0,
    loaded: 0,
  });

  const handleErrorClose = () => {
    setOpenAlert(false);
  };
  useEffect(() => {
    const options = {
      onDownloadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        setDownloadInfo({
          progress: Math.floor((loaded * 100) / total),
          loaded,
          total,
          completed: false,
        });
      },
    };
    const payload = {
      shop_id: shop?.id,
      file_type: "Master",
      file_path: props.file,
    };
    downloadReport(payload, {
      ...options,
    })
      .then(function (response) {
        const url = response?.data?.response?.url;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file");
        document.body.appendChild(link);
        link.click();
        setDownloadInfo((info) => ({
          ...info,
          completed: true,
        }));
      })
      .catch((ex) => {
        if (ex?.response?.status === 409) {
          let error = ex?.response?.data?.message;
          setError(error);
          setOpenAlert(true);
        }
      });
  }, []);

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
              color="Blue.main"
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
export default Download;
