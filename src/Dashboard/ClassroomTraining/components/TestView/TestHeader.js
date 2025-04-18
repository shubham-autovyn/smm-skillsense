import { Box, MenuItem, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import TestDownload from "../../../../assets/icons/TestDownload.svg";
import Download from "../../../../components/Download/Download";
import SingleSelect from "../../../../components/Select/SingleSelect";
import { TypePrimary, StatusAlertSevere, StatusAlertSevereBackground, Green, StatusDoneBackground, YellowBackground, TypeSecondary } from "../../../../../Utilities/colors";
const getFormattedEpocDate = (inputDate) => {
  if (Number.isInteger(inputDate)) {
    return dayjs(inputDate * 1000).format("DD/MM/YY; HH:mm");
  }
  return "-";
};

const TestHeader = ({
  testName,
  testDescription,
  workArea,
  trainer,
  userDetails,
  testScore,
  totalMarks,
  status,
  dateTime,
  attempts,
  selectedAttempt = 0,
  handleSelectChange = () => { },
  onDownload,
}) => {
  const [openDownload, setOpenDownload] = useState(false);
  const isPendingFlow = status?.toLowerCase() === "pending";
  const handleCloseDownload = () => {
    setOpenDownload(false);
  };
  return (
    <Box>
      <Paper sx={{ backgroundColor: "#E6E9F0", padding: "1.6rem" }}>
        <Box
          sx={{
            pb: "1rem",
            display: "flex",
            borderRadius: "8px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: "24px", lineHeight: "normal" }}
          >
            {testName}
          </Typography>
          <Box style={{ display: "flex", position: "relative", gap: "1.2rem" }}>
            {status !== "Pending" && (
              <Box sx={{ minWidth: "12rem" }}>
                {selectedAttempt && (
                  <SingleSelect
                    label="Attempt"
                    value={selectedAttempt}
                    onChange={handleSelectChange}
                  >
                    {attempts?.map((attempt, index) => (
                      <MenuItem key={index} value={attempt.attemptNo}>
                        {attempt?.attemptNo}
                      </MenuItem>
                    ))}
                  </SingleSelect>
                )}
              </Box>
            )}
            {!isPendingFlow &&
              <img
                alt="download"
                src={TestDownload}
                style={{
                  cursor: "pointer",
                  height: "3rem",
                  width: "3rem",
                }}
                onClick={onDownload}
              />
            }
            {openDownload && (
              <Download open={openDownload} handleClose={handleCloseDownload} />
            )}
          </Box>
        </Box>

        <Box sx={{ marginTop: "0.8rem" }}>
          <Typography sx={{ fontSize: "16px" }}>
            {testDescription || ""}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1.6rem",
          }}
        >
          <Box sx={{ height: "80px", width: "23%", paddingTop: "8px" }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <Box sx={{ textAlign: "left", height: "16px" }}>
                <Typography variant="silverTitle" sx={{ fontSize: "14px" }}>
                  Attendee:
                </Typography>
              </Box>
              <Box sx={{ textAlign: "left", height: "16px" }}>
                <Typography variant="silverTitle" sx={{ fontSize: "14px" }}>
                  Work Area:
                </Typography>
              </Box>
              <Box sx={{ textAlign: "left", height: "16px" }}>
                <Typography variant="silverTitle" sx={{ fontSize: "14px" }}>
                  Trainer:
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ height: "80px", width: "23%", paddingTop: "8px" }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <Box sx={{ textAlign: "left", height: "16px" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                  {userDetails}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "left", height: "16px" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                  {workArea}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "left", height: "16px" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                  {trainer}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ height: "80px", width: "23%", paddingTop: "8px" }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <Box sx={{ textAlign: "left", height: "16px" }}>
                <Typography variant="silverTitle" sx={{ fontSize: "14px" }}>
                  Test Score & Status:
                </Typography>
              </Box>
              <Box sx={{ textAlign: "left", height: "16px" }}>
                <Typography variant="silverTitle" sx={{ fontSize: "14px" }}>
                  Date & Time:
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ height: "80px", width: "23%", paddingTop: "8px" }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <Box sx={{ textAlign: "left", height: "16px" }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "1.6rem",
                    alignItems: "center",
                    marginTop: "-0.8rem",
                  }}
                >
                  {status !== "Pending" && (
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color:
                            isPendingFlow
                              ? TypePrimary
                              : status === "Pass"
                                ? Green
                                : StatusAlertSevere,
                        }}
                      >
                        {testScore === null ? 0 : testScore}/
                      </Typography>
                      <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
                        {totalMarks}
                      </Typography>
                    </Box>
                  )}
                  <Box
                    sx={{
                      backgroundColor: isPendingFlow ? YellowBackground : (status === "Pass" ? StatusDoneBackground : StatusAlertSevereBackground),
                      color: isPendingFlow ? TypeSecondary : status === "Pass" ? Green : StatusAlertSevere,
                      fontSize: "14px",
                      alignItems: "center",
                      minWidth: "42px",
                      px: "1rem",
                      borderRadius: "8px",
                    }}
                  >
                    {isPendingFlow ? "Pending Evaluation" : status}
                  </Box>
                </Box>
              </Box>
              <Box sx={{ textAlign: "left", height: "16px" }}>
                <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                  {getFormattedEpocDate(dateTime)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
export default TestHeader;
