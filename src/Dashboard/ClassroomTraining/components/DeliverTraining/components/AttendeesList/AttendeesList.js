import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SecondaryButton from "../../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
import {
  Green,
  MarutiBlue500,
  StatusDoneBackground,
  TypeSecondary,
} from "../../../../../../../Utilities/colors";
import CheckIcon from "../../../../../../assets/icons/CheckCircle.svg";
import SortIcon from "../../../../../../assets/icons/SortIcon.svg";
import RefreshButton from "../../../../../../components/RefreshButton";
import { getShop } from "../../../../../../redux/Reducers/SMMShopReducer";
import { dateFormat } from "../../../../../../utils/helperFunctions";
import useStyles from "../../../../../styles";
import TableData from "./TableData";
const AttendeesList = ({
  staffData,
  handleRetestPress,
  isTopicDelivered,
  isPostTraining,
  handleViewTestQR,
  handleRefresh,
  reattemptStatusData,
  isPostTrainingCompleted,
  isReattemptApplied,
  handleReattemptSuccessClose,
  trainingType,
  topicFilledBy,
  attemptCount,
  postTestAttempt,
}) => {
  const classes = useStyles();
  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const shop = useSelector(getShop);
  useEffect(() => {
    if (staffData?.trainingId) {
      setFilteredData(staffData?.staffDetails);
    }
  }, [staffData]);

  const handleSortClick = (type) => {
    switch (type) {
      case "staffId":
      case "staffName":
      case "level":
      case "preTestStatus":
      case "postTestStatus":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? b[type].localeCompare(a[type])
              : a[type].localeCompare(b[type])
          )
        );
        setIsAscending(!isAscending);
        break;
      case "dob":
        setFilteredData(
          filteredData?.sort((a, b) =>
            isAscending
              ? dateFormat(a[type]) - dateFormat(b[type])
              : dateFormat(b[type]) - dateFormat(a[type])
          )
        );
        setIsAscending(!isAscending);
    }
  };

  const handleTest = (data, type, testStatus) => {
    const testId = Date.now().toString(36);
    const topicData = {
      shop_id: shop?.id?.toString(),
      staff_id: data.staffId,
      training_id: staffData.trainingId,
      test_type: type, //type is pre or post
      masterTopicId: staffData.masterTopicId,
      FilledBy: topicFilledBy === "Trainee" ? "Trainee" : "Trainer",
      staffName: data.staffName,
      trainingType: trainingType,
      trainingBatchId: staffData.trainingBatchId,
      trainerId: staffData.trainerId,
      trainerName: staffData.trainerName,
      area: data.area,
      group: data.group,
      line: data.line,
      attendee_level: data.attendeeLevel,
      path: location.pathname,
    };
    sessionStorage.setItem(testId, JSON.stringify(topicData));
    if (topicFilledBy === "Trainer" && testStatus) {
      let evaluationUrl = `/SMM/TrainerFill?test=${[testId]}`;
      navigate(`/SMM/TrainerFill?test=${[testId]}`);
    } else {
      let testUrl = `/SMM/TestView?test=${[testId]}`;
      window.open(testUrl, "_blank");
    }
  };

  const getTableHeaders = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">
            <div className={classes.columnHeader}>
              Staff ID
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("staffId")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell align="left">
            <div className={classes.columnHeader}>
              Name
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("staffName")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell align="left">
            <div className={classes.columnHeader}>
              Level
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("level")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell align="left">
            <div className={classes.columnHeader}>
              Date of Birth
              <IconButton sx={{ p: 0 }} onClick={() => handleSortClick("dob")}>
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          {staffData?.testType?.includes("PRE") && (
            <TableCell align="left">
              <div className={classes.columnHeader}>
                {topicFilledBy === "Trainer"
                  ? "Pre-Training Evaluation Status"
                  : "Pre-Training Test Status"}
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => handleSortClick("preTestStatus")}
                >
                  <img src={SortIcon} alt="Sort" />
                </IconButton>
              </div>
            </TableCell>
          )}
          <TableCell align="left">
            <div className={classes.columnHeader}>
              {topicFilledBy === "Trainer"
                ? "Post-Training Evaluation Status"
                : "Post-Training Test Status"}
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("postTestStatus")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };
  const RenderInfo = () => {
    return (
      <Box
        sx={{
          backgroundColor: "#F1BE424A",
          mb: 1.5,
          p: 0.8,
          borderRadius: "4px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
          <Typography variant="body1">
            {`${reattemptStatusData?.noOfFailedTrainees || ""} 
            attendees did not pass the post-training test. 
            ${
              topicFilledBy === "Trainer"
                ? "Please confirm re-training delivery to"
                : "To allow them to re-attempt the test, please"
            }`}
          </Typography>
          <Typography
            variant="body1"
            onClick={handleRetestPress}
            sx={{ color: MarutiBlue500, fontWeight: "600", cursor: "pointer" }}
          >
            {topicFilledBy === "Trainer"
              ? "Enable Re-evaluation."
              : "Enable Re-test."}
          </Typography>
        </Box>
      </Box>
    );
  };

  const RenderReattemptSuccess = () => {
    return (
      <Box
        sx={{
          backgroundColor: StatusDoneBackground,
          mb: 1.5,
          p: 0.8,
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
          <img
            src={CheckIcon}
            alt="Check"
            style={{ height: "16px", width: "16px" }}
          />
          <Typography variant="body1">
            {topicFilledBy === "Trainer"
              ? "Re-evaluation enabled successfully! Please complete Pending Evaluations."
              : "Re-test successfully enabled. Attendees who have failed the test can re-attempt the test now!"}
          </Typography>
        </Box>
        <CloseIcon
          style={{ cursor: "pointer" }}
          aria-label="close"
          onClick={handleReattemptSuccessClose}
        />
      </Box>
    );
  };

  const isAdditionalInfo =
    isReattemptApplied ||
    (reattemptStatusData?.isReattemptPopUpToBeShown &&
      !isPostTrainingCompleted &&
      isPostTraining &&
      !isReattemptApplied);

  const sortAttendees = (data) => {
    return data.sort((a, b) => {
      if (topicFilledBy === "Trainee") {
        const aFailed = a.postTestStatus === "Fail";
        const bFailed = b.postTestStatus === "Fail";
        const aPass = a.postTestStatus === "Pass";
        const bPass = b.postTestStatus === "Pass";
        const aNotAttempted =
          a.postTestStatus === null || a.postTestAttempt === 0;
        const bNotAttempted =
          b.postTestStatus === null || b.postTestAttempt === 0;

        const aZeroAttempt = a.postTestAttempt === 0;
        const bZeroAttempt = b.postTestAttempt === 0;

        if (aZeroAttempt && !bZeroAttempt) {
          return 1;
        } else if (!aZeroAttempt && bZeroAttempt) {
          return -1;
        } else if (aNotAttempted && !bNotAttempted) {
          return 1;
        } else if (!aNotAttempted && bNotAttempted) {
          return -1;
        } else if (aNotAttempted && bNotAttempted) {
          return a.staffName.localeCompare(b.staffName);
        } else {
          const aIsPending = !aFailed && !aPass;
          const bIsPending = !bFailed && !bPass;

          if (aIsPending && !bIsPending) {
            return -1;
          } else if (!aIsPending && bIsPending) {
            return 1;
          } else if (aFailed === bFailed) {
            if (aPass && !bPass) {
              return -1;
            } else if (!aPass && bPass) {
              return 1;
            } else {
              return a.staffName.localeCompare(b.staffName);
            }
          } else {
            return aFailed ? -1 : 1;
          }
        }
      } else {
        if (attemptCount === 0) {
          const aFailed = a.postTestStatus === "Fail";
          const bFailed = b.postTestStatus === "Fail";
          const aPass = a.postTestStatus === "Pass";
          const bPass = b.postTestStatus === "Pass";
          const aIsPending = !aFailed && !aPass;
          const bIsPending = !bFailed && !bPass;

          if (aIsPending && !bIsPending) {
            return -1;
          } else if (!aIsPending && bIsPending) {
            return 1;
          } else if (aFailed === bFailed) {
            if (aPass && !bPass) {
              return -1;
            } else if (!aPass && bPass) {
              return 1;
            } else {
              return a.staffName.localeCompare(b.staffName);
            }
          } else {
            return aFailed ? -1 : 1;
          }
        } else if (attemptCount >= 1) {
          const aAttempt1 = a.postTestAttempt >= 1;
          const bAttempt1 = b.postTestAttempt >= 1;
          const aFailed = a.postTestStatus === "Fail";
          const bFailed = b.postTestStatus === "Fail";
          const aPassed = a.postTestStatus === "Pass";
          const bPassed = b.postTestStatus === "Pass";
          const allPassed = aPassed && bPassed;

          if (aAttempt1 && aFailed && !(bAttempt1 && bFailed)) {
            return -1;
          } else if (bAttempt1 && bFailed && !(aAttempt1 && aFailed)) {
            return 1;
          } else if (aAttempt1 && aPassed && !(bAttempt1 && bPassed)) {
            return 1;
          } else if (bAttempt1 && bPassed && !(aAttempt1 && aPassed)) {
            return -1;
          } else if (
            aPassed &&
            bPassed &&
            a.postTestAttempt !== b.postTestAttempt
          ) {
            return b.postTestAttempt - a.postTestAttempt;
          } else if (allPassed) {
            return b.postTestAttempt - a.postTestAttempt;
          } else {
            return a.postTestAttempt - b.postTestAttempt;
          }
        }
      }
    });
  };

  return (
    <Box
      sx={{
        width: "80%",
        borderRadius: "8px",
        border: "1px solid var(--Grey-20, #E6E9F0)",
        ml: 2,
        p: 2,
      }}
      className={`${classes["repository-table-dimensions"]}`}
    >
      {reattemptStatusData?.isReattemptPopUpToBeShown &&
      !isPostTrainingCompleted &&
      isPostTraining &&
      !isReattemptApplied ? (
        <RenderInfo />
      ) : null}
      {isReattemptApplied && <RenderReattemptSuccess />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4">
            {staffData?.trainingTopicName || ""}
          </Typography>
          <Box
            sx={{
              bgcolor: isTopicDelivered ? StatusDoneBackground : "#E6E9F0",
              p: "0.5rem",
              px: 1.5,
              borderRadius: "6px",
              textAlign: "center",
              ml: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: isTopicDelivered ? Green : TypeSecondary }}
            >
              {isTopicDelivered ? "Delivered" : "Not Delivered"}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <RefreshButton handleRefresh={handleRefresh} />
          <SecondaryButton
            type="button"
            onClick={handleViewTestQR}
            disabled={
              (isPostTraining && isPostTrainingCompleted) ||
              (isPostTraining &&
                reattemptStatusData?.isReattemptPopUpToBeShown &&
                !isReattemptApplied) ||
              (isPostTraining &&
                staffData?.topicStatus === "STARTED" &&
                topicFilledBy === "Trainer" &&
                staffData?.postTestStatus === "STARTED")
            }
          >
            {isPostTraining
              ? topicFilledBy === "Trainer"
                ? "Start Post-Training Evaluation"
                : "View Post-Training Test QR Code"
              : topicFilledBy === "Trainer"
              ? "Start Pre-Training Evaluation"
              : "View Pre-Training Test QR Code"}
          </SecondaryButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1,
        }}
      >
        <Typography variant="darkTitle">
          Total {filteredData?.length || ""}
        </Typography>
      </Box>
      <TableContainer
        className={`${
          classes[
            isAdditionalInfo
              ? "delivery-table-info-dimensions"
              : "delivery-table-dimensions"
          ]
        }`}
        component={Paper}
      >
        <Table stickyHeader aria-label="sticky table">
          {getTableHeaders()}
          <TableBody>
            {sortAttendees(filteredData)?.map((row, index) => (
              <TableData
                key={index}
                row={row}
                isPreTest={staffData?.testType?.includes("PRE")}
                handleTest={(type, status) =>
                  handleTest(row, type, status === "pending")
                }
                topicStatus={staffData?.topicStatus}
                topicFilledBy={staffData?.filledBy}
                postTestStatus={staffData?.postTestStatus}
                attemptCount={staffData?.attempt_count}
                masterTopicId={staffData?.masterTopicId}
                isPostTraining={isPostTraining}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default AttendeesList;
