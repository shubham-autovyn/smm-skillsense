import {
  Box,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  MarutiBlue500,
  Red500,
} from "../../../../utils/colors";
import {getEpochToDDMMYY} from "../../../../utils/helperFunctions";

const TrainingPlanData = (props) => {
  const row = props.rowData;
  return (
    //className="active" to highlight
    <TableRow className={props.isActive?"active":""}>
      <TableCell>
        {row?.plannedMonths.join(",")}
      </TableCell>
      <TableCell>{row.topicName}</TableCell>
      <TableCell>{row?.noPlannedAttendies?row?.noPlannedAttendies:"-"}</TableCell>
      <TableCell>
        <Box
          sx={{ cursor: "pointer", color: MarutiBlue500 }}
          onClick={row?.noActualAttendies?()=>{props.handleOpen({topicId:row.topicId,topicName:row.topicName})}:null}
        >
          {row?.noActualAttendies?row?.noActualAttendies:"-"}
        </Box>
      </TableCell>
      <TableCell>{ row?.actualTrainingDateFrom?`${getEpochToDDMMYY(
        row.actualTrainingDateFrom
      )} to ${getEpochToDDMMYY(row.actualTrainingDateTo)} `:"-"}</TableCell>
      <TableCell sx={!props.isActive &&Math.trunc(parseInt(row.completionStatus))<100?{color:Red500,fontWeight:600}:{}}>{row?.completionStatus?`${Math.trunc(row?.completionStatus)}%`:"-"}</TableCell>
    </TableRow>
  );
};
export default TrainingPlanData;
