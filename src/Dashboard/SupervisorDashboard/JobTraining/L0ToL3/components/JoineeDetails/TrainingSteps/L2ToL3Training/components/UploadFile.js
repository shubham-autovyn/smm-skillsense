import React from "react";
import { useRef, useState } from "react";
import FileIcon from "../../../../../../../../../assets/icons/FileIcon.svg";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import {
  Grey30,
  TypeSecondary,
} from "../../../../../../../../../../Utilities/colors";
import useStyles from "../../../../../../../../styles";
import PrimaryButton from "../../../../../../../../../../Utilities/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import Cross from "../../../../../../../../../assets/icons/Cross.svg";
import { uploadJpegPdfFile } from "../../../../../../../../../Repository/JobTrainingRepository";
import {
  getUploadJpegPdfFileData,
  getUploadJpegPdfFileStatus,
} from "../../../../../../../../../redux/Reducers/SMMJobTrainingReducer";
import {
  getShop,
  getArea,
  getGroup,
  getLine,
} from "../../../../../../../../../redux/Reducers/SMMShopReducer";
import { useDispatch, useSelector } from "react-redux";
const placeholder = "Select a file for upload";
const initialFile = {
  name: placeholder,
  size: "",
  lastModified: "",
  type: "",
  webkitRelativePath: "",
  filename: "",
};
const UploadFile = ({ open, handleClose, handleSubmit }) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(placeholder);
  const [file, setFile] = useState(initialFile);
  const line = useSelector(getLine);
  const area = useSelector(getArea);
  const group = useSelector(getGroup);
  const [isUploading, setIsUploading] = useState(false);
  const shop = useSelector(getShop);
  const uploadApiStatus = useSelector(getUploadJpegPdfFileStatus);
  const uploadApiData = useSelector(getUploadJpegPdfFileData);
  const handleFileChange = (event) => {
    var file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };
  const handleUpload = () => {
    if (shop && group && line && area) {
      var payload = {
        shop_id: shop?.id,
        group: group,
        line: line,
        area: area,
        level_type: "L3",
        file: file,
        content_type: file?.name?.includes(".pdf")
          ? "application/pdf"
          : "image/jpeg",
      };
      setIsUploading(true);
      uploadJpegPdfFile(payload)
        .then(function (response) {
          let res = response.data?.response;
          setIsUploading(false);
          handleSubmit(res);
          //   handleClose();
        })
        .catch((ex) => {
          if (ex?.response?.status === 409) {
            let error = ex?.response?.data?.message;
            setIsUploading(false);
            // setError(error);
            // setOpenAlert(true);
          }
        });
      //dispatch(uploadMaruPDFJpegFile(payload));
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", textTransform: "none", gap: "0.5rem" }}>
              <Typography variant="h4">
                Upload New Operator Training Method Sheet{" "}
              </Typography>
              <Typography variant="h4" sx={{ color: Grey30 }}>
                (optional)
              </Typography>
            </Box>
            <img
              src={Cross}
              alt="cross"
              style={{ cursor: "pointer" }}
              aria-label="close"
              onClick={handleClose}
            />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="h4" mb={0.6} sx={{ color: TypeSecondary }}>
            Select Attendees
          </Typography>
        </Box>
        <Box
          className={classes["container-flex"]}
          sx={{
            gap: "0.8rem",
            width: "auto",
            pb: "1.6rem",
            flexDirection: "column",
          }}
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
            accept=".pdf,.jpeg,.jpg"
            className="bulk-file-upload"
            type="file"
            id="pqc_file_upload"
            name="file"
            onChange={handleFileChange}
            ref={inputRef}
          />
          <Box sx={{width:"100%"}}>
            <Typography variant="body1" color={"#66696B"}>
              Please upload only .JPEG or .PDF file.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: "1.5rem",
          paddingLeft: "45px",
          marginTop: "1.6rem",
        }}
      >
        <SecondaryButton
          onClick={() => handleSubmit({})}
          disabled={isUploading}
        >
          Skip Upload & Submit Evaluation
        </SecondaryButton>
        <PrimaryButton
          onClick={handleUpload}
          disabled={fileName === "Select a file for upload" || isUploading}
        >
          Upload & Submit Evaluation
        </PrimaryButton>
      </Box>
    </Dialog>
  );
};
export default UploadFile;
