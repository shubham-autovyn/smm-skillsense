import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import CustomAccordion from "../../../../../../../../components/Accordion/CustomAccordion";
import QuestionView from "../../../../../../../../components/TestEvaluation/QuestionView";
import ButtonAccordion from "../../../../../../../../components/Accordion/ButtonAccordion";
import SecondaryButtonWithIcon from "../../../../../../../../components/Button/SecondaryButtonWithIcon";
import JobTrainingTest from "../../../../../../../../components/TestAttempt/JobTrainingTest";
import PrimaryButton from "../../../../../../../../components/PrimaryButton/PrimaryButton";
import Footer from "../../../../../../../../components/Footer";
import {
  StatusAlertSevere,
  StatusGreen,
  TypePrimary,
  TypeSecondary,
} from "../../../../../../../../../Utilities/colors";
import TertiaryButton from "../../../../../../../../../Utilities/Buttons/TertiaryButton/TertiaryButton";
import Done from "../../../../../../../../assets/icons/Done.svg";
import { getEpochToDDMMYY } from "../../../../../../../../utils/helperFunctions";
import UploadFile from "./components/UploadFile";
import ConfirmationDialog from "./components/ConfirmationDialog";
import downloadIcon from "../../../../../../../../assets/icons/downloadIcon.svg";
import Download from "../Download";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTraining,
  navigateNextLevel,
} from "../../../../../../../../redux/Actions/JobTrainingAction";
import {
  getCompleteTrainingData,
  getCompleteTrainingDataLoading,
} from "../../../../../../../../redux/Reducers/SMMJobTrainingReducer";
import { getShop } from "../../../../../../../../redux/Reducers/SMMShopReducer";
import { getUser } from "../../../../../../../../../../services/Authorization/AuthorizationService";
import { CircularProgress, Backdrop } from "@mui/material";
const DownloadIcon = () => (
  <img style={{ height: "1.6rem", width: "1.6rem" }} src={downloadIcon} />
);
const L2ToL3Training = ({
  handlePrev,
  handleNext,
  testData,
  handleSubmitTest,
  level,
  isMaru,
  selectedStaffRow
}) => {
  const dispatch=useDispatch();
  const [isEvaluationStarted, setIsEvaluationStarted] = useState(true);
  const [isL1Completed, setisL1Completed] = useState(false);
  const [answersInput, setAnswersInput] = useState({});
  const [fileNamePath, setFileNamePath] = useState({});
  const [openUpload, setOpenUpload] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDownload, setOpenDownload] = useState({
    open: false,
    filePath: "",
  });
  const completeTrainingData=useSelector(getCompleteTrainingData);
  const completeTrainingDataLoading=useSelector(getCompleteTrainingDataLoading);
  const shop=useSelector(getShop);
  const limit=isMaru===null?3:7;
  useEffect(() => {
    if (Object.keys(testData).length !== 0) {
      if (
        testData?.filter((x) => x?.testStatus === "fail")?.length ===
        testData?.length
      ) {
        setIsEvaluationStarted(false);
      } else {
        setisL1Completed(true);
      }
    } else {
      setIsEvaluationStarted(true);
    }
  }, [testData]);
  const handleConfirmationClose = () => {
    setOpenConfirm(false);
  };
  const handleConfirmChoice = () => {
    var cred = getUser()?.username.split("\\");
    if (cred) {
      let userId;
      let userName;
      if (cred.length === 1) {
        userId = cred[0];
        userName = cred[0];
      } else {
        userId = cred[0] + "%5C" + cred[1];
        userName = cred[1];
      }
      const payload = {
        //"shopName": shop?.shop_name,
        // "currentLevel": 2,
        //Above payloads are changed
        shopID: selectedStaffRow?.shopId,
        staffID: selectedStaffRow?.staffID,
        userID: userId,
        groupName: selectedStaffRow?.groupName,
        lineName: selectedStaffRow?.lineName,
        areaName: selectedStaffRow?.areaName,
        stationName: selectedStaffRow?.stationName,
        OJTTrainingID: selectedStaffRow?.ID,
        level: "L3",
      };
      dispatch(completeTraining(payload));
      setOpenConfirm(false);
    }
  };
  const toggleOpenUpload = () => {
    setOpenUpload(!openUpload);
  };
  const onUpload = () => {};
  const handleComplete = () => {
    setOpenConfirm(true);
  };
  const toggleDownload = (data) => {
    setOpenDownload(data);
  };
  const getQuestions = (level, isMaru = false) => {
    switch (level) {
      case "L3":
        return isMaru !== null
          ? [
              {
                questionNumber: "Q1.",
                questionText: 'Check operator is Maintaining 5 "S"',
                options: ["OK", "NG", "NA"],
                remarks: "",
              },
              {
                questionNumber: "Q2.",
                questionText:
                  "Check operator is working within Cycle/takt time and with safety",
                options: ["OK", "NG", "NA"],
                remarks: "",
              },
              {
                questionNumber: "Q3.",
                questionText:
                  "Check operator has knowledge on Effect of defect / knowledge on defects",
                options: ["OK", "NG", "NA"],
                remarks: "",
              },
              {
                questionNumber: "A.",
                questionText:
                  "Station specific Maru-A, AR, A/AR process/Part etc.",
                options: ["OK", "NG", "NA"],
                remarks: "",
                station: isMaru,
              },
              {
                questionNumber: "B.",
                questionText:
                  "Understanding of impact of non-compliance of Maru-A, AR, A/AR Operations",
                options: ["OK", "NG", "NA"],
                remarks: "",
                station: isMaru,
              },
              {
                questionNumber: "C.",
                questionText:
                  "Past problems related to Maru-A, AR, A/AR operations",
                options: ["OK", "NG", "NA"],
                remarks: "",
                station: isMaru,
              },
              {
                questionNumber: "D.",
                questionText:
                  "Escalation or communication in case of any abnormality",
                options: ["OK", "NG", "NA"],
                remarks: "",
                station: isMaru,
              },
            ]
          : [
              {
                questionNumber: "Q1.",
                questionText: 'Check operator is Maintaining 5 "S"',
                options: ["OK", "NG", "NA"],
                remarks: "",
              },
              {
                questionNumber: "Q2.",
                questionText:
                  "Check operator is working within Cycle/takt time and with safety",
                options: ["OK", "NG", "NA"],
                remarks: "",
              },
              {
                questionNumber: "Q3.",
                questionText:
                  "Check operator has knowledge on Effect of defect / knowledge on defects",
                options: ["OK", "NG", "NA"],
                remarks: "",
              },
            ];
      default:
        return [];
    }
  };

  const getEvaluationTitle = (data) => {
    if (data.testStatus === "attempted") {
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <Typography variant="h4">Evaluation {data?.index}</Typography>
            <Typography variant="h4">|</Typography>
            <Typography variant="h4" color={StatusGreen}>
              {`${
                data.attempt?.slice(0, limit).filter((x) => x?.OK !== undefined)
                  .length
              } 
                  OK,`}
            </Typography>
            <Typography variant="h4" color={StatusAlertSevere}>
              {`${
                data.attempt?.slice(0, limit).filter((x) => x?.NG !== undefined)
                  .length
              }
               NG`}
              ,
            </Typography>
            <Typography variant="h4">
              {`${
                data.attempt?.slice(0, limit).filter((x) => x?.NA !== undefined)
                  .length
              }
               NA`}
            </Typography>
            <Typography variant="h4">|</Typography>
            <Typography variant="h4">
              Evaluated on:{" "}
              {getEpochToDDMMYY(parseInt(data?.attempt[limit]?.evaluatedOn))}
            </Typography>

            <Box style={{ border: "transparent" }}>
              {data?.attempt[limit]?.filePath !== null ? (
                <SecondaryButtonWithIcon
                  endIcon={<DownloadIcon />}
                  onClick={() =>
                    toggleDownload({
                      open: true,
                      filePath: data?.attempt[limit]?.filePath,
                    })
                  }
                >
                  {data?.attempt[limit]?.fileName}
                </SecondaryButtonWithIcon>
              ) : null}
            </Box>
          </Box>
          <Box>
            {data.attempt?.slice(0, limit).filter((x) => x?.NG !== undefined)
              .length === 0 && (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <img
                  style={{ height: "2rem", width: "2rem" }}
                  alt="MSIL Logo"
                  src={Done}
                />
                <Typography variant="h4">{`${level} Evaluation Completed`}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      );
    } else if (data.testStatus === "started") {
      return (
        <Box sx={{ display: "flex", gap: "1.5rem" }}>
          <Typography variant="h4">{`Evaluation ${level} Requirements`}</Typography>
        </Box>
      );
    } else {
      return null;
    }
  };

  const handleStartEvaluation = () => {
    setIsEvaluationStarted(true);
  };
  const handleSelect = (data) => {
    setAnswersInput((prev) => {
      return {
        ...prev,
        ...{
          [data?.questionNumber]: {
            questionNumber: data?.questionNumber,
            onbservation: data?.observation,
            radioInput: data?.radioInput,
            question: data?.question,
          },
        },
      };
    });
  };
  // useEffect(() => {
  //   console.log("Answer Input", answersInput);
  // }, [answersInput]);
  const getOkNgNa = (val) => {
    if (val?.OK) {
      return "OK";
    } else if (val?.NG) {
      return "NG";
    } else return "NA";
  };
  const checkNgObservation = (answers) => {
    //console.log("Answers", answers);
    if (Object.keys(answersInput)?.length !== limit && isMaru !== null) {
      return false;
    }
    for (let key in answers) {
      if (
        answers[key].radioInput === undefined ||
        (answers[key].radioInput === "NG" && answers[key].onbservation === "")
      ) {
        return false;
      }
    }
    return true;
  };
  const handleUploadPath = (data) => {
    setFileNamePath(data);
  };
  const getQuestionNumber = (index) => {
    switch (index) {
      case 0:
        return "Q1.";
      case 1:
        return "Q2.";
      case 2:
        return "Q3.";
      case 3:
        return "A.";
      case 4:
        return "B.";
      case 5:
        return "C.";
      case 6:
        return "D.";
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      {Object.keys(testData)?.length !== 0 &&
        testData[0]?.testDetails?.map((attempt, index) => (
          <CustomAccordion
            key={index}
            maxSummaryHeight={"250px"}
            borderColor={
              attempt?.slice(0, limit).filter((x) => x?.NG !== undefined)
                .length !== 0
                ? "red"
                : "green"
            }
            titleComponent={getEvaluationTitle({
              attempt: attempt,
              result: "pass",
              testStatus: "attempted",
              index: index + 1,
            })}
          >
            <Box>
              {attempt?.slice(0, limit).map((question, index) => {
                return (
                  <QuestionView
                    key={index}
                    questionNumber={getQuestionNumber(index)}
                    question={question?.Question}
                    answer={getOkNgNa(question)}
                    remarks={question["Observation remarks"]}
                    station={question.station}
                    isMaru={index >= 3 ? isMaru : false}
                    filePath={attempt?.length > limit ? attempt[limit] : {}}
                    level={level}
                  />
                );
              })}
            </Box>
          </CustomAccordion>
        ))}
      {isEvaluationStarted && !isL1Completed && (
        <CustomAccordion
          titleComponent={getEvaluationTitle({
            testStatus: "started",
            stepNumber: 1,
          })}
        >
          <Box>
            {getQuestions(level, isMaru).map((question, index) => (
              <JobTrainingTest
                key={index}
                questionNumber={question.questionNumber}
                questionText={question.questionText}
                options={question.options}
                remarks={question.remarks}
                station={question?.station}
                handleSelect={handleSelect}
                handleUploadPath={handleUploadPath}
                level={level}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: "1rem",
              pb: "1rem",
            }}
          >
            <Box sx={{ width: "12rem" }}>
              {Object.keys(testData)?.length !== 0 && (
                <TertiaryButton onClick={() => setIsEvaluationStarted(false)}>
                  Cancel
                </TertiaryButton>
              )}
            </Box>
            <Box sx={{ width: "17rem" }}>
              <PrimaryButton
                onClick={() => setOpenUpload(true)}
                disabled={!checkNgObservation(answersInput)}
              >
                Submit Evaluation
              </PrimaryButton>
            </Box>
          </Box>
        </CustomAccordion>
      )}

      {openUpload && (
        <UploadFile
          open={openUpload}
          onUpload={onUpload}
          handleClose={toggleOpenUpload}
          handleSubmit={(res) => handleSubmitTest(answersInput, level, res)}
        />
      )}
      <ConfirmationDialog
       selectedStaffRow={selectedStaffRow}
        openConfirm={openConfirm}
        handleClose={handleConfirmationClose}
        handleChoice={handleConfirmChoice}
        headerText="Confirm OJT Completion"
        infoText="When you mark it as complete,this record will be cleared from here and moved to the Reports section.Are you sure you want to mark the following OJT as completed?"
        confirmButtonText="Complete Training"
      />
      {!isEvaluationStarted && (
        <ButtonAccordion
          titleComponent={
            <SecondaryButtonWithIcon onClick={handleStartEvaluation}>
              Start Another Evaluation
            </SecondaryButtonWithIcon>
          }
        />
      )}
      {testData[0]?.testStatus=="pass" && (selectedStaffRow?.ExhaustedDay<selectedStaffRow?.plannedDays) && (
        <Box sx={{ background: "#F1BE424A", borderRadius: "4px", p: "1rem" }}>
          <Typography variant="body1" color={TypePrimary}>
            {`Training completed in fewer than ${selectedStaffRow?.plannedDays} days. You can mark the training
            as completed once the ${selectedStaffRow?.plannedDays} day period has passed.`}
          </Typography>
        </Box>
      )}
      {openDownload?.open && (
        <Download
          file={openDownload?.filePath}
          open={openDownload?.open}
          handleClose={() => toggleDownload({ open: false, filePath: "" })}
        />
      )}
      <Box
        sx={{
          width: "55rem",
          position: "fixed",
          bottom: "2%",
          right: "7rem",
        }}
      >
        <Footer
          prevLabel={"Previous Level"}
          handlePrev={handlePrev}
          handleNext={handleComplete}
          saveLabel={"Complete Training"}
          currentStep={2}
          nextDisabled={
            Array.isArray(testData)
              ? testData[0]?.testStatus !== "pass" ||
                selectedStaffRow?.ExhaustedDay < selectedStaffRow?.plannedDays
              : true
          }
        />
      </Box>
    </Box>
  );
};
export default L2ToL3Training;
