import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { Fragment } from "react";
import LinkBlack from "../../../../assets/icons/LinkIconBlack.svg";
import { getFormattedEpocDateTime } from "../../../../utils/helperFunctions";
import EvaluationResult from "../../../../components/TestEvaluation/EvaluationResult";
import { getShop } from "../../../../redux/Reducers/SMMShopReducer";
import { useSelector } from "react-redux";
const TableData = ({ trainingType, tableData, isPreTestAssigned }) => {
  const shop = useSelector(getShop);
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
   // console.log("TANLE",tableData?.topicId);
    const topicData = {
      shop_id: shop?.id?.toString(),
      masterTopicId: tableData?.topicId,//type is pre or post
      templateRequired:true
    };
    sessionStorage.setItem(testId, JSON.stringify(topicData));
    let evaluationUrl =  `/SMM/TestViewAnswers?test=${[testId]}`;
    window.open(evaluationUrl, "_blank");
  };
 const getPlanType=(type)=>{
     switch(type){
      case "All": return "All";
      case "supervisor":return "Supervisor";
      case "operator":return "Operator";
      default :return "-";
     }
 }
  return (
    <Fragment>
      <TableRow>
        <TableCell>{trainingType}</TableCell>
        <TableCell>{tableData?.topicName}</TableCell>
        <TableCell>
          <Box
            onClick={handleTest}
            sx={{
              cursor:"pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {tableData?.testName}
            <img
              alt="link"
              src={LinkBlack}
              style={{
                height: "1.4rem",
                width: "1.4rem",
              }}
            />
          </Box>
        </TableCell>
        <TableCell>{tableData?.controlNo}</TableCell>
        <TableCell>{tableData?.revision_no}</TableCell>
        <TableCell>{getPlanType(tableData?.planType)}</TableCell>
        <TableCell>{tableData?.evaluation}</TableCell>
        <TableCell>{tableData?.filled_by}</TableCell>
        <TableCell>{`${Math.trunc(tableData?.passingScore * 100)}%`}</TableCell>
        <TableCell>{getFormattedEpocDateTime(tableData?.uploaded_at)}</TableCell>
        <TableCell>{tableData?.plannedMonths.join(",")}</TableCell>
      </TableRow>
    </Fragment>
  );
};
export default TableData;
