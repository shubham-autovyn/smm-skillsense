import { Box, DialogContent, Divider, Typography } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../../../../../services/Authorization/AuthorizationService";
import PrimaryButton from "../../../../../../../Utilities/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import TransparentButton from "../../../../../../../Utilities/Buttons/TransparentButton/TransparentButton";
import {
  MarutiBlack,
  TypeSecondary,
} from "../../../../../../utils/colors";
import DialogCard from "../../../../../../../Utilities/Dialog/DialogCard";
import Loader from "../../../../../../../Utilities/Loader/Loader";
import FileIcon from "../../../../../../assets/icons/FileIcon.svg";
import {
  setAlert,
  setAlertStatus,
} from "../../../../../../redux/Actions/AlertActions";
import {
  changeAddMasterApiStatus,
  uploadAreaMasterFile,
} from "../../../../../../redux/Actions/DepartmentMasterAction";
import { getAddMasterApiStatus } from "../../../../../../redux/Reducers/SMMDepartmentMasterReducer";
import {
  getLocation,
  getPlant,
  getShop,
  getSite,
} from "../../../../../../redux/Reducers/SMMShopReducer";
import useStyles from "../../../../../styles";
import RenderDatePicker from "./DateFilter";

const placeholder = "Select a file for upload";
const initialFile = {
  name: placeholder,
  size: "",
  lastModified: "",
  type: "",
  webkitRelativePath: "",
  filename: "",
};

const UploadFile = (props) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(placeholder);
  const [file, setFile] = useState(initialFile);
  const [fromDate, setFromDate] = useState(null);
  const [isDateValid, setIsDateValid] = useState(true);
  const dispatch = useDispatch();

  const site = useSelector(getSite);
  const location = useSelector(getLocation);
  const plant = useSelector(getPlant);
  const shop = useSelector(getShop);
  const uploadApiStatus = useSelector(getAddMasterApiStatus);

  useEffect(() => {
    if (uploadApiStatus === "COMPLETED") {
      //
    }
    if (uploadApiStatus === "FAILED" || uploadApiStatus === "COMPLETED") {
      props.handleClose();
      dispatch(changeAddMasterApiStatus("NOT IN USE"));
    }
  }, [uploadApiStatus]);
  useEffect(() => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    setFromDate(currentDate);
  }, []);

  useEffect(() => {
    let today = new Date();
    today.setHours(6, 20, 0, 0);
    const selectedDate = new Date(fromDate);
    setIsDateValid(selectedDate > today);
  }, [fromDate]);

  const getDateTime = (date) => {
    date.setHours(6);
    date.setMinutes(20);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return parseInt(date / 1000);
  };

  const handleUpload = () => {
    let manager = getUser()?.manager;
    let managerId = getUser()?.managerId;
    if (!manager || !managerId || manager === "" || managerId === "") {
      const params = {
        open: true,
        message: "Reviewer details are missing. Please contact support team.",
        type: "ALERT",
      };
      dispatch(setAlert(params.message));
      dispatch(setAlertStatus(true));
      props.handleClose();
    } else {
      if (shop && plant && location && site) {
        var cred = getUser()?.username.split("\\");
        var receiver = managerId.split("\\");
        if (cred && receiver) {
          let userId;
          let userName;
          if (cred.length === 1) {
            userId = cred[0];
            userName = cred[0];
          } else {
            userId = cred[0] + "%5C" + cred[1];
            userName = cred[1];
          }
          var payload = {
            shop_id: shop?.id,
            shop_name: shop?.shop_name,
            plant_name: plant?.plant_name,
            location_name: location?.location_name,
            site_name: site?.site_name,
            module_name: "SMM",
            uploader_id: userId,
            uploader_name: userName,
            uploader_email: getUser().email,
            file: file,
            effective_date: getDateTime(fromDate),
            manager_id: receiver[0],
            manager_email: getUser()?.manager,
          };
          dispatch(uploadAreaMasterFile(payload));
        }
      }
    }
  };

  const handleFileChange = (event) => {
    var file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  return (
    <Fragment>
      <DialogCard
        open={props.open}
        handleClose={props.handleClose}
        title="Upload Area Master File"
        color={MarutiBlack}
      >
        <DialogContent>
          <Box>
            <Typography variant="h5" mb={0.8} sx={{ color: TypeSecondary }}>
              Select Area Master File:
            </Typography>
          </Box>
          <Box
            className={classes["container-flex"]}
            sx={{ gap: "0.8rem", width: "auto", pb: "1.6rem" }}
          >
            <label
              htmlFor="pqc_file_upload"
              className="sl-file-container "
              style={{
                backgroundColor: "fff",
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "0.5rem",
              }}
            >
              <Typography variant="body1" noWrap sx={{ width: "270px" }}>
                {fileName}
              </Typography>
              <img src={FileIcon} height="16rem" width="16rem" />
            </label>

            <input
              accept=".xlsx"
              className="bulk-file-upload"
              type="file"
              id="pqc_file_upload"
              name="file"
              onChange={handleFileChange}
              ref={inputRef}
            />
          </Box>
          <Box sx={{ mb: "1.6rem" }}>
            <Typography variant="h5" mb={0.6} sx={{ color: TypeSecondary }}>
              Effective From Date:
            </Typography>
            <RenderDatePicker
              fromDate={fromDate}
              updateFromDate={setFromDate}
            />
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: "1.5rem",
              paddingLeft: "240px",
              marginTop: "1.6rem",
            }}
          >
            <SecondaryButton onClick={props.handleClose}>
              Cancel
            </SecondaryButton>
            {uploadApiStatus === "INPROGRESS" ? (
              <TransparentButton disabled={fileName === placeholder}>
                <Loader type="small" color="neutral" />
              </TransparentButton>
            ) : (
              <PrimaryButton
                disabled={fileName === placeholder || !isDateValid}
                onClick={handleUpload}
              >
                Upload
              </PrimaryButton>
            )}
          </Box>
        </DialogContent>
      </DialogCard>
    </Fragment>
  );
};
export default UploadFile;
