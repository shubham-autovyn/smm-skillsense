import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../../../../../../services/Authorization/AuthorizationService";
import TertiaryButton from "../../../../../../../../Utilities/Buttons/TertiaryButton/TertiaryButton";
import {
  StatusAlertSevere,
  StatusGreen,
} from "../../../../../../../../Utilities/colors";
import Done from "../../../../../../../assets/icons/Done.svg";
import ButtonAccordion from "../../../../../../../components/Accordion/ButtonAccordion";
import CustomAccordion from "../../../../../../../components/Accordion/CustomAccordion";
import SecondaryButtonWithIcon from "../../../../../../../components/Button/SecondaryButtonWithIcon";
import Footer from "../../../../../../../components/Footer";
import PrimaryButton from "../../../../../../../components/PrimaryButton/PrimaryButton";
import JobTrainingTest from "../../../../../../../components/TestAttempt/JobTrainingTest";
import QuestionView from "../../../../../../../components/TestEvaluation/QuestionView";
import { navigateNextLevel } from "../../../../../../../redux/Actions/JobTrainingAction";
import { getShop } from "../../../../../../../redux/Reducers/SMMShopReducer";
import { getEpochToDDMMYY } from "../../../../../../../utils/helperFunctions";
const L1ToL2Training = ({
  handlePrev,
  handleNext,
  testData,
  handleSubmitTest,
  level,
  selectedStaffRow,
  isMaru,
}) => {
  const [isEvaluationStarted, setIsEvaluationStarted] = useState(true);
  const [isL1Completed, setisL1Completed] = useState(false);
  const [answersInput, setAnswersInput] = useState({});
  const [fileNamePath, setFileNamePath] = useState({});
  const limit = isMaru === null ? 3 : 4;
  const shop = useSelector(getShop);
  const dispatch = useDispatch();
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
  const handleNextClick = () => {
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
        shopID: selectedStaffRow?.shopId,
        shopName: shop?.shop_name,
        staffID: selectedStaffRow?.staffID,
        staffName: selectedStaffRow?.staffName,
        userID: userId,
        groupName: selectedStaffRow?.groupName,
        lineName: selectedStaffRow?.lineName,
        areaName: selectedStaffRow?.areaName,
        stationName: selectedStaffRow?.stationName,
        OJTTrainingID: selectedStaffRow?.ID,
        currentLevel: level === "L1" ? 0 : 1,
        level: level,
        maru: selectedStaffRow?.maru,
      };
      dispatch(navigateNextLevel(payload));
      handleNext();
    }
  };
  const getQuestions = (level, isMaru = false) => {
    switch (level) {
      case "L2":
        return isMaru
          ? [
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
                  "Whether Operator MOS/WIS training Feedback form filled ?",
                options: ["OK", "NG", "NA"],
                remarks: "",
                station: isMaru,
              },
            ]
          : [
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
            // station: 'Maru A'
          },
        ];
      default:
        return [];
    }
  };

  const getEvaluationTitle = (data) => {
    if (data.testStatus === "attempted") {
      return (
        <Box sx={{ display: "flex", gap: "60rem" }}>
          <Box sx={{ display: "flex", gap: "1.5rem" }}>
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
                <Typography variant="h4">{`${level} Achieved`}</Typography>
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
    let okCount = 0;
    let ngCount = 0;
    if (Object.keys(answersInput)?.length !== limit) {
      return false;
    }
    for (let key in answers) {
      if (
        answers[key].radioInput === undefined ||
        (answers[key].radioInput === "NG" && answers[key].onbservation === "")
      ) {
        return false;
      }
      if (answers[key].radioInput === "OK") {
        okCount++;
      } else if (answers[key].radioInput === "NG") {
        ngCount++;
      }
    }
    return okCount || ngCount;
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
        return "Q4.";
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
                    isMaru={index === 3 ? isMaru : false}
                    filePath={attempt?.length > limit ? attempt[limit] : {}}
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
                station={question.station}
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
                onClick={() =>
                  handleSubmitTest(answersInput, level, fileNamePath)
                }
                disabled={!checkNgObservation(answersInput)}
              >
                Submit Evaluation
              </PrimaryButton>
            </Box>
          </Box>
        </CustomAccordion>
      )}
      {!isEvaluationStarted && (
        <ButtonAccordion
          titleComponent={
            <SecondaryButtonWithIcon onClick={handleStartEvaluation}>
              Start Another Evaluation
            </SecondaryButtonWithIcon>
          }
        />
      )}
      <Box
        sx={{
          width: level === "L1" ? "35rem" : "55rem",
          position: "fixed",
          bottom: "2%",
          right: "7rem",
        }}
      >
        {level === "L1" ? (
          <Footer
            handleNext={() => handleNext(level)}
            nextLabel={"Go To Next Level"}
            currentStep={0}
            nextDisabled={
              Array.isArray(testData)
                ? testData[0]?.testStatus !== "pass"
                : true
            }
          />
        ) : (
          <Footer
            prevLabel={"Previous Level"}
            handlePrev={handlePrev}
            handleNext={() => handleNext(level)}
            saveLabel={"Go To Next Level"}
            currentStep={2}
            nextDisabled={
              Array.isArray(testData)
                ? testData[0]?.testStatus !== "pass"
                : true
            }
          />
        )}
      </Box>
    </Box>
  );
};
export default L1ToL2Training;
