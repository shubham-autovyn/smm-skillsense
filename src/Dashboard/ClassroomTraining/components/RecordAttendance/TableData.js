import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
import {
  Green,
  Grey10,
  MarutiSilver200,
  StatusAlertSevere,
  TypeSecondary,
  TypeTertiary,
} from "../../../../../Utilities/colors";
import CheckMark from "../../../../assets/icons/CheckMark.svg";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import { isSameDate } from "../../../../utils/helperFunctions";

const MenuProps = {
  PaperProps: {
    style: {
      width: "inherit",
      maxHeight: "200px",
    },
  },
};

const NewRefresherTableData = ({ row, updateAttendance }) => {
  const [openConfirmAlert, setOpenConfirmAlert] = useState(false);
  const isAbsent = row?.attendance === "Absent";

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "Absent") {
      toggleConfirmAlert();
    } else {
      updateAttendance && updateAttendance(value);
    }
    return;
  };

  const toggleConfirmAlert = () => {
    setOpenConfirmAlert(!openConfirmAlert);
  };

  const handleChoice = () => {
    toggleConfirmAlert();
    updateAttendance && updateAttendance("Absent");
  };

  const AttendanceLabel = ({ label }) => {
    const color = label === "Present" ? Green : StatusAlertSevere;
    return (
      <Typography variant="body1" sx={{ color }}>
        {label}
      </Typography>
    );
  };

  const RenderAttendanceDropdown = () => {
    var attendance = [];
    const filterDate = row?.attendanceDate?.filter((date) =>
      isSameDate(date?.[0])
    );
    if (row?.attendanceDate.length > 0) {
      if (row?.attendanceDate.length === 1 && filterDate[0]) {
        attendance = ["Present", "Absent"];
      } else {
        attendance = ["Absent"];
      }
    } else {
      attendance = ["Present", "Absent"];
    }
    return (
      <Box>
        <Select
          sx={{
            height: "3.2rem !important",
            p: 0,
            m: 0,
            my: -0.3,
            width: "134px",
            backgroundColor: "transparent",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
              backgroundColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          }}
          value={row.attendance}
          defaultValue={filterDate?.[0] ? "Present" : null}
          onChange={handleChange}
          IconComponent={KeyboardArrowDownIcon}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            return <AttendanceLabel label={selected || ""} />;
          }}
        >
          {attendance?.map((val) => (
            <MenuItem
              key={val}
              value={val}
              sx={{
                height: "3.2rem !important",
                justifyContent: "space-between",
              }}
            >
              <AttendanceLabel label={val} />
              {filterDate?.[0] && val === "Present" ? (
                <img
                  src={CheckMark}
                  alt="check"
                  style={{ paddingLeft: "2rem" }}
                />
              ) : null}
            </MenuItem>
          ))}
        </Select>
      </Box>
    );
  };

  return (
    <Fragment>
      <TableRow sx={{ backgroundColor: isAbsent ? MarutiSilver200 : "white" }}>
        <TableCell sx={{ color: isAbsent ? TypeTertiary : TypeSecondary }}>
          {row?.staffId}
        </TableCell>
        <TableCell sx={{ color: isAbsent ? TypeTertiary : TypeSecondary }}>
          {row.staffName}
        </TableCell>
        <TableCell sx={{ color: isAbsent ? TypeTertiary : TypeSecondary }}>
          {row.level}
        </TableCell>
        <TableCell sx={{ color: isAbsent ? TypeTertiary : TypeSecondary }}>
          {row.DOB ? dayjs(row.DOB).format("DD/MM/YYYY") : ""}
        </TableCell>
        {row?.attendanceDate?.map((item) => {
          if (isSameDate(item?.[0])) {
            return null;
          } else {
            return (
              <TableCell sx={{ color: Green, textAlign: "center" }}>
                {"Present"}
              </TableCell>
            );
          }
        })}
        <TableCell
          sx={{
            backgroundColor: isAbsent ? MarutiSilver200 : Grey10,
            width: "134px",
          }}
        >
          <RenderAttendanceDropdown />
        </TableCell>
      </TableRow>
      {openConfirmAlert && (
        <ConfirmationDialog
          openConfirm={openConfirmAlert}
          handleChoice={handleChoice}
          handleClose={toggleConfirmAlert}
          headerText={"Confirm Absence and Delete Record"}
          confirmButtonText={"Delete"}
          highlightedText={"permanently delete"}
          infoText={
            "Warning: Marking the attendee as absent will remove them from all training topics, including those already attended. @ Are you sure you want to permanently delete the attendee and remove all the training records from this batch?"
          }
        />
      )}
    </Fragment>
  );
};
export default NewRefresherTableData;
