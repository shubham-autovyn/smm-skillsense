import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TertiaryButton from "../../../../../../../utils/Buttons/TertiaryButton/TertiaryButton"
import ButtonAccordion from "../../../../../../../components/Accordion/ButtonAccordion";
import CustomAccordion from "../../../../../../../components/Accordion/CustomAccordion";
import SecondaryButtonWithIcon from "../../../../../../../components/Button/SecondaryButtonWithIcon";
import Footer from "../../../../../../../components/Footer";
import PrimaryButton from "../../../../../../../components/PrimaryButton/PrimaryButton";
import SnackBar from "../../../../../../../components/Snackbar/Snackbar";
import JobTrainingTest from "../../../../../../../components/TestAttempt/JobTrainingTest";
import QuestionView from "../../../../../../../components/TestEvaluation/QuestionView";
import * as shopReducer from "../../../../../../../redux/Reducers/SMMShopReducer";
import useLoToL3TestResult from "../../../../../hooks/postL0toL3TestResults";

const L1ToL2Training = ({
  handlePrev,
  handleNext,
  level,
  isMaru,
  selectedStaffRow,
  testData,
}) => {
  const [isEvaluationStarted, setIsEvaluationStarted] = useState(false);
  const [answersInput, setAnswersInput] = useState({});
  const [evaluations, setEvaluations] = useState([]);
  const [submissionError, setSubmissionError] = useState(false);
  const [isTestCorrect, setIsTestCorrect] = useState(false);
  const [data, setData] = useState(null);
  const shop = useSelector(shopReducer.getShop);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [responseCode , setResponseCode] = useState()
  const {
    dataL0ToL3TestResult,
    fetchLoToL3TestResult,
    loading: loadingL0ToL3TestResult,
  } = useLoToL3TestResult();
  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const dataHierarchy = JSON.parse(localStorage.getItem("dataHierarchy"));

  // const { dataTestDetails, fetchTestDetails } = useFetchTestDetails();

  // const fetchTestData = async () => {
  //   await fetchTestDetails(
  //     `shopID=${shop.id}&staffID=${selectedStaffRow.staffID}&level=${level}&stationName=${selectedStaffRow.stationName}&OJTTrainingID=${selectedStaffRow.OJTTrainingID}`
  //   );
  // };

  // useEffect(() => {
  //   fetchTestData();
  //   console.log("Data", dataTestDetails?.response);
  // }, [shop]);

  useEffect(() => {
    setData(dataL0ToL3TestResult);
  }, [dataL0ToL3TestResult]);

  const getQuestions = (level) => {
    switch (level) {
      case "L2":
        return [
          {
            questionNumber: "Q1.",
            questionText: "Awareness, 'TAKT/CYCLE Time' of the process",
            options: ["OK", "NG", "NA"],
            remarks: "",
          },
          {
            questionNumber: "Q2.",
            questionText:
              "Awareness/Training on station specific 'MOS/WIS'- Process, Tools, 5S etc.",
            options: ["OK", "NG", "NA"],
            remarks: "",
          },
          {
            questionNumber: "Q3.",
            questionText:
              "Check operator can use all appropriate tools for the work",
            options: ["OK", "NG", "NA"],
            remarks: "",
          },
          {
            questionNumber: "Q4.",
            questionText:
              "Whether Operator MOS/WIS training Feedback form filled?",
            options: ["OK", "NG", "NA"],
            remarks: "",
            station: isMaru,
          },
        ];
      case "L1":
        return [
          {
            questionNumber: "Q1.",
            questionText: "Awareness: 'MOS/WIS'- Process, Tools, 5S etc.",
            options: ["OK", "NG", "NA"],
            remarks: "",
          },
          {
            questionNumber: "Q2.",
            questionText: "Awareness: Safety precautions on the station",
            options: ["OK", "NG", "NA"],
            remarks: "",
          },
          {
            questionNumber: "Q3.",
            questionText:
              "Awareness: Systems (A,AR,A/AR,CLW etc.), Defects (Scratch control point/dent etc.) & its non-adherence effects",
            options: ["OK", "NG", "NA"],
            remarks: "",
          },
          {
            questionNumber: "Q4.",
            questionText:
              "Awareness: Quality Management System (ISO 9001 awareness, Quality Policy etc.)",
            options: ["OK", "NG", "NA"],
            remarks: "",
          },
        ];
      default:
        return [];
    }
  };

  const questions = getQuestions(level, isMaru);
  const limit = questions.length;

  const handleSelect = (data) => {
    setAnswersInput((prev) => ({
      ...prev,
      [data.questionNumber]: {
        questionNumber: data.questionNumber,
        observation: data.observation,
        radioInput: data.radioInput,
        question: data.question,
      },
    }));
  };

  // const checkAllCorrect = (answers) => {
  //   return Object.values(answers).every((answer) => answer.radioInput === "OK");
  // };

  const handleSubmit = async () => {
    const formattedTestResponse = Object.values(answersInput).map((answer) => ({
      Question: answer.question,
      OK: answer.radioInput === "OK",
      NG: answer.radioInput === "NG",
      NA: answer.radioInput === "NA",
      "Observation remarks": answer.observation || "",
    }));

    formattedTestResponse.push({
      evaluatedOn: Date.now().toString(),
      filePath: null,
      fileName: null,
    });

    const payload = {
      levelType: level,
      testResponse: formattedTestResponse,
      filePath: filePath || "",
      fileName: fileName || "",
      OJTTrainingID: selectedStaffRow.OJTTrainingID,
      userID: selectedStaffRow.staffID,
      shopName: dataHierarchy.shopName,
    };

    try {
      const response = await fetchLoToL3TestResult(payload);
      if (
        response?.data?.responseCode === 200 ||
        response?.data?.responseCode === "SMM200"
      ) {
        const isPassed = response?.data?.status === "pass";
        setIsTestCorrect(isPassed);
        setEvaluations((prev) => [
          ...prev,
          { testDetails: answersInput, isPassed },
        ]);
        setAlertMessage("Test result submitted successfully!");
        setResponseCode(response?.data?.responseCode)
        setShowSuccessAlert(true);
        setSubmissionError(false);
      } else {
        setSubmissionError(true);
        setAlertMessage(response?.data?.message || "An error occurred");
        setResponseCode(response?.data?.responseCode)
        setShowSuccessAlert(true);
      }
    } catch (error) {
      setSubmissionError(true);
      setIsTestCorrect(false);
      const errorMessage = error?.message || "An error occurred";
      setAlertMessage(errorMessage);
      setShowSuccessAlert(true);
    } finally {
      setIsEvaluationStarted(false);
    }
  };

  // const handleUploadPath = (data) => {
  //   setFileNamePath(data);
  // };

  const areAllQuestionsAnswered = () => {
    return questions.every((question) => {
      if (
        question.questionNumber === "Q4." &&
        level === "L2" &&
        selectedStaffRow.maru === null
      ) {
        return true;
      }
      return answersInput[question.questionNumber]?.radioInput;
    });
  };

  const countOptionOccurrences = (answers) => {
    const counts = { OK: 0, NG: 0, NA: 0 };
    Object.values(answers).forEach((answer) => {
      if (answer.radioInput) {
        counts[answer.radioInput] += 1;
      }
    });
    return counts;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingL0ToL3TestResult || loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!submissionError &&
        evaluations.length > 0 &&
        evaluations.map((evaluation, index) => {
          const optionCounts = countOptionOccurrences(evaluation.testDetails);
          return (
            <CustomAccordion
              key={index}
              maxSummaryHeight={"250px"}
              borderColor={evaluation.isPassed ? "green" : "red"}
              titleComponent={
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
                        {optionCounts.OK}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Typography variant="h4">NG</Typography>
                      <Typography variant="h4" sx={{ color: "red" }}>
                        {optionCounts.NG}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Typography variant="h4">NA</Typography>
                      <Typography variant="h4">{optionCounts.NA}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h4">Updated on: 24/08/2025</Typography>
                  </Box>
                </Box>
              }
            >
              <Box>
                {Object.values(evaluation.testDetails).map((question, idx) => (
                  <QuestionView
                    key={idx}
                    questionNumber={question.questionNumber}
                    question={question.question}
                    answer={question.radioInput}
                    remarks={question.observation || "No Remarks"}
                    station={question.station}
                    isMaru={index === 3 ? isMaru : false}
                  />
                ))}
              </Box>
            </CustomAccordion>
          );
        })}
      {!isEvaluationStarted && !isTestCorrect && !submissionError && (
        <ButtonAccordion
          titleComponent={
            <SecondaryButtonWithIcon
              onClick={() => setIsEvaluationStarted(true)}
            >
              Start Evaluation
            </SecondaryButtonWithIcon>
          }
        />
      )}
      {!isEvaluationStarted && submissionError && (
        <ButtonAccordion
          titleComponent={
            <SecondaryButtonWithIcon
              onClick={() => {
                setIsEvaluationStarted(true);
                setSubmissionError(false);
                setIsTestCorrect(false);
                setAnswersInput({});
              }}
            >
              Start Another Evaluation
            </SecondaryButtonWithIcon>
          }
        />
      )}
      {isEvaluationStarted && (
        <Box>
          <CustomAccordion
            maxSummaryHeight={"100%"}
            expanded={true}
            titleComponent={
              <Typography variant="h4">Start Evaluation</Typography>
            }
          >
            <Box>
              {questions.map((question, index) => (
                <JobTrainingTest
                  key={index}
                  questionNumber={question.questionNumber}
                  questionText={question.questionText}
                  options={question.options}
                  remarks={question.remarks}
                  handleSelect={handleSelect}
                  setFilePath={setFilePath}
                  setLoading={setLoading}
                  setFileName={setFileName}
                  level={level}
                  station={question.station}
                />
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "2rem",
                }}
              >
                <Box sx={{ width: "12rem" }}>
                  <TertiaryButton onClick={() => setIsEvaluationStarted(false)}>
                    Cancel
                  </TertiaryButton>
                </Box>
                <Box sx={{ width: "17rem", whiteSpace: "nowrap" }}>
                  <PrimaryButton
                    onClick={handleSubmit}
                    disabled={!areAllQuestionsAnswered()}
                  >
                    Submit Evaluation
                  </PrimaryButton>
                </Box>
              </Box>
            </Box>
          </CustomAccordion>
        </Box>
      )}
      {isTestCorrect && !submissionError && evaluations.length > 0 && (
        <Box
          sx={{
            width: level === "L1" ? "35rem" : "55rem",
            position: "fixed",
            bottom: "2%",
            right: "7rem",
          }}
        >
          <Footer
            handleNext={() => handleNext(level)}
            nextLabel={"Go To Next Level"}
            currentStep={0}
            nextDisabled={false}
          />
        </Box>
      )}
      <Box sx={{ width: "100%" }}>
        <SnackBar
          showSuccessAlert={showSuccessAlert}
          alertMessage={alertMessage}
          responseCode={responseCode}
          handleClose={() => setShowSuccessAlert(false)}
        />
      </Box>
    </Box>
  );
};

export default L1ToL2Training;
