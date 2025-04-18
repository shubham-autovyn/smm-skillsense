import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
  linearProgressClasses,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Grey10,
  Grey20,
  MarutiBlue500,
  StatusDone,
} from "../../../../utils/colors";
import dayjs from "dayjs";
const getFormattedEpocDate = (inputDate) => {
  if (Number.isInteger(inputDate)) {
    //14/08/23; 09:00
    return dayjs(inputDate * 1000).format("DD/MM/YY; HH:mm");
  }
  return "-";
};

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
const OngoingBatchData = (props) => {
  const row = props.rowData;
  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
          <BorderLinearProgress
            variant="determinate"
            value={(row?.noOfTopicsCompleted * 100) / row?.noOfTopicsAssigned}
          />
          <Typography
            sx={{ color: "#343536", fontSize: "1.3rem" }}
          >{`${row?.noOfTopicsCompleted}/${row?.noOfTopicsAssigned}`}</Typography>
        </Box>
      </TableCell>
      <TableCell>{getFormattedEpocDate(row?.trainingStartDateTime)}</TableCell>
      <TableCell>
        {row?.noAttendies === null ? "-" : row?.noAttendies}
      </TableCell>
      <TableCell>
        {row?.attendeeType !== null
          ? row.attendeeType.toLowerCase() === "operator"
            ? "Operator"
            : row.attendeeType.toLowerCase() === "supervisor"
            ? "Supervisor"
            : "-"
          : "-"}
      </TableCell>
      <TableCell
        sx={{ color: MarutiBlue500, cursor: "pointer" }}
        onClick={props.handleTrackClick}
      >
        Track
      </TableCell>
    </TableRow>
  );
};
export default OngoingBatchData;
