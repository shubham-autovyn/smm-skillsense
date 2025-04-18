import { Box, DialogContent, Typography } from "@mui/material";
import { Fragment, useRef } from "react";
import AddIcon from "../../../../assets/icons/add.svg";
import PrimaryButton from "../../../../utils/Buttons/PrimaryButton/PrimaryButton";
import DialogCard from "../../../../utils/Dialog/DialogCard";
import useStyles from "../../../styles";

const TestMasterUploadFile = ({
  open,
  handleClose,
  handleFileChange,
  handleUpload,
  fileName,
  setFileName,
}) => {
  const classes = useStyles();
  const inputRef = useRef(null);

  const onDialogClose = () => {
    handleClose();
    setFileName("Select a file for upload");
  };

  return (
    <Fragment>
      <DialogCard
        open={open}
        handleClose={onDialogClose}
        maxWidth={"sm"}
        fullWidth={false}
        title="Upload L3 to L4 Test Master File"
      >
        <DialogContent>
          <Box
            className={classes["container-flex"]}
            sx={{ gap: "0.8rem", width: "400px", pb: "1rem" }}
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
                {fileName}
              </Typography>
              <img src={AddIcon} height="16rem" width="16rem" />
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
              <PrimaryButton
                disabled={fileName === "Select a file for upload"}
                onClick={handleUpload}
              >
                Upload
              </PrimaryButton>
            </Box>
          </Box>
        </DialogContent>
      </DialogCard>
    </Fragment>
  );
};

export default TestMasterUploadFile;
