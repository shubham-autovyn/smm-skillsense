import {
  LinearProgress,
  linearProgressClasses,
  TableCell,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Grey20,
  MarutiBlue500,
  StatusDone,
} from "../../../../utils/colors";
// const getFormattedEpocDate = (inputDate) => {
//   if (Number.isInteger(inputDate)) {
//     //14/08/23; 09:00
//     return dayjs(inputDate * 1000).format("DD/MM/YY; HH:mm");
//   }
//   return "-";
// };

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 9,
  borderRadius: 5,
  width: "70%",

  //Empty Background Color
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: Grey20,
  },
  //Filled Background Color
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: [5, 5],
    backgroundColor: StatusDone,
  },
}));
const getTraineeType = (type) => {
  switch (type) {
    case "operator":
      return "Operator";
    case "supervisor":
      return "Supervisor";
    default:
      return "-";
  }
};
const PendingAllocationData = (props) => {
  const row = props.rowData;
  return (
    <TableRow>
      <TableCell>{`${row?.pendingSince} days`}</TableCell>
      <TableCell>{row?.startDate}</TableCell>
      <TableCell>{row?.endDate}</TableCell>
      <TableCell>
        {row?.attendeeCount === null ? "-" : row?.attendeeCount}
      </TableCell>
      <TableCell>{getTraineeType(row?.traineeType)}</TableCell>
      <TableCell
        sx={{ color: MarutiBlue500, cursor: "pointer" }}
        onClick={props.handleTrackClick}
      >
        Allocate to Areas
      </TableCell>
    </TableRow>
  );
};
export default PendingAllocationData;
