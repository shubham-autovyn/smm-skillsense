import { Box, Paper, Typography } from "@mui/material";
import Tick from "../../assets/icons/Tick.svg";
import crosss from "../../assets/icons/crosss.svg";

const CrossIcon = () => {
  return <img style={{ height: "2rem", width: "2rem" }} src={crosss} />;
};
const TickIcon = () => {
  return <img style={{ height: "2rem", width: "2rem" }} src={Tick} />;
};

const SubjectiveCard = ({
  question,
  answer,
  isCorrect,
  index,
  showAnswer = true,
}) => {
  return (
    <Box sx={{ marginBottom: "8px" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ padding: "16px", width: "100%" }}>
          <Box sx={{ marginBottom: "12px" }}>
            <Typography
              variant="testPrimary"
              sx={{ display: "flex", gap: "2rem" }}
            >
              {`Q${index + 1}`}.
              <Typography variant="testPrimary" sx={{ fontWeight: "600" }}>
                {question?.text.trim()}
              </Typography>
              {question?.images?.map((image, index) => (
                <img
                  style={{
                    height: "2.4rem",
                    width: "2.5rem",
                    marginLeft: "16px",
                    marginTop: "-0.6rem",
                    border: "1px solid red",
                  }}
                  src={image}
                />
              ))}
            </Typography>
          </Box>
          {showAnswer && (
            <Box>
              <Typography
                variant="testPrimary"
                sx={{ display: "flex", gap: "1.5rem" }}
              >
                Ans.
                <Typography variant="testPrimary">{answer}</Typography>
              </Typography>
            </Box>
          )}
        </Box>
        {showAnswer && (
          <>
            {isCorrect ? (
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#DFF6DD",
                  width: "100%",
                  padding: "2rem",
                }}
              >
                <TickIcon />
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    lineHeight: "1.6rem",
                    fontWeight: "400",
                    letterSpacing: "-0.35px",
                    color: "#58A55C",
                    marginLeft: "0.8rem",
                  }}
                >
                  Correct Answer!
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  backgroundColor: "#FDE7E9",
                  padding: "2rem",
                }}
              >
                <CrossIcon />
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    lineHeight: "1.6rem",
                    fontWeight: "400",
                    letterSpacing: "-0.35px",
                    color: "#D83B01",
                    marginLeft: "0.8rem",
                  }}
                >
                  Incorrect Answer!
                </Typography>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};
export default SubjectiveCard;
