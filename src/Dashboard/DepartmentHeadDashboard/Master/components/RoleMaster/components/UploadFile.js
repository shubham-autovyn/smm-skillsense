import { Box, DialogContent, Typography } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileIcon from "../../../../../../assets/icons/FileIcon.svg";
import { getUser } from "../../../../../../../../services/Authorization/AuthorizationService";
import DialogCard from "../../../../../../utils/Dialog/DialogCard";
import {
  getLocation,
  getPlant,
  getShop,
  getSite,
} from "../../../../../../redux/Reducers/SMMShopReducer";
import PrimaryButton from "../../../../../../utils/Buttons/PrimaryButton/PrimaryButton";
import useStyles from "../../../../../styles";
import { getAddMasterApiStatus } from "../../../../../../redux/Reducers/SMMDepartmentMasterReducer";
import { changeAddMasterApiStatus, uploadRoleMasterFile } from "../../../../../../redux/Actions/DepartmentMasterAction";
import { setAlert, setAlertStatus } from "../../../../../../redux/Actions/AlertActions";
import Loader from "../../../../../../components/Loader/Loader";
import TransparentButton from "../../../../../../components/TransparentButton/TransparentButton";
import { MarutiBlack } from "../../../../../../utils/colors";

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
          };
          dispatch(uploadRoleMasterFile(payload));
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
        maxWidth={"md"}
        fullWidth={false}
        color = {MarutiBlack}
        title="Upload Role Master File"
      >
        <DialogContent>
          <Box
            className={classes["container-flex"]}
            sx={{ gap: "0.8rem", width: "400px", pb: "1rem" }}
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
            <Box sx={{ width: "fit-content" }}>
              {uploadApiStatus === "INPROGRESS" ? (
                <TransparentButton disabled={fileName === placeholder}>
                  <Loader type="small" color="neutral" />
                </TransparentButton>
              ) : (
                <PrimaryButton
                  disabled={fileName === placeholder}
                  onClick={handleUpload}
                >
                  Upload
                </PrimaryButton>
              )}
            </Box>
          </Box>
        </DialogContent>
      </DialogCard>
    </Fragment>
  );
};
export default UploadFile;
