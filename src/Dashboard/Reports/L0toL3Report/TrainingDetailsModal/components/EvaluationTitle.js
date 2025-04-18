import { Box, Typography } from "@mui/material";
import {
  StatusAlertSevere,
  StatusGreen,
} from "../../../../../utils/colors";
import Done from "../../../../../assets/icons/Done.svg";
import { getEpochToDDMMYY } from "../../../../../utils/helperFunctions";

const EvaluationTitle = ({ data, testStatus, index, level, attemptLength }) => {
  if (testStatus === "attempted") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100% !important",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: "1.5rem" }}>
          <Typography variant="h4">Evaluation {index}</Typography>
          <Typography variant="h4">|</Typography>
          <Typography variant="h4" color={StatusGreen}>
            {`${
              data?.slice(0, attemptLength).filter((x) => x?.OK !== undefined)
                .length
            } OK,`}
          </Typography>
          <Typography variant="h4" color={StatusAlertSevere}>
            {`${
              data?.slice(0, attemptLength).filter((x) => x?.NG !== undefined)
                .length
            } NG,`}
          </Typography>
          <Typography variant="h4">
            {`${
              data?.slice(0, attemptLength).filter((x) => x?.NA !== undefined)
                .length
            } NA`}
          </Typography>
          <Typography variant="h4">|</Typography>
          <Typography variant="h4">
            {`Evaluated on: ${getEpochToDDMMYY(
              parseInt(data?.[attemptLength]?.evaluatedOn)
            )}`}
          </Typography>
        </Box>
        <Box>
          {data?.testStatus === "pass" && (
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
  } else if (testStatus === "started") {
    return (
      <Box sx={{ display: "flex", gap: "1.5rem" }}>
        <Typography variant="h4">{`Evaluation ${level} Requirements`}</Typography>
      </Box>
    );
  } else {
    return null;
  }
};

export default EvaluationTitle;
