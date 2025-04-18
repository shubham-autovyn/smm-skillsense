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
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  Grey10,
  MarutiBlue500,
  MarutiWhite,
  TypeSecondary,
} from "../../../../utils/colors";
import CustomToggleButton from "../../../../utils/Toggle/CustomToggleButton/CustomToggleButton";
import DownloadIcon from "../../../../assets/icons/downloadIcon.svg";
import SortIcon from "../../../../assets/icons/SortIcon.svg";
import useStyles from "../../../styles";
import AttendeeDetails from "./Details/AttendeeDetails";
import TrainingPlanData from "./TrainingPlanData";
import {checkPlannedInCurrentMonth} from "../../../../utils/helperFunctions"
const monthsMap = {
  apr: 0,
  may: 1,
  jun: 2,
  jul: 3,
  aug: 4,
  sep: 5,
  oct: 6,
  nov: 7,
  dec: 8,
  jan: 9,
  feb: 10,
  mar: 11,
  adhoc: 12,
};

const TrainingPlan = (props) => {
  const classes = useStyles();
  const [activeTrainingPlan, setActiveTrainingPlan] = useState("Operator");
  const [filteredData, setFilteredData] = useState([]);
  const [openDetails, setOpenDetails] = useState({
    open: false,
    topicId: "",
    topic: "",
  });
  const [isAscending, setIsAscending] = useState(true);

  const planData = props.trainingPlanData;
  useEffect(() => {
    if (Array.isArray(planData?.trainingPlan)) {
      const filteredData = planData.trainingPlan.filter(
        (item) =>
          item?.planType.toLowerCase().substring(0, 8) ===
            activeTrainingPlan.toLowerCase().substring(0, 8) ||
          item?.planType.toLowerCase() === "all"
      );
      setFilteredData(
        filteredData?.sort(
          //By Default sorting the data month increasing order
          (a, b) =>
            monthsMap[a.plannedMonths[0].toLowerCase()] -
            monthsMap[b.plannedMonths[0].toLowerCase()]
        )
      );
    }
  }, [planData, activeTrainingPlan]);

  const handleSortClick = (type) => {
    switch (type) {
      case "plannedMonths":
        console.log("PLANNED MOTH SORT");
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? monthsMap[a.plannedMonths[0].toLowerCase()] -
                monthsMap[b.plannedMonths[0].toLowerCase()]
              : monthsMap[b.plannedMonths[0].toLowerCase()] -
                monthsMap[a.plannedMonths[0].toLowerCase()]
          )
        );
        setIsAscending(!isAscending);
        break;
      case "topicName":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? b[type].localeCompare(a[type])
              : a[type].localeCompare(b[type])
          )
        );
        setIsAscending(!isAscending);
        break;
      case "noPlannedAttendies":
      case "noActualAttendies":
      case "actualTrainingDateFrom": //NOTE:TAKING THE FROM VALUE FOR SORTING
      case "completionStatus":
        setFilteredData(
          filteredData?.sort((a, b) => {
            //Handling undefined for sort filters
            if (a[type] === undefined) return 1;
            if (b[type] === undefined) return -1;
            //FOR TAKING UNDEFINED (-) INTO CONSIDERATION LOGIC
            // if (a[type] === undefined) return isAscending?1:-1; 
            // if (b[type] === undefined) return isAscending?-1:1;
            return !isAscending
              ? parseInt(a[type]) - parseInt(b[type])
              : parseInt(b[type]) - parseInt(a[type]);
          })
        );
        setIsAscending(!isAscending);
        break;
    }
  };

  const downloadExcel = (data) => {
    if (data && data.length) {
      const filterList = data?.sort(
        (a, b) =>
          monthsMap[a.plannedMonths[0].toLowerCase()] -
          monthsMap[b.plannedMonths[0].toLowerCase()]
      );
      const parsedData = filterList.map((item) => {
        let obj = {
          "Planned month": item?.plannedMonths.join(","),
          "Training topic": item?.topicName,
          "No. of planned attendees": item?.noPlannedAttendies,
          "No. of actual attendees": item?.noActualAttendies,
          "Applicable level": item?.applicableLevel,
          "Completion %": item?.completionStatus
            ? `${item?.completionStatus}%`
            : "",
        };
        return obj;
      });
      const worksheet = XLSX.utils.json_to_sheet(parsedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(
        workbook,
        `Refresher_training_status_${dayjs(new Date()).format(
          "DDMMYY_hhmmss"
        )}.xlsx`
      );
    }
  };

  const getHeader = () => (
    <TableHead>
      <TableRow>
        <TableCell>
          <div className={classes.columnHeader}>
            Planned Month
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("plannedMonths")}
            >
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            Topic
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("topicName")}
            >
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            No. of Planned Attendees
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("noPlannedAttendies")}
            >
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            No. of Actual Attendees
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("noActualAttendies")}
            >
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            Actual Training Date
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("actualTrainingDateFrom")}
            >
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <div className={classes.columnHeader}>
            Completion %
            <IconButton
              sx={{ p: 0 }}
              onClick={() => handleSortClick("completionStatus")}
            >
              <img src={SortIcon} alt="Sort" />
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
    </TableHead>
  );
  const handleActiveTrainingPlan = (val) => {
    if (val !== null) {
      setActiveTrainingPlan(val);
    }
  };
  return (
    <Box sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 1,
          background: Grey10,
          display: "flex",
          borderRadius: "8px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography sx={{ color: TypeSecondary }}>
            View Refresher Training Plan For:
          </Typography>
          <Box
            sx={{
              width: "170px",
              height: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CustomToggleButton
              selected={activeTrainingPlan}
              labels={["Operator", "Supervisor"]}
              onChange={handleActiveTrainingPlan}
            />
          </Box>
        </Box>
        <Avatar
          sx={{
            bgcolor: MarutiWhite,
            height: "3.2rem",
            width: "3.2rem",
          }}
          variant="rounded"
          sizes="small"
          onClick={() => downloadExcel(planData?.trainingPlan)}
        >
          <img
            alt="download"
            src={DownloadIcon}
            style={{
              cursor: "pointer",
              height: "1.602rem",
              width: "1.6rem",
            }}
          />
        </Avatar>
      </Box>
      <TableContainer
        className={`${classes["master-table"]} ${classes["batch-table-dimensions"]}`}
        component={Paper}
        // sx={{maxHeight:"205px"}}
      >
        <Table stickyHeader>
          {getHeader()}
          <TableBody>
            {filteredData.map((row, index) => (
              <TrainingPlanData
                key={index}
                rowData={row}
                isActive={checkPlannedInCurrentMonth(row.plannedMonths,planData?.currentEpoch)}
                handleOpen={(value) =>
                  setOpenDetails({
                    open: true,
                    topicId: value.topicId,
                    topicName: value.topicName,
                  })
                }
              />
            ))}
          </TableBody>
        </Table>
        {filteredData?.length === 0 && (
          <Box className={classes["loader-container"]} sx={{ mt: 1, mb: 1 }}>
            <Typography style={{ color: MarutiBlue500 }}>
              No record found
            </Typography>
          </Box>
        )}
      </TableContainer>
      <AttendeeDetails
        title={`Attendee Details`}
        topicName={openDetails.topicName}
        topicId={openDetails.topicId}
        traineeType={activeTrainingPlan.toLowerCase()}
        open={openDetails.open}
        handleClose={() =>
          setOpenDetails({ open: false, topicId: "", topicName: "" })
        }
      />
    </Box>
  );
};
export default TrainingPlan;
