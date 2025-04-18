import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Green, StatusAlertSevere } from "../../../../../Utilities/colors";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import { submitEvaluationTrainer } from "../../../../redux/Actions/ClassroomAction";
const StickyFooter = ({ onChange, evaluatedAnswers, total, metaData }) => {
  const dispatch = useDispatch();
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  useEffect(() => {
    let correct = 0;
    let incorrect = 0;
    for (const key in evaluatedAnswers) {
      if (evaluatedAnswers[key].Evaluate === "true") {
        correct++;
      } else {
        incorrect++;
      }
    }
    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    onChange(correct * 10);
  }, [evaluatedAnswers]);
  const handleEvaluationSubmit = () => {
    let parsedAnswers = evaluatedAnswers;
    let payload = {
      shopID: metaData?.shop_id,
      staffID: metaData?.staff_id,
      trainingID: metaData?.training_id,
      testType: metaData?.test_type === "pre" ? "Pre" : "Post",
      trainerResponse: Object.values(parsedAnswers).map((obj) => obj),
      correctAnswerCount: correctCount,
      wrongAnswerCount: incorrectCount,
    };
    dispatch(submitEvaluationTrainer(payload));
  };
  const timePadding = (number, width) => {
    return number.toString().padStart(width, "0");
  };

  return (
    <Box
      sx={{
        padding: "2rem 7rem 2rem 7rem",
        background: "#f4f5f8 !important",
        position: "fixed",
        bottom: "0px !important",
        width: "100% !important",
        display: "block !important",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <Typography variant="testPrimary" sx={{ color: Green }}>
              Correct Answer
            </Typography>
            <Typography variant="testPrimary" sx={{ fontWeight: 600 }}>
              {correctCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <Typography variant="testPrimary" sx={{ color: StatusAlertSevere }}>
              Incorrect Answer
            </Typography>
            <Typography variant="testPrimary" sx={{ fontWeight: 600 }}>
              {incorrectCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <Typography variant="testPrimary">Overall Score</Typography>
            <Typography variant="testPrimary" sx={{ fontWeight: 600 }}>
              {correctCount * 10}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "120px" }}>
          <PrimaryButton
            onClick={handleEvaluationSubmit}
            disabled={correctCount + incorrectCount !== total}
          >
            {correctCount + incorrectCount !== total
              ? `${timePadding(correctCount + incorrectCount, 2)}/${total}`
              : `Submit`}
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
};
export default StickyFooter;
