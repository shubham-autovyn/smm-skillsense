import { Box, DialogContent, Typography } from "@mui/material";
import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "../../../../../../../../../../assets/icons/add.svg";
import PrimaryButton from "../../../../../../../../../Utilities/Buttons/PrimaryButton/PrimaryButton";
import TransparentButton from "../../../../../../../../../Utilities/Buttons/TransparentButton/TransparentButton";
import DialogCard from "../../../../../../../../../Utilities/Dialog/DialogCard";
import Loader from "../../../../../../../../../Utilities/Loader/Loader";
import {
  getUploadJpegPdfFileData,
  getUploadJpegPdfFileStatus,
} from "../../../../../../../../redux/Reducers/SMMJobTrainingReducer";
import {
  getArea,
  getGroup,
  getLine,
  getShop,
} from "../../../../../../../../redux/Reducers/SMMShopReducer";
import useStyles from "../../../../../../../styles";
import useLevelFormUpload from "../../../../../../hooks/levelFormUpload";

const placeholder = "Select a file for upload";
const initialFile = {
  name: placeholder,
  size: "",
  lastModified: "",
  type: "",
  webkitRelativePath: "",
  filename: "",
};

const UploadFile = ({ open, handleClose, handleUploadPath }) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(placeholder);
  const [file, setFile] = useState(initialFile);
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const line = useSelector(getLine);
  const area = useSelector(getArea);
  const group = useSelector(getGroup);
  const shop = useSelector(getShop);
  const uploadApiStatus = useSelector(getUploadJpegPdfFileStatus);
  const uploadApiData = useSelector(getUploadJpegPdfFileData);

  const {
    dataLevelFormUpload: dataLevelFormUpload,
    fetchLevelFromUpload: fetchLevelFromUpload,
  } = useLevelFormUpload();

  const handleUpload = () => {
    console.log(file);

    if (shop && group && line && area) {
      var payload = {
        shop_id: shop?.id,
        group: "A",
        line: 1,
        area: "FINAL",
        level_type: "L2",
        file: file,
        content_type: file?.name?.includes(".pdf")
          ? "application/pdf"
          : "image/jpeg",
      };
      setIsUploading(true);
      fetchLevelFromUpload(payload)
        .then(function (response) {
          let res = response.data?.response;
          handleUploadPath(res);
          setFileName(res.fileName);
          setIsUploading(false);
          handleClose();
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
        open={open}
        handleClose={handleClose}
        maxWidth={"md"}
        fullWidth={false}
        title="Upload File"
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
              <img src={AddIcon} height="16rem" width="16rem" />
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
            <Box sx={{ width: "fit-content" }}>
              {uploadApiStatus === "INPROGRESS" ? (
                <TransparentButton disabled={fileName === placeholder}>
                  <Loader type="small" color="neutral" />
                </TransparentButton>
              ) : (
                <PrimaryButton
                  disabled={fileName === placeholder || isUploading}
                  onClick={handleUpload}
                >
                  Upload
                </PrimaryButton>
              )}
            </Box>
          </Box>
          <Box sx={{ ml: 1 }}>
            <Typography variant="body1">
              Please upload only .pdf and .jpeg files.
            </Typography>
          </Box>
        </DialogContent>
      </DialogCard>
    </Fragment>
  );
};
export default UploadFile;
