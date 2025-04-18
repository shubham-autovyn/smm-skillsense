import { TableCell, TableRow } from "@mui/material";
import dayjs from "dayjs";
import { MarutiBlue500 } from "../../../../utils/colors";

const getFormattedEpocDate = (inputDate) => {
  if (Number.isInteger(inputDate)) {
    //14/08/23; 09:00
    return dayjs(inputDate * 1000).format("DD/MM/YY; HH:mm");
  }
  return "-";
};

const PendingBatchData = ({ rowData, handleAllocateClick }) => {
  return (
    <TableRow>
      <TableCell>{`${rowData?.pendingSince} ${
        rowData?.pendingSince > 1 ? "Days" : "Day"
      }`}</TableCell>
      <TableCell>{getFormattedEpocDate(rowData?.startDate)}</TableCell>
      <TableCell>{getFormattedEpocDate(rowData?.endDate)}</TableCell>
      <TableCell>
        {rowData?.attendeeCount === null ? "-" : rowData?.attendeeCount}
      </TableCell>
      <TableCell>{rowData?.traineeType}</TableCell>
      <TableCell
        sx={{ color: MarutiBlue500, cursor: "pointer" }}
        onClick={handleAllocateClick}
      >
        Allocate to Areas
      </TableCell>
    </TableRow>
  );
};
export default PendingBatchData;
