import { Box, Paper, ThemeProvider, Toolbar, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import * as XLSX from "xlsx";
import Logo from "../../../../assets/icons/Logo.svg";
import Traingle from "../../../../assets/icons/Triangle.svg";
import SubjectiveCard from "../../../../components/TestEvaluation/SubjectiveCard";
import Toggle from "../../../../components/Toggle/ToggleButton";
import { fetchTestView } from "../../../../redux/Actions/ClassroomAction";
import {
  getTestViewData,
  getTestViewLoading,
} from "../../../../redux/Reducers/SMMClassroomReducer";
import { getShop } from "../../../../redux/Reducers/SMMShopReducer";
import { SMMTheme } from "../../../../Theme/theme";
import useStyles from "../../../styles";
import TestHeader from "./TestHeader";

const SubjectiveTestView = () => {
  const classes = useStyles();
  const [activeFilter, setActiveFilter] = useState("All");
  const shop = useSelector(getShop);
  const [searchParams] = useSearchParams();
  const [selectedAttempt, setSelectedAttempt] = useState(0);
  const dispatch = useDispatch();
  const testViewData = useSelector(getTestViewData);
  const loading = useSelector(getTestViewLoading);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    let testId = searchParams.get("test");
    const parsedData = JSON.parse(sessionStorage.getItem(testId));
    if (parsedData?.shop_id) {
      const payload = {
        shop_id: parsedData.shop_id,
        staff_id: parsedData.staff_id,
        training_id: parsedData.training_id,
        test_type: parsedData.test_type,
      };
      dispatch(fetchTestView(payload));
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
  const updatedAnswers = answers.map((answer, index) => ({
    ...answer,
    questionNumber: `Q-${index + 1}`,
    isCorrect: answer?.isCorrect,
  }));

  const filteredAnswers = () => {
    switch (activeFilter) {
      case "Correct":
        return updatedAnswers.filter((answer) => answer?.isCorrect);
      case "Incorrect":
        return updatedAnswers.filter((answer) => !answer?.isCorrect);
      default:
        return updatedAnswers;
    }
  };
  const totalCount = updatedAnswers.length;
  const correctCount = updatedAnswers.filter(
    (answer) => answer.isCorrect
  ).length;
  const incorrectCount = totalCount - correctCount;

  const result = testViewData?.staffTestData;

  useEffect(() => {
    if (result && findAttempt(result?.attempts)) {
      const res = findAttempt(result?.attempts)?.answers || [];
      setAnswers(res);
    }
  }, [result, selectedAttempt]);

  const classifyDocument = (input) =>
    result?.documentClassification?.toLowerCase() === input;

  const handleSelectChange = (event) => {
    setSelectedAttempt(event.target.value);
  };

  useEffect(() => {
    if (result?.attempts && result?.attempts.length > 0) {
      const sortedAttempts = [...result?.attempts].sort(
        (a, b) => b.attemptNo - a.attemptNo
      );
      setSelectedAttempt(sortedAttempts[0].attemptNo);
    }
  }, [result?.attempts]);

  const getFormattedEpocDate = (inputDate) => {
    if (Number.isInteger(inputDate)) {
      return dayjs(inputDate * 1000).format("DD/MM/YY; HH:mm");
    }
    return "-";
  };

  const downloadExcel = () => {
    if (result) {
      let testView = {
        "Name of the test paper": result?.testName,
        "Operator name": result?.staffName,
        "Employee ID": result?.staffId,
        "Level of the operator": result?.level,
        "Trainer name": result?.trainerName,
        "Trainer employee ID": result?.trainerId,
        "Attempt no.": findAttempt(result?.attempts)?.attemptNo,
        "Date and time": getFormattedEpocDate(
          findAttempt(result?.attempts)?.timestamp
        ),
        "Document control number": result?.controlNo,
        "Document revision number": result?.revision,
      };
      const parsedData = findAttempt(result?.attempts)?.answers.map(
        (answer) => {
          let data = {
            ...testView,
            Question: answer?.questionText?.text || "",
            Answer: answer?.answerText?.text || "",
          };
          data = {
            ...data,
          };
          data["Judgement"] = answer.isCorrect ? "correct" : "incorrect";
          data["Overall status"] = findAttempt(result?.attempts)?.attemptResult;
          return data;
        }
      );

      const worksheet = XLSX.utils.json_to_sheet(parsedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const fileName = `${result?.testName}_${result?.staffName}_${
        result?.staffId
      }_${findAttempt(result?.attempts)?.attemptNo}_${dayjs(new Date()).format(
        "DDMMYY_hhmmss"
      )}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    }
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
        {!loading && (
          <Box className={classes["outer-container"]}>
            <Box sx={{ marginTop: "0.8rem" }}>
              <TestHeader
                onDownload={downloadExcel}
                testName={result?.testName}
                testDescription={result?.testDescription}
                attempts={result?.attempts}
                userDetails={`${result?.staffName} | ${result?.staffId} | ${result?.level}`}
                workArea={`${result?.area},${result?.group}, ${result?.line}`}
                trainer={result?.trainerName}
                testScore={findAttempt(result?.attempts)?.marksObtained}
                totalMarks={totalCount * 10}
                status={findAttempt(result?.attempts)?.attemptResult}
                dateTime={findAttempt(result?.attempts)?.timestamp}
                selectedAttempt={selectedAttempt}
                handleSelectChange={handleSelectChange}
              />
              <Box sx={{ marginBottom: "16px", marginTop: "16px" }}>
                <Paper sx={{ backgroundColor: "white", padding: "1rem" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.2rem",
                    }}
                  >
                    <Typography sx={{ fontWeight: "600" }}>
                      Filter by:
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <Toggle
                        selected={activeFilter}
                        labels={[`All`, `Correct`, `Incorrect`]}
                        onChange={handleActiveQuestions}
                        totalCount={totalCount}
                        correctCount={correctCount}
                        incorrectCount={incorrectCount}
                      />
                    </Box>
                  </Box>
                </Paper>
              </Box>
              {filteredAnswers() &&
                filteredAnswers().map((answer, index) =>
                  answer?.questionText?.text ? (
                    <SubjectiveCard
                      key={index}
                      questionNumber={answer?.questionNumber}
                      question={answer?.questionText}
                      answer={answer?.userInput}
                      isCorrect={answer?.isCorrect}
                    />
                  ) : null
                )}
              <Box>
                <Paper sx={{ height: "62px", backgroundColor: "#E6E9F0" }}>
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
                      <Typography>{result?.revision}</Typography>
                    </Box>
                  </Toolbar>
                </Paper>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default SubjectiveTestView;
