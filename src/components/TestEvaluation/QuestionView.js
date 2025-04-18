import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import downloadIcon from "../../assets/icons/downloadIcon.svg";
import Download from "../../Dashboard/SupervisorDashboard/JobTraining/L0ToL3/components/JoineeDetails/TrainingSteps/Download";
import SecondaryButtonWithIcon from "../Button/SecondaryButtonWithIcon";
const DownloadIcon = () => (
  <img style={{ height: "1.6rem", width: "1.6rem" }} src={downloadIcon} />
);
const QuestionView = ({
  questionNumber,
  question,
  answer,
  remarks,
  isMaru,
  filePath,
  level,
}) => {
  const [openDownload, setOpenDownload] = useState(false);
  const toggleDownload = () => {
    setOpenDownload(!openDownload);
  };
  const getColor = () => {
    return answer === "OK" ? "#58A55C" : "#D83B01";
  };
  const getBackgroundColor = () => {
    return isMaru ? "#F4F5F8" : "white";
  };
  return (
    <>
      {isMaru && (questionNumber === "Q4." || questionNumber === "A.") && (
        <Box
          sx={{ paddingLeft: "2rem", paddingTop: "2rem", bgcolor: "#F4F5F8" }}
        >
          <Typography variant="h4">
            For {isMaru} operation evaluation only
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          padding: "1rem",
          borderBottom: "1px solid #E6E9F0",
          display: "flex",
          gap: "0.4rem",
          bgcolor: getBackgroundColor(),
        }}
      >
        <Box sx={{ alignItems: "flex-start", paddingTop: "1rem" }}>
          <Typography>{questionNumber}</Typography>
        </Box>
        <Box sx={{ width: "700px" }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  scope="row"
                  maxRows={5}
                  sx={{ width: "50%", border: "transparent" }}
                >
                  <Box sx={{ maxHeight: "10rem", overflowY: "auto" }}>
                    <Typography variant="h7">{question}</Typography>
                  </Box>
                </TableCell>
                <TableCell
                  align="left"
                  style={{ width: "50%", border: "transparent" }}
                >
                  <Typography variant="h4" sx={{ color: getColor() }}>
                    {answer}
                  </Typography>
                </TableCell>
              </TableRow>
              {isMaru && level !== "L3" && (
                <TableRow>
                  <TableCell style={{ width: "50%", border: "transparent" }}>
                    <Typography variant="h7">
                      WIS/MOS form filled by operator
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: "50%", border: "transparent" }}>
                    {filePath?.filePath !== null ? (
                      <SecondaryButtonWithIcon
                        endIcon={<DownloadIcon />}
                        onClick={toggleDownload}
                      >
                        {filePath?.fileName}
                      </SecondaryButtonWithIcon>
                    ) : null}
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell
                  scope="row"
                  style={{ width: "50%", border: "transparent" }}
                >
                  <Typography variant="h7">Observation Remarks</Typography>
                </TableCell>
                <TableCell
                  align="left"
                  style={{ width: "50%", border: "transparent" }}
                >
                  {remarks ? (
                    <Typography variant="h4">{remarks}</Typography>
                  ) : (
                    <Typography variant="h4">--</Typography>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {openDownload && (
            <Download
              file={filePath?.filePath}
              open={openDownload}
              handleClose={toggleDownload}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
export default QuestionView;
