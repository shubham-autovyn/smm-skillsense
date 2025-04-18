import { Box, Skeleton, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAccordion from "../../../../../components/Accordion/CustomAccordion";
import { fetchOjtTestData } from "../../../../../redux/Actions/JobTrainingAction";
import QuestionView from "../../../../../components/TestEvaluation/QuestionView";
import {
  getOjtTestData,
  getOjtTestDataLoading,
} from "../../../../../redux/Reducers/SMMJobTrainingReducer";
import EvaluationTitle from "./EvaluationTitle";
import useStyles from "../../../../styles";
import { SMMTheme } from "../../../../../Theme/theme";

const L0ToL1TrainingDetail = ({ trainingDetailsData, level }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const testData = useSelector(getOjtTestData);
  const testDataLoading = useSelector(getOjtTestDataLoading);

  useEffect(() => {
    if (trainingDetailsData?.ojt_training_id) {
      const payload = {
        shop_id: trainingDetailsData?.shop_id,
        ojt_training_id: trainingDetailsData?.ojt_training_id,
        staff_id: trainingDetailsData?.staff_id,
        level: level,
        station_name: trainingDetailsData?.station_name,
      };
      dispatch(fetchOjtTestData(payload));
    }
  }, [trainingDetailsData]);

  const getOkNgNa = (val) => {
    if (val?.OK) {
      return "OK";
    } else if (val?.NG) {
      return "NG";
    } else return "NA";
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

  const getQuestionNumberL3 = (index) => {
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
    <ThemeProvider theme={SMMTheme}>
      <Box sx={{ overflowY: "scroll", marginTop: "1rem !important" }}>
        {testDataLoading ? (
          <Skeleton
            className={classes["details-table-dimensions"]}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <Box
            className={classes["details-table-dimensions"]}
            sx={{ mt: "0 !important" }}
          >
            {Object.keys(testData)?.length !== 0 &&
              testData[0]?.testDetails?.map((attempt, index) => {
                const attemptLength = attempt?.length - 1;
                return (
                  <CustomAccordion
                    key={index}
                    maxSummaryHeight={"250px"}
                    borderColor={
                      attempt
                        ?.slice(0, attemptLength)
                        .filter((x) => x?.NG !== undefined).length !== 0
                        ? "red"
                        : "green"
                    }
                    titleComponent={
                      <EvaluationTitle
                        data={attempt}
                        testStatus={"attempted"}
                        index={index + 1}
                        level={level}
                        attemptLength={attemptLength}
                      />
                    }
                  >
                    <Box>
                      {attempt
                        ?.slice(0, attemptLength)
                        .map((question, index) => {
                          return (
                            <QuestionView
                              key={index}
                              questionNumber={
                                level === "L3"
                                  ? getQuestionNumberL3(index)
                                  : getQuestionNumber(index)
                              }
                              question={question?.Question}
                              answer={getOkNgNa(question)}
                              remarks={question["Observation remarks"]}
                              station={question.station}
                              isMaru={
                                index >= 3 &&
                                trainingDetailsData?.station_type !== "NA" &&
                                level !== "L1"
                                  ? trainingDetailsData?.station_type
                                  : false
                              }
                              filePath={
                                attempt?.length > attemptLength
                                  ? attempt[attemptLength]
                                  : {}
                              }
                            />
                          );
                        })}
                    </Box>
                  </CustomAccordion>
                );
              })}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};
export default L0ToL1TrainingDetail;
