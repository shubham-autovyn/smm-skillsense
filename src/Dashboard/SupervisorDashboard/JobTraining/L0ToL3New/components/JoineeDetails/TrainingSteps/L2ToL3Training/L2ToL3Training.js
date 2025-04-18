import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import FileIcon from "../../.../../../../../../../../assets/icons/downloadIcon.svg";
import TertiaryButton from "../../../../../../../../utils/Buttons/TertiaryButton/TertiaryButton";
import downloadIcon from "../../../../../../../../assets/icons/downloadIcon.svg";
import ButtonAccordion from "../../../../../../../../components/Accordion/ButtonAccordion";
import CustomAccordion from "../../../../../../../../components/Accordion/CustomAccordion";
import SecondaryButtonWithIcon from "../../../../../../../../components/Button/SecondaryButtonWithIcon";
import Footer from "../../../../../../../../components/Footer";
import PrimaryButton from "../../../../../../../../components/PrimaryButton/PrimaryButton";
import SnackBar from "../../../../../../../../components/Snackbar/Snackbar";
import JobTrainingTest from "../../../../../../../../components/TestAttempt/JobTrainingTest";
import QuestionView from "../../../../../../../../components/TestEvaluation/QuestionView";
import useStyles from "../../../../../../../styles";
import useLoToL3TestResult from "../../../../../../hooks/postL0toL3TestResults";
import UploadFiles from "../L2ToL3Training/components/UploadFiles";
import SendForApproval from "./components/SentForApprovalDialog/SendForApprovalDialog";

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
  selectedStaffRow,
}) => {
  const [isEvaluationStarted, setIsEvaluationStarted] = useState(true);
  const [answersInput, setAnswersInput] = useState({});
  const [fileNamePath, setFileNamePath] = useState({});
  const [openUpload, setOpenUpload] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [evaluationSummaries, setEvaluationSummaries] = useState([]);
  const [allAnswersCorrect, setAllAnswersCorrect] = useState(false);
  const [isApprovalSent, setIsApprovalSent] = useState(false);
  const limit = isMaru ? 7 : Math.max(3, Object.keys(answersInput).length);
  const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("");
  const classes = useStyles();

  const { fetchLoToL3TestResult, dataL0ToL3TestResult, loading } =
    useLoToL3TestResult();

  // useEffect(() => {
  //   if (Object.keys(testData).length !== 0) {
  //     if (
  //       testData?.filter((x) => x?.testStatus === "fail")?.length ===
  //       testData?.length
  //     ) {
  //       setIsEvaluationStarted(false);
  //     } else {
  //       setisL1Completed(true);
  //     }
  //   } else {
  //     setIsEvaluationStarted(true);
  //   }
  // }, [testData]);

  const handleSendForApproval = () => {
    setOpenUpload(false);
    setIsApprovalSent(true);
  };

  const handleBack = () => {
    setOpenUpload(true);
    setIsApprovalSent(false);
  };

  const handleComplete = () => {
    setOpenConfirm(true);
  };

  const getQuestions = (level) => {
    switch (level) {
      case "L3":
        return [
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
            questionText: "Station specific Maru-A, AR, A/AR process/Part etc.",
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
        ];
      default:
        return [];
    }
  };

  const handleStartEvaluation = () => {
    setIsEvaluationStarted(true);
    setAnswersInput({});
    setAllAnswersCorrect(false);
  };

  const handleSelect = (data) => {
    setAnswersInput((prev) => ({
      ...prev,
      [data?.questionNumber]: {
        questionNumber: data?.questionNumber,
        onbservation: data?.observation,
        radioInput: data?.radioInput,
        question: data?.question,
      },
    }));
  };

  // const getOkNgNa = (val) => {
  //   if (val?.OK) return "OK";
  //   if (val?.NG) return "NG";
  //   return "NA";
  // };

  // const checkNgObservation = (answers) => {
  //   if (Object.keys(answers).length !== limit) return false;
  //   for (let key in answers) {
  //     if (answers[key]?.radioInput !== "OK") return false;
  //   }
  //   return true;
  // };

  const handleSubmitEvaluation = async () => {
    const evaluationTimestamp = new Date().toISOString();

    setEvaluationSummaries((prev) => [
      ...prev,
      { answers: answersInput, timestamp: evaluationTimestamp },
    ]);

    const testResponse = Object.values(answersInput).map((answer) => ({
      Question: answer.question,
      OK: answer.radioInput === "OK",
      NG: answer.radioInput === "NG",
      NA: answer.radioInput === "NA",
      "Observation remarks": answer.onbservation || "",
    }));

    const payload = {
      levelType: level,
      testResponse,
      filePath: fileNamePath?.filePath || "",
      fileName: fileNamePath?.fileName || "",
      OJTTrainingID: selectedStaffRow.OJTTrainingID || selectedStaffRow.ID,
      userID: selectedStaffRow.staffID,
      shopName: "AS-1",
    };

    try {
      const response = await fetchLoToL3TestResult(payload);
      if (
        response?.data.responseCode === 200 ||
        response?.data.responseCode === "SMM200"
      ) {
        const evaluationStatus = response?.data?.status || "fail";

        if (evaluationStatus === "pass") {
          setAllAnswersCorrect(true);
          setAlertMessage("Test result submitted successfully!");
          setShowSuccessAlert(true);
          setOpenUpload(true);
          setSubmissionError(false);
        } else {
          setIsEvaluationStarted(false);
        }
      } else {
        setSubmissionError(true);
        setAlertMessage("Server error: Unexpected response code");
        setShowSuccessAlert(true);

        console.error(
          "Server error: Unexpected response code",
          response?.data?.responseCode
        );
      }
    } catch (error) {
      setSubmissionError(true);
      setAlertMessage(dataL0ToL3TestResult?.message);
      setShowSuccessAlert(true);
      console.error("Failed to fetch evaluation result", error);
    } finally {
      setIsEvaluationStarted(false);
    }
  };

  const handleUploadPath = (data) => {
    setFileNamePath(data);
  };

  const handleApproval = () => {
    setIsApprovalSent(false);
    setShowAdditionalDiv(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!submissionError &&
        evaluationSummaries.map((summary, index) => {
          // Check if all answers are "OK"
          let okCount = 0;
          let ngCount = 0;
          let naCount = 0;

          Object.values(summary.answers).forEach((answer) => {
            if (answer.radioInput === "OK") okCount++;
            if (answer.radioInput === "NG") ngCount++;
            if (answer.radioInput === "NA") naCount++;
          });

          const isAllCorrect = Object.values(summary.answers).every(
            (answer) => answer.radioInput === "OK"
          );

          return (
            <CustomAccordion
              key={index}
              titleComponent={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "15px" }}>
                    <Typography variant="h4">Evaluation {index + 1}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        borderLeft: "1.5px solid",
                        borderRight: "1.5px solid",
                        padding: "0 10px",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Typography variant="h4">OK</Typography>
                        <Typography variant="h4" sx={{ color: "green" }}>
                          {okCount}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Typography variant="h4">NG</Typography>
                        <Typography variant="h4" sx={{ color: "red" }}>
                          {ngCount}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Typography variant="h4">NA</Typography>
                        <Typography variant="h4">{naCount}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="h4">
                        Updated on: 24/08/2025
                      </Typography>
                    </Box>
                  </Box>
                  {showAdditionalDiv && isAllCorrect && (
                    <Box
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#F1BE42",
                        padding: "4px 8px",
                      }}
                    >
                      <Typography sx={{ fontSize: "12px" }}>
                        Sent For Approval
                      </Typography>
                    </Box>
                  )}
                </Box>
              }
              borderColor={isAllCorrect ? "green" : "red"}
            >
              <Box>
                {Object.values(summary.answers).map((question, qIndex) => (
                  <QuestionView
                    key={qIndex}
                    questionNumber={question.questionNumber}
                    question={question.question}
                    answer={question.radioInput}
                    remarks={question.onbservation || "No Remarks"}
                    station={question.station}
                  />
                ))}
              </Box>
            </CustomAccordion>
          );
        })}
      {showAdditionalDiv && (
        <Box
          sx={{
            marginTop: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
            borderColor: "green",
            padding: "0 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ color: "black" }}>
              New Operator Training Method Sheet
            </Typography>
          </Box>
          <Box
            className={classes["container-flex"]}
            sx={{
              gap: "0.8rem",
              width: "auto",
              pb: "1.6rem",
              flexDirection: "column",
              marginTop: "10px",
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
                {fileName ? fileName : "NA"}
              </Typography>
              <img
                src={FileIcon}
                height="16rem"
                width="16rem"
                alt="file icon"
              />
            </label>
          </Box>
        </Box>
      )}
      {!isEvaluationStarted && !allAnswersCorrect && (
        <ButtonAccordion
          titleComponent={
            <SecondaryButtonWithIcon onClick={handleStartEvaluation}>
              Start Another Evaluation
            </SecondaryButtonWithIcon>
          }
        />
      )}
      {isEvaluationStarted && !allAnswersCorrect && (
        <CustomAccordion titleComponent="Start Evaluation" expanded={true}>
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
              <TertiaryButton onClick={() => setIsEvaluationStarted(false)}>
                Cancel
              </TertiaryButton>
            </Box>
            <Box sx={{ width: "17rem" }}>
              <PrimaryButton
                onClick={handleSubmitEvaluation}
                disabled={Object.keys(answersInput).length < limit}
              >
                Submit Evaluation
              </PrimaryButton>
            </Box>
          </Box>
        </CustomAccordion>
      )}
      {openUpload && allAnswersCorrect && (
        <UploadFiles
          open={openUpload}
          setFilePath={setFilePath}
          setFileName={setFileName}
          onUpload={() => {}}
          handleClose={() => setOpenUpload(false)}
          handleSubmit={handleSendForApproval}
        />
      )}
      {isApprovalSent && (
        <SendForApproval
          open={isApprovalSent}
          fileName={fileName}
          filePath={filePath}
          handleBack={handleBack}
          handleClose={handleApproval}
        />
      )}
      {/* <ConfirmationDialog
        selectedStaffRow={selectedStaffRow}
        openConfirm={openConfirm}
        handleClose={handleConfirmationClose}
        handleChoice={handleConfirmChoice}
        headerText="Confirm OJT Completion"
        infoText="Are you sure you want to mark this OJT as completed?"
        confirmButtonText="Complete Training"
      /> */}
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
          //   saveLabel={"Complete Training"}
          currentStep={2}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <SnackBar
          showSuccessAlert={submissionError}
          alertMessage={alertMessage}
          responseCode={dataL0ToL3TestResult?.responseCode}
          handleClose={() => setShowSuccessAlert(false)}
        />
      </Box>{" "}
    </Box>
  );
};

export default L2ToL3Training;
