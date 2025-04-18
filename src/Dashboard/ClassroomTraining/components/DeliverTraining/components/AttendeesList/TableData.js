import { Box, TableCell, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Fragment } from "react";
import EvaluationResult from "../../../../../../components/TestEvaluation/EvaluationResult";

const TableData = ({
  row = {},
  isPreTest,
  handleTest,
  topicStatus,
  topicFilledBy,
  attemptCount,
  isPostTraining,
  postTestStatus,
}) => {
  const getResult = (status) => {
    switch (status) {
      case "Pass":
        return "passed";
      case "Fail":
        return "failed";
      case "Pending for evaluation":
        return "pending";
      case "Pending":
        return "pending";
      default:
        return "";
    }
  };

  const RenderNoAttempt = () => {
    return (
      <Box
        sx={{
          borderRadius: "8px",
          padding: "0.6rem 1rem",
          minWidth: "57px",
          width: "fit-content",
          bgcolor: "#E6E9F0",
          cursor: "pointer",
        }}
      >
        <Typography variant="body1"> Not Attempted</Typography>
      </Box>
    );
  };

  const date = dayjs(row.dob, "DD-MM-YYYY").format("DD/MM/YYYY");
  const dateValue =
    row.dob && date === "Invalid Date" ? row.dob?.replaceAll("-", "/") : date;
  return (
    <Fragment>
      <TableRow>
        <TableCell>{row?.staffId}</TableCell>
        <TableCell>{row.staffName}</TableCell>
        <TableCell>{row.attendeeLevel}</TableCell>
        <TableCell>{dateValue || ""}</TableCell>
        {isPreTest && (
          <TableCell>
            {row?.preTestAttempt ? (
              <EvaluationResult
                result={getResult(row?.preTestStatus)}
                handleTest={() =>
                  handleTest("pre", getResult(row?.preTestStatus))
                }
              />
            ) : topicStatus === "STARTED" && topicFilledBy === "Trainer" ? (
              <EvaluationResult
                result={"Pending"}
                attempts={row?.preTestAttempt}
                handleTest={() => handleTest("pre", "pending")}
              />
            ) : (
              <RenderNoAttempt />
            )}
          </TableCell>
        )}
        <TableCell>
          {row?.postTestAttempt && topicFilledBy === "Trainee" ? (
            <EvaluationResult
              result={getResult(row?.postTestStatus)}
              attempts={row?.postTestAttempt}
              handleTest={() =>
                handleTest("post", getResult(row?.postTestStatus))
              }
            />
          ) : (isPostTraining &&
            topicStatus === "STARTED" &&
            postTestStatus === "STARTED" &&
            topicFilledBy === "Trainer") ||
            topicStatus === "COMPLETED"  ? (
            (attemptCount === row?.postTestAttempt &&
              row?.postTestStatus !== "Pass") ||
            row?.postTestAttempt === null ? (
              <EvaluationResult
                result={"Pending"}
                attempts={row?.postTestAttempt}
                handleTest={() => handleTest("post", "pending")}
              />
            ) : (
              <EvaluationResult
                result={getResult(row?.postTestStatus)}
                attempts={row?.postTestAttempt}
                handleTest={() =>
                  handleTest("post", getResult(row?.postTestStatus))
                }
              />
            )
          ) : (
            <RenderNoAttempt />
          )}
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
export default TableData;
