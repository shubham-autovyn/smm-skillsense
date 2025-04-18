import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import PrimaryButton from "../../../../../../../../../utils/Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../../../../../utils/Buttons/SecondaryButton/SecondaryButton";
import {
  Grey30,
  TypeSecondary,
} from "../../../../../../../../../utils/colors";
import Cross from "../../../../../../../../../assets/icons/Cross.svg";
import FileIcon from "../../../../../../../../../assets/icons/FileIcon.svg";
import { getShop } from "../../../../../../../../../redux/Reducers/SMMShopReducer";
import useStyles from "../../../../../../../../styles";
import useLevelFormUpload from "../../../../../../../hooks/levelFormUpload";

const placeholder = "Select a file for upload";

const UploadFiles = ({
  open,
  handleClose,
  handleSubmit,
  setFilePath,
  setFileName,
  handleBack,
}) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const [inputFileName, setInputFileName] = useState(
    "Select a file for upload"
  );
  const [file, setFile] = useState(null);
  const shop = useSelector(getShop);

  const { fetchLevelFromUpload } = useLevelFormUpload();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // setLoading(true);

      let payload = {
        shopId: shop?.id,
        group: "A",
        line: 1,
        area: "FINAL",
        levelType: "L3",
        file: file,
      };

      try {
        const fileUpload = await fetchLevelFromUpload(payload);
        if (
          fileUpload?.data?.responseCode === 200 ||
          fileUpload?.data?.responseCode === "SMM200"
        ) {
          setInputFileName(file.name);
          setFilePath(fileUpload?.data?.response?.filePath);
          setFileName(fileUpload?.data?.response?.fileName);
        } else {
          setInputFileName("Select a file for upload");
        }
      } catch (error) {
        console.error("Upload failed", error);
      } finally {
        // setLoading(false);
      }
    }
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setFileName(file.name);
  //     setFile(file);
  //   }
  // };

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
                Upload New Operator Training Method Sheet
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
            Select File
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
            className="sl-file-container"
            style={{
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "0.5rem",
            }}
          >
            <Typography variant="body1" noWrap sx={{ width: "270px" }}>
              {inputFileName}
            </Typography>
            <img src={FileIcon} height="16rem" width="16rem" alt="file icon" />
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
          <Box sx={{ width: "100%" }}>
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
        <SecondaryButton onClick={() => handleSubmit({})}>
          Skip To Approval
        </SecondaryButton>
        <PrimaryButton
          onClick={() => handleSubmit({ inputFileName })}
          disabled={inputFileName === placeholder}
        >
          Upload
        </PrimaryButton>
      </Box>
    </Dialog>
  );
};

export default UploadFiles;
