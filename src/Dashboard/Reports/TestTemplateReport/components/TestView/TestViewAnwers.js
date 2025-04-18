import {
  Backdrop,
  Box,
  CircularProgress,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Logo from "../../../../../assets/icons/Logo.svg";
import Traingle from "../../../../../assets/icons/Triangle.svg";
import QuestionCard from "../../../../../components/TestEvaluation/QuestionCard";
import SubjectiveCard from "../../../../../components/TestEvaluation/SubjectiveCard";
import Toggle from "../../../../../components/Toggle/ToggleButton";
import { fetchTrainerTestData } from "../../../../../redux/Actions/ClassroomAction";
import {
  getTestViewLoading,
  getTrainerEvaluationLoading,
  getTrainerTestData,
} from "../../../../../redux/Reducers/SMMClassroomReducer";
import { SMMTheme } from "../../../../../Theme/theme";
import useStyles from "../../../../styles";
import TestHeader from "./TestHeader";

const TestView = () => {
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const [selectedAttempt, setSelectedAttempt] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const dispatch = useDispatch();
  const testViewData = useSelector(getTrainerTestData);
  const loading = useSelector(getTestViewLoading);
  const trainerEvaluationLoading = useSelector(getTrainerEvaluationLoading);

  const classifyDocument = (input) =>
    result?.documentClassification?.toLowerCase() === input;

  useEffect(() => {
    let testId = searchParams.get("test");
    const parsedData = JSON.parse(sessionStorage.getItem(testId));
    if (parsedData?.shop_id) {
      const payload = {
        shop_id: parsedData.shop_id,
        master_topic_id: parsedData.masterTopicId,
        FilledBy: parsedData.FilledBy,
        templateRequired: parsedData?.templateRequired,
      };
      dispatch(fetchTrainerTestData(payload));
    }
  }, []);

  const findAttempt = (domain) => {
    const attempt = domain?.find((x) => x.attemptNo === selectedAttempt);
    return attempt;
  };

  const handleActiveQuestions = (val) => {
    if (val !== null) {
      setActiveFilter(val);
    }
  };

  const result = testViewData?.topicDetails;

  useEffect(() => {
    if (result?.attempts && result?.attempts.length > 0) {
      const sortedAttempts = [...result?.attempts].sort(
        (a, b) => b.attemptNo - a.attemptNo
      );
      setSelectedAttempt(sortedAttempts[0].attemptNo);
    }
  }, [result?.attempts]);

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
          <MuiAppBar sx={{ backgroundColor: "white", height: "50px" }}>
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
        <Box>
          <Box className={classes["outer-container"]}>
            <Box sx={{ marginTop: "0.8rem" }}>
              <TestHeader
                testName={result?.testName}
                testDescription={result?.description}
                passingScore={Math.trunc(
                  testViewData?.questions?.length * result?.passingScore * 10
                )}
              />
              <Box sx={{ marginBottom: "16px", marginTop: "16px" }}>
                <Typography variant="h4">{`Total Questions ${testViewData?.questions?.length}`}</Typography>
              </Box>
              {testViewData?.questions
                ?.sort((a, b) => a?.questionNumber - b?.questionNumber)
                ?.map((answer, index) =>
                  answer?.questionType.toLowerCase() === "multiple choice" ? (
                    <QuestionCard
                      key={index}
                      questionNumber={`Q${index + 1}`}
                      question={answer?.question}
                      options={answer?.options}
                      selectedAnswer={answer?.userInput}
                      correctAnswer={answer?.correctOption}
                      isCorrect={answer?.isCorrect}
                    />
                  ) : (
                    <SubjectiveCard
                      key={index}
                      index={index}
                      questionNumber={index + 1}
                      question={answer?.question}
                      answer={answer?.userInput}
                      isCorrect={answer?.isCorrect}
                      showAnswer={false}
                    />
                  )
                )}
              <Box>
                <Paper
                  sx={{
                    height: `${
                      findAttempt(
                        result?.attempts
                      )?.attemptResult?.toLowerCase() === "pending"
                        ? "123px"
                        : "62px"
                    }`,
                    backgroundColor: "#E6E9F0",
                  }}
                >
                  <Toolbar
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: "12px" }}>
                        {result?.controlNo}
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
                              classifyDocument("confidential")
                                ? "m4"
                                : "m4normal"
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
                          User department shall ensure the classification based
                          on Information Security policy of MSIL
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        margin: "5px",
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
                      <Typography sx={{ pr: "2px" }}>
                        {result?.revision_no}
                      </Typography>
                    </Box>
                  </Toolbar>
                </Paper>
              </Box>
            </Box>
          </Box>
          {(loading || trainerEvaluationLoading) && (
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={loading || trainerEvaluationLoading}
            >
              <CircularProgress className="" color="inherit" />
            </Backdrop>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TestView;
