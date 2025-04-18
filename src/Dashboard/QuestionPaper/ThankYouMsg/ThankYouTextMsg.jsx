import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import React from "react";
import { MainBox, MsgBox, ThankYouText } from "./ThankYouTextMsg.style";

const ThankYouTextMsg = () => {
  return (
    <MainBox>
      <div>
        <MsgBox>
          <CheckCircleIcon
            sx={{ fontSize: 100, color: "green", marginBottom: 2 }}
          />
          <Typography variant="h2" gutterBottom>
            Thank you!
          </Typography>
          <ThankYouText variant="body1">
            Your submission has been recorded successfully!
          </ThankYouText>
        </MsgBox>
      </div>
    </MainBox>
  );
};

export default ThankYouTextMsg;
