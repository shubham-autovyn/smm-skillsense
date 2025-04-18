import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MarutiBlue500 } from "../../utils/colors";
import FileIcon from "../../assets/icons/FileIcon.svg";
import AddIcon from "../../assets/svg/fi-rr-file-add.svg";
import useLevelFormUpload from "../../Dashboard/SupervisorDashboard/hooks/levelFormUpload";
import { getShop } from "../../redux/Reducers/SMMShopReducer";
const File = () => (
  <img style={{ height: "2rem", width: "2rem" }} src={FileIcon} />
);

const JobTrainingTest = ({
  questionNumber,
  questionText,
  options,
  station,
  handleSelect = () => {},
  setFilePath,
  setLoading,
  setFileName,
  level,
}) => {
  const [userInput, setUserInput] = useState("");
  const [radioInput, setRadioInput] = useState(undefined);
  const inputRef = useRef(null);
  const [inputFileName, setInputFileName] = useState(
    "Select a file for upload"
  );
  const shop = useSelector(getShop);

  const { fetchLevelFromUpload } = useLevelFormUpload();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setLoading(true);

      let payload = {
        shopId: shop?.id,
        group: "A",
        line: 1,
        area: "FINAL",
        levelType: "L2",
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
        setLoading(false);
      }
    }
  };

  const handleRadioSelect = (evt, val) => {
    handleSelect({
      questionNumber: questionNumber,
      radioInput: val,
      question: questionText,
      observation: userInput?.trim(),
    });
    setRadioInput(val);
  };
  const handleTextChange = (evt) => {
    handleSelect({
      questionNumber: questionNumber,
      observation: evt.target.value?.trim(),
      question: questionText,
      radioInput: radioInput,
    });
    setUserInput(evt.target.value);
  };

  const getBackgroundColor = () => {
    return station !== undefined ? "#F4F5F8" : "white";
  };

  return (
    <Box
      sx={{
        padding: "1.6rem",
        borderBottom: "1px solid #E6E9F0",
        bgcolor: getBackgroundColor(),
        height: "100%",
      }}
    >
      {station !== undefined &&
        (questionNumber === "Q4." || questionNumber === "A.") && (
          <Box sx={{ marginBottom: "1.2rem" }}>
            <Typography variant="h4">
              {/* For {station} operation evaluation only */}
              For Maru-A operation evaluation only
            </Typography>
          </Box>
        )}
      <Box sx={{ gap: "0.8rem", display: "flex", marginBottom: "1rem" }}>
        <Box>
          <Typography variant="h7">{questionNumber}</Typography>
        </Box>
        <Box>
          <Typography variant="h7">{questionText}</Typography>
        </Box>
      </Box>
      <Box sx={{ paddingLeft: "2.8rem", marginBottom: "1rem" }}>
        <FormControl>
          <RadioGroup
            onChange={handleRadioSelect}
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{
              "& .MuiTypography-root": {
                fontSize: "12px !important",
                lineHeight: "17px",
                color: "#343536 !important",
              },
            }}
            row
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={
                  <Radio
                    size="medium"
                    disableRipple={true}
                    sx={{
                      color: "#CFD2D9",
                      "&.Mui-checked": {
                        color: MarutiBlue500,
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "16px",
                      },
                    }}
                  />
                }
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      {level === "L2" && (
        <Box>
          {station !== undefined && (
            <Box sx={{ paddingLeft: "2.8rem", marginBottom: "1rem" }}>
              <Typography variant="h8">
                Attach WIS/MOS form filled by operator
              </Typography>
            </Box>
          )}
          {station !== undefined && (
            <Box sx={{ paddingLeft: "2.8rem", marginBottom: "1.2rem" }}>
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
                  {inputFileName}
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
            </Box>
          )}
        </Box>
      )}
      <Box sx={{ paddingLeft: "2.8rem", marginBottom: "1rem" }}>
        <Typography variant="h8">Observation Remarks</Typography>
      </Box>

      <Box
        sx={{
          paddingLeft: "2.8rem",
          paddingRight: "2.8rem",
          marginBottom: "1rem",
        }}
      >
        <TextField
          value={userInput}
          multiline
          fullWidth
          focused={false}
          onChange={handleTextChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px !important",
              background: "white",
            },
            "& .MuiOutlinedInput-input": {
              paddingTop: "2px !important",
              fontSize: "14px !important",
              lineHeight: "14px",
              color: "#343536 !important",
            },
          }}
          placeholder="Enter observation remarks"
        />
      </Box>
      {/* {openUpload && (
        <UploadFile
          open={openUpload}
          handleClose={toggleOpenUpload}
          handleUploadPath={handleUploadSucess}
        />
      )} */}
    </Box>
  );
};

export default JobTrainingTest;
