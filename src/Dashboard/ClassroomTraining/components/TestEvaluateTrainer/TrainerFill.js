import {
  Box,
  ThemeProvider,
  Typography,
  Paper,
  Toolbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { SMMTheme } from "../../../../Theme/theme";
import TestHeader from "../../../ClassroomTraining/components/TestView/TestHeader";
import useStyles from "../../../styles";
import SubjectiveTest from "../../../../components/TestAttempt/SubjectiveTest";
import { useState, useEffect } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Logo from "../../../../assets/icons/Logo.svg";
import PrimaryButton from "../../../../../Utilities/Buttons/PrimaryButton/PrimaryButton";
import Traingle from "../../../../assets/icons/Triangle.svg";
import ObjectiveTest from "../../../../components/TestAttempt/ObjectiveTest";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchTrainerTestData,
  submitTestData,
} from "../../../../redux/Actions/ClassroomAction";
import {
  getTrainerTestData,
  getTrainerTestDataLoading,
  getSubmitTestData,
  getSubmitTestDataLoading,
} from "../../../../redux/Reducers/SMMClassroomReducer";
import { getShop } from "../../../../redux/Reducers/SMMShopReducer";
import { getTrainingBatchId } from "../../../../redux/Reducers/SMMClassroomReducer";
import SucessPage from "../../../../components/TestEvaluation/SucessPage";
import { useNavigate } from "react-router-dom";
import SecondaryButton from "../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton";
const TrainerFill = ({ data, handleTestComplete }) => {
  const classes = useStyles();
  const shop = useSelector(getShop);
  const { trainingBatchId } = useSelector(getTrainingBatchId);
  const dispatch = useDispatch();
  const [testData, setTestData] = useState({});
  const [searchParams] = useSearchParams();
  const trainerTestData = useSelector(getTrainerTestData);
  const loading = useSelector(getTrainerTestDataLoading);
  const testSubmitResponse = useSelector(getSubmitTestData);
  const submitDataLoading = useSelector(getSubmitTestDataLoading);
  const [testQuestions, setTestQuestions] = useState([]);
  const [answersInput, setAnswersInput] = useState({});
  const [testDetails, setTestDetails] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [queryData,setQueryData]=useState({});
  const navigate = useNavigate();
  const classifyDocument = (input) =>
    trainerTestData?.topicDetails?.documentClassification?.toLowerCase() ===
    input;
  useEffect(() => {
    if(shop?.id===undefined){
      navigate("/SMM");
    }
    let testId = searchParams.get("test");
    const parsedData = JSON.parse(sessionStorage.getItem(testId));
    setQueryData(parsedData);
    if (parsedData?.masterTopicId) {
      const payload = {
        shop_id: parsedData.shop_id,
        master_topic_id: parsedData.masterTopicId,
        FilledBy: "Trainer",
      };
      dispatch(fetchTrainerTestData(payload));
    }
  }, []);

  useEffect(() => {
    const testId = searchParams.get("test");
    if (testId) {
      const storedTestData = sessionStorage.getItem(testId);
      if (storedTestData) {
        setTestData(JSON.parse(storedTestData));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (trainerTestData?.questions) {
      setTestQuestions(
        trainerTestData?.questions.sort(
          (a, b) => a.questionNumber - b.questionNumber
        )
      );
    }
    if (trainerTestData?.topicDetails) {
      setTestDetails(trainerTestData?.topicDetails);
    }
  }, [trainerTestData]);

  useEffect(() => {
    if (testSubmitResponse === "Success") {
      navigate(queryData?.path, {
        state: {
          trainingBatchId:trainingBatchId,
          stepValue: queryData?.path==="/SMM/NewRefresher" || queryData?.path==="/SMM/NewDepartment" ?2:1,
       //   attendeeType: item.attendeeType,
        },
      });
      // setIsSubmit(true);
    }
  }, [testSubmitResponse]);
  const handleCancel=()=>{
    navigate(queryData?.path, {
      state: {
        trainingBatchId:trainingBatchId,
        stepValue: queryData?.path==="/SMM/NewRefresher" || queryData?.path==="/SMM/NewDepartment" ? 2:1,
     //   attendeeType: item.attendeeType,
      },
    });
  }

  const getParsedQuestion = (q) => {
    let img = q?.images.map((obj) => Object.keys(obj)).flat();
    return { Text: q?.text, Images: img };
  };
  const getParsedOptions = (opt) => {
    let tempOption = opt.map((item) => getParsedQuestion(item));
    return tempOption;
  };
  const handleSubjectiveAnswers = (data, val) => {
    setAnswersInput((prev) => {
      return {
        ...prev,
        ...{
          [data?.questionId]: {
            QuestionId: data?.questionId,
            QuestionDetail: getParsedQuestion(data?.question),
            QuestionType: data?.questionType,
            UserInput: val,
          },
        },
      };
    });
  };
  const handleObjectiveAnswers = (data, val) => {
    setAnswersInput((prev) => {
      return {
        ...prev,
        ...{
          [data?.questionId]: {
            QuestionId: data?.questionId,
            QuestionDetail: getParsedQuestion(data?.question),
            options: getParsedOptions(data?.options),
            QuestionType: data?.questionType,
            UserInput: parseInt(val) + 1,
          },
        },
      };
    });
  };
  const handleSubjectiveRemove = (data) => {
    const removeObj = { ...answersInput };
    delete removeObj[data?.questionId];
    setAnswersInput(removeObj);
  };
  const handleObjectiveSubmit = () => {
    let parsedAnswers = answersInput;
    let payload = {
      shopID: testData?.shop_id,
      batchID: testData?.trainingBatchId,
      trainingType: trainerTestData?.topicDetails?.trainingType,
      staffID: testData?.staff_id,
      trainingID: testData?.training_id,
      testType: testData?.test_type === "pre" ? "Pre" : "Post",
      masterTopicID: testData?.masterTopicId,
      submittedResponse: Object.values(parsedAnswers).map((obj) => obj),
    };
    dispatch(submitTestData(payload));
  };
  const handleSubjectiveSubmit = () => {
    let parsedAnswers = answersInput;
    let payload = {
      shopID: testData?.shop_id,
      batchID: testData?.trainingBatchId,
      staffID: testData?.staff_id,
      trainingType: trainerTestData?.topicDetails?.trainingType,
      trainingID: testData?.training_id,
      testType: testData?.test_type === "pre" ? "Pre" : "Post",
      masterTopicID: testData?.masterTopicId,
      submittedResponse: Object.values(parsedAnswers).map((obj) => obj),
    };
    dispatch(submitTestData(payload));
  };
  const timePadding = (number, width) => {
    return number.toString().padStart(width, "0");
  };
  return (
    <ThemeProvider theme={SMMTheme}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          top: "0rem",
          background: "transparent",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <MuiAppBar sx={{ backgroundColor: "white", height: "44px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "2rem",
              }}
            >
              <img
                style={{ height: "2rem", width: "18.6rem" }}
                alt="MSIL Logo"
                src={Logo}
              />
            </Box>
          </MuiAppBar>
        </Box>
        {isSubmit ? (
          <SucessPage />
        ) : (
          <Box className={classes["outer-container"]}>
            <Box sx={{ marginBottom: "16px" }}>
              <TestHeader
                testName={trainerTestData?.topicDetails?.testName}
                testDescription={trainerTestData?.topicDetails?.description}
                userDetails={`${testData?.staffName} | ${testData?.staff_id} | ${testData?.attendee_level}`}
                workArea={`${testData?.area},${testData?.group}, ${testData?.line}`}
                trainer={testData?.trainerName}
                status={"Pending"}
                dateTime={trainerTestData?.currentTime}
              />
            </Box>

            {testQuestions.map((question, index) =>
              question?.questionType.toLowerCase() === "multiple choice" ? (
                <ObjectiveTest
                  key={index}
                  count={index}
                  data={question}
                  handleSelect={handleObjectiveAnswers}
                />
              ) : (
                <SubjectiveTest
                  key={index}
                  count={index}
                  data={question}
                  handleSelect={handleSubjectiveAnswers}
                  handleRemove={handleSubjectiveRemove}
                />
              )
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "1.6rem",
              }}
            >
              <Box>
                <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
              </Box>
              <Box>
                {testQuestions.length > 0 &&
                testQuestions[0].questionType === "Subjective" ? (
                  <PrimaryButton
                    onClick={handleSubjectiveSubmit}
                    disabled={
                      Object.keys(answersInput).length !== testQuestions.length
                    }
                  >
                    {Object.keys(answersInput).length !== testQuestions.length
                      ? `${timePadding(Object.keys(answersInput).length, 2)}/${
                          testQuestions.length
                        }`
                      : "Submit"}
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    onClick={handleObjectiveSubmit}
                    disabled={
                      Object.keys(answersInput).length !== testQuestions.length
                    }
                  >
                    {Object.keys(answersInput).length !== testQuestions.length
                      ? `${timePadding(Object.keys(answersInput).length, 2)}/${
                          testQuestions.length
                        }`
                      : "Submit"}
                  </PrimaryButton>
                )}
              </Box>
            </Box>
            {(loading || submitDataLoading) && (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading || submitDataLoading}
              >
                <CircularProgress className="" color="inherit" />
              </Backdrop>
            )}
            <Box>
              <Paper sx={{ height: "62px", backgroundColor: "#E6E9F0" }}>
                <Toolbar
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "12px" }}>
                      {trainerTestData?.topicDetails?.controlNo}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.8rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        paddingLeft: "4rem",
                      }}
                    >
                      <Typography variant="m4normal">
                        Document Classification:
                      </Typography>
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Typography
                          variant={
                            classifyDocument("secret") ? "m4" : "m4normal"
                          }
                        >
                          Secret [
                          {classifyDocument("secret") ? (
                            <>&#8226;</>
                          ) : (
                            <>&nbsp;&nbsp;</>
                          )}
                          ]
                        </Typography>
                        <Typography
                          variant={
                            classifyDocument("confidential") ? "m4" : "m4normal"
                          }
                        >
                          Confidential [
                          {classifyDocument("confidential") ? (
                            <>&#8226;</>
                          ) : (
                            <>&nbsp;&nbsp;</>
                          )}
                          ]
                        </Typography>
                        <Typography
                          variant={
                            classifyDocument("internal") ? "m4" : "m4normal"
                          }
                        >
                          Internal [
                          {classifyDocument("internal") ? (
                            <>&#8226;</>
                          ) : (
                            <>&nbsp;&nbsp;</>
                          )}
                          ]
                        </Typography>
                        <Typography
                          variant={
                            classifyDocument("public") ? "m4" : "m4normal"
                          }
                        >
                          Public [
                          {classifyDocument("public") ? (
                            <>&#8226;</>
                          ) : (
                            <>&nbsp;&nbsp;</>
                          )}
                          ]
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: "left", height: "14px" }}>
                      <Typography sx={{ fontSize: "12px" }}>
                        User department shall ensure the classification based on
                        Information Security policy of MSIL
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      backgroundImage: `url(${Traingle})`,
                      width: "4rem",
                      height: "4rem",
                      backgroundRepeat: "no-repeat",
                      alignItems: "center",
                      justifyContent: "center",
                      pb: 0.6,
                      display: "flex",
                    }}
                  >
                    <Typography>
                      {trainerTestData?.topicDetails?.revision_no}
                    </Typography>
                  </Box>
                </Toolbar>
              </Paper>
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};
export default TrainerFill;
