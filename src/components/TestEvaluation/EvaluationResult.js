import { Box, Typography } from "@mui/material";
import LinkIcon from "../../assets/icons/LinkIcon.svg";
import LinkIconRed from "../../assets/icons/LinkIconRed.svg";
import LinkIconSecondary from "../../assets/icons/LinkIconSecondary.svg";
import {
  StatusAlertSevere,
  StatusAlertSevereBackground,
  StatusDoneBackground,
  StatusGreen,
} from "../../utils/colors";
const EvaluationResult = (props) => {
  //const testAttempts=props.attempts;
  //const showAttempts=props.showAttempts;
  //

  switch (props?.result?.toLowerCase()) {
    case "passed":
      return (
        <Box
          sx={{
            borderRadius: "8px",
            backgroundColor: StatusDoneBackground,
            padding: "0.6rem 1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            minWidth: "57px",
            width: "fit-content",
            cursor: "pointer",
          }}
          onClick={() => (props.handleTest ? props.handleTest() : null)}
        >
          <Typography variant="body1" color={StatusGreen}>
            Pass
          </Typography>
          {parseInt(props?.attempts) > 1 && (
            <Typography variant="body1" color={StatusGreen}>
              {props?.attempts}
            </Typography>
          )}
          <img
            alt="link"
            src={LinkIcon}
            style={{
              height: "1.4rem",
              width: "1.4rem",
            }}
          />
        </Box>
      );
    case "failed":
      return (
        <Box
          sx={{
            borderRadius: "8px",
            backgroundColor: StatusAlertSevereBackground,
            padding: "0.6rem 1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            minWidth: "57px",
            width: "fit-content",
            cursor: "pointer",
          }}
          onClick={() => (props.handleTest ? props.handleTest() : null)}
        >
          <Typography variant="body1" color={StatusAlertSevere}>
            Fail
          </Typography>
          {parseInt(props?.attempts) > 1 && (
            <Typography variant="body1" color={StatusAlertSevere}>
              {props?.attempts}
            </Typography>
          )}
          <img
            alt="link"
            src={LinkIconRed}
            style={{
              height: "1.4rem",
              width: "1.4rem",
            }}
          />
        </Box>
      );
    case "pending":
      return (
        <Box
          sx={{
            borderRadius: "8px",
            backgroundColor: "#F1BE424A",
            padding: "0.6rem 1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            minWidth: "57px",
            width: "fit-content",
            cursor: "pointer",
          }}
          onClick={() => (props.handleTest ? props.handleTest() : null)}
        >
          <Typography variant="body1">Pending Evaluation</Typography>
          {/* {parseInt(props?.attempts) > 1 && (
            <Typography variant="body1">{props?.attempts}</Typography>
          )} */}
          <img
            alt="link"
            src={LinkIconSecondary}
            style={{
              height: "1.4rem",
              width: "1.4rem",
            }}
          />
        </Box>
      );
    case "na":
      return "NA";
    default:
      return "-";
  }
};
export default EvaluationResult;
