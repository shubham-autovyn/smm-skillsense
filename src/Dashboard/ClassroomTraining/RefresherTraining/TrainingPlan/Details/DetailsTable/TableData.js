import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { Fragment } from "react";

import { getEpochToDDMMYY } from "../../../../../../utils/helperFunctions";
import EvaluationResult from "../../../../../../components/TestEvaluation/EvaluationResult";
const TableData = ({ tableData, isPreTestAssigned }) => {
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
  const handleTest = (type) => {
    const testId = Date.now().toString(36);
    const topicData = {
      shop_id: tableData?.shop_id,
      staff_id: tableData?.staffId,
      training_id: tableData?.trainingId,
      test_type: type, //type is pre or post
    };
    sessionStorage.setItem(testId, JSON.stringify(topicData));
      let testUrl = `/SMM/TestView?test=${[testId]}`; 
      window.open(testUrl, "_blank");
  };
  return (
    <Fragment>
      <TableRow>
        <TableCell>{tableData?.staffId}</TableCell>
        <TableCell>{tableData?.staffName}</TableCell>
        <TableCell>{tableData?.level}</TableCell>
        <TableCell>{getEpochToDDMMYY(tableData?.trainingDate)}</TableCell>
        {isPreTestAssigned && (
          <TableCell>
            <EvaluationResult
              handleTest={() =>
                handleTest("pre")
              }
              result={getResult(tableData?.preTestStatus)}
              attempts={tableData?.preTestAttempt}
            />
          </TableCell>
        )}
        <TableCell>
          <EvaluationResult
            handleTest={() =>
              handleTest("post")
            }
            result={getResult(tableData?.postTestStatus)}
            attempts={tableData?.postTestAttempt}
          />
        </TableCell>
        <TableCell>{tableData?.group}</TableCell>
        <TableCell>{tableData?.line}</TableCell>
        <TableCell>{tableData?.area}</TableCell>
      </TableRow>
    </Fragment>
  );
};
export default TableData;
