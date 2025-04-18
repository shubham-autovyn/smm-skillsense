import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { getUser } from "../../../../../../services/Authorization/AuthorizationService";
import TransparentButton from "../../../../../Utilities/Buttons/TransparentButton/TransparentButton";
import SortIcon from "../../../../assets/icons/SortIcon.svg";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import DownloadContainer from "../../../../components/DownloadContainer";
import Footer from "../../../../components/Footer";
import RefreshButton from "../../../../components/RefreshButton";
import {
  deleteBatchAction,
  fetchBatchTopicsDataAction,
  setClassroomTrainingCreatedBatchId,
  setMarkAttendance,
  updateBatchDataAction,
} from "../../../../redux/ActionCreator/ClassroomActionCreator";
import {
  deleteBatchApiAction,
  fetchAttendeesRecord,
  fetchBatchTopicsApiAction,
  markAttendanceUpdate,
  updateBatchApiAction,
} from "../../../../redux/Actions/ClassroomAction";
import {
  getAttendeesTrainingLoading,
  getAttendeesTrainingRecords,
  getDeleteBatchData,
  getMarkAttendanceData,
  getMarkAttendanceLoading,
  getTrainingBatchId,
  getCreateTrainingBatchStatus,
  getUpdateBatchData,
  getUpdateBatchLoading,
  getDeleteBatchLoading,
  getBatchTopicsData,
  getBatchTopicsLoading,
} from "../../../../redux/Reducers/SMMClassroomReducer";
import { getShop } from "../../../../redux/Reducers/SMMShopReducer";
import { isSameDate } from "../../../../utils/helperFunctions";
import useStyles from "../../../styles";
import NoAttendees from "../NoAttendees";
import SearchSelect from "../../components/Select/SearchMultiSelect";
import TableData from "./TableData";
import {
  StatusAlertSevere,
  TypeSecondary,
} from "../../../../../Utilities/colors";
import Alert from "../../../../components/CustomSnackbar/SnackBar";

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const RecordAttendance = ({
  handleNext,
  selectedTopics,
  setAttendees,
  isAddDisabled,
  trainingType,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fetchRecordCalled, setFetchRecordCalled] = useState(false);
  const [showNextConfirmation, setShowNextConfirmation] = useState(false);
  const [attendanceRecorded, setAttendanceRecorded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showInfoBar, setShowInfoBar] = useState(false);

  const shop = useSelector(getShop);
  const { trainingBatchId } = useSelector(getTrainingBatchId);
  const loading = useSelector(getAttendeesTrainingLoading);
  const loadingMarkAttendance = useSelector(getMarkAttendanceLoading);
  const attendeesTraningRecords = useSelector(getAttendeesTrainingRecords);
  const markAttendanceData = useSelector(getMarkAttendanceData);
  const loadingUpdateBatch = useSelector(getUpdateBatchLoading);
  const updateBatchData = useSelector(getUpdateBatchData);
  const deleteBatchData = useSelector(getDeleteBatchData);
  const batchCreateStatus = useSelector(getCreateTrainingBatchStatus);
  const deleteBatchLoading = useSelector(getDeleteBatchLoading);
  const loadingBatchTopics = useSelector(getBatchTopicsLoading);
  const batchTopicsData = useSelector(getBatchTopicsData);

  useEffect(() => {
    if (
      trainingBatchId &&
      !fetchRecordCalled &&
      batchCreateStatus !== "INPROGRESS"
    ) {
      fetchRecords();
      fetchBatchDetails();
    }
  }, [trainingBatchId, fetchRecordCalled, batchCreateStatus]);

  useEffect(() => {
    if (attendeesTraningRecords && attendeesTraningRecords?.traineeList) {
      setFilteredData(attendeesTraningRecords?.traineeList || []);
    }
  }, [attendeesTraningRecords]);

  useEffect(() => {
    if (markAttendanceData && markAttendanceData?.responseCode === "SMM200") {
      if (markAttendanceData?.message?.length) {
        setErrorMessage(markAttendanceData?.message);
        setShowInfoBar(true);
        setTimeout(() => {
          setShowInfoBar(false);
          setErrorMessage("");
        }, 3000);
      }
      fetchRecords();
      dispatch(setMarkAttendance({}));
    }
  }, [markAttendanceData]);
  
  useEffect(() => {
    if (updateBatchData && updateBatchData?.responseCode === "SMM200") {
      handleNext();
      dispatch(updateBatchDataAction({}));
    }
  }, [updateBatchData]);

  useEffect(() => {
    if (deleteBatchData && deleteBatchData?.responseCode === "SMM200") {
      dispatch(deleteBatchAction({}));
      dispatch(setClassroomTrainingCreatedBatchId({}));
      navigate("/SMM");
    }
  }, [deleteBatchData]);

  const fetchRecords = () => {
    const payload = {
      batchId: trainingBatchId,
      shop_id: shop?.id?.toString(),
    };
    if (shop?.id) {
      dispatch(fetchAttendeesRecord(payload));
      setFetchRecordCalled(true);
    }
  };

  const fetchBatchDetails = () => {
    const payload = {
      shop_id: shop?.id?.toString(),
      batch_id: trainingBatchId,
    };
    dispatch(fetchBatchTopicsApiAction(payload));
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSortClick = (type) => {
    switch (type) {
      case "staffId":
      case "staffName":
      case "level":
        setFilteredData(
          filteredData?.sort((a, b) =>
            !isAscending
              ? b[type].localeCompare(a[type])
              : a[type].localeCompare(b[type])
          )
        );
        setIsAscending(!isAscending);
        break;
      case "DOB":
        setFilteredData(
          filteredData?.sort((a, b) =>
            isAscending
              ? dateFormatChange(a[type]) - dateFormatChange(b[type])
              : dateFormatChange(b[type]) - dateFormatChange(a[type])
          )
        );
        setIsAscending(!isAscending);
    }
  };

  const dateFormatChange = (date, symbol = "-") => {
    const data = date?.split(symbol);
    return new Date(`${data?.[1]}-${data?.[2]}-${data?.[0]}`);
  };

  const updateAttendance = (value, rowData) => {
    const payload = {
      userID: getUserDetails()?.userId,
      shopID: shop?.id?.toString(),
      batchID: trainingBatchId,
      staffID: [`${rowData?.staffId}`],
    };
    if (value === "Present") {
      dispatch(markAttendanceUpdate(payload));
    } else if (value === "Absent" && filteredData.length === 1) {
      setShowAlert(true);
    } else if (value === "Absent") {
      dispatch(markAttendanceUpdate(payload, true));
    }
    setAttendanceRecorded(true);
  };

  const getUserDetails = () => {
    const cred = getUser()?.username.split("\\");
    let userId = "";
    let userName = "";
    if (cred) {
      if (cred.length === 1) {
        userId = cred[0];
        userName = cred[0];
      } else {
        userId = cred[0] + "%5C" + cred[1];
        userName = cred[1];
      }
    }
    return {
      userId,
      userName,
    };
  };

  const handleRecordAttendance = (staffData) => {
    const staffIds = staffData?.map((staff) => staff.value?.toString());
    const payload = {
      userID: getUserDetails()?.userId,
      shopID: shop?.id?.toString(),
      batchID: trainingBatchId,
      staffID: staffIds || [],
    };
    dispatch(markAttendanceUpdate(payload));
    setAttendanceRecorded(true);
    handleCloseDialog();
  };

  const handleDeleteAllRecord = () => {
    const staffIds = filteredData?.map((staff) => staff.staffId?.toString());
    if (staffIds && staffIds?.length) {
      const payload = {
        userID: getUserDetails()?.userId,
        shopID: shop?.id?.toString(),
        batchID: trainingBatchId,
        staffID: staffIds || [],
      };
      dispatch(markAttendanceUpdate(payload));
    }
    const deletePayload = {
      shop_id: shop?.id?.toString(),
      training_batch_id: trainingBatchId,
    };
    dispatch(deleteBatchApiAction(deletePayload));
    setShowAlert(false);
  };

  const downloadExcel = (data) => {
    if (data && data.length) {
      let topics = [];
      if (selectedTopics && selectedTopics?.length) {
        topics = selectedTopics?.map((topic) => topic?.topic_name);
      } else {
        if (batchTopicsData?.batchData?.topicsData) {
          topics = batchTopicsData?.batchData?.topicsData?.map(
            (topic) => topic?.trainingTopicName
          );
        }
      }
      const parsedData = filteredData.map((item) => {
        let obj = {
          [`${trainingType} training topic`]: topics?.toString(),
          Trainer: `${getUserDetails()?.userName}, ${getUserDetails()?.userId}`,
          "Staff ID": item?.staffId,
          Name: item?.staffName,
          Level: item?.level,
          DOB: item.DOB ? dayjs(item.DOB).format("DD/MM/YYYY") : "",
        };
        item?.attendanceDate?.map((check) => {
          obj = {
            ...obj,
          };
          obj[check[0]] = "YES";
          if (!isSameDate(check[0])) {
            const currentDate = format(new Date(), "dd-MM-yyyy");
            obj[currentDate] = "";
          }
          return check;
        });
        return obj;
      });
      const worksheet = XLSX.utils.json_to_sheet(parsedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(
        workbook,
        `${trainingType?.replace(" ", "_")}_training_attendance_${dayjs(
          new Date()
        ).format("DDMMYY_hhmmss")}.xlsx`
      );
    }
  };

  const handleNextClick = () => {
    if (attendanceRecorded) {
      setShowNextConfirmation(true);
    } else {
      handleConfirmNext();
    }
  };

  const handleConfirmNext = () => {
    setAttendees && setAttendees(filteredData);
    const payload = {
      shop_id: shop?.id?.toString(),
      training_batch_id: trainingBatchId,
      attendance_count: filteredData?.length,
    };
    dispatch(updateBatchApiAction(payload));
    dispatch(fetchBatchTopicsDataAction({}));
    setShowNextConfirmation(false);
  };

  const handleOpenQrCode = () => {
    const qrId = Date.now().toString(36);
    const dataToSend = {
      shopId: shop?.id?.toString(),
      userId: getUserDetails()?.userId,
      trainingType: trainingType?.replace(" ", "%20"),
      batchId: trainingBatchId,
      flow: "attendance",
      info: "Scan QR Code to Register your Attendance",
    };
    // Store the data in localStorage
    sessionStorage.setItem(qrId, JSON.stringify(dataToSend));
    window.open(`/SMM/QRCode?qr=${[qrId]}`, "_blank");
  };

  const getButtonState = () => {
    const currentDate = dayjs(new Date()).format("DD-MM-YYYY");
    const currentDateArr = [];
    filteredData?.filter((check) => {
      const dateArr = check?.attendanceDate?.filter((arr) =>
        arr?.includes(currentDate)
      );
      if (dateArr?.length) {
        currentDateArr?.push(dateArr);
      }
      return dateArr;
    });

    if (!filteredData?.length) {
      return true;
    } else if (filteredData?.length !== currentDateArr?.length) {
      return true;
    }
    return false;
  };

  const getAttendedTraineesData = () => {
    if (filteredData?.length) {
      const dates = filteredData?.[0]?.attendanceDate;
      if (
        dates?.length > 1 ||
        (dates.length &&
          !isSameDate(filteredData?.[0]?.attendanceDate?.[0]?.[0]))
      ) {
        const data = filteredData?.map((staff) => {
          return {
            label: `${staff?.staffName} | ${staff?.staffId}`,
            value: staff?.staffId,
          };
        });
        return data;
      }
      return null;
    }
    return null;
  };

  const getHeader = () => {
    const dates = filteredData?.[0]?.attendanceDate;
    return (
      <TableHead
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 999,
        }}
      >
        <TableRow>
          <TableCell colSpan={4}>{""}</TableCell>
          {dates?.map((item) => {
            if (isSameDate(item?.[0])) {
              return null;
            } else {
              return (
                <TableCell sx={{ textAlign: "center" }}>{item?.[1]}</TableCell>
              );
            }
          })}
          <TableCell sx={{ textAlign: "center" }}>
            {weekday[new Date().getDay()]}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className={classes.columnHeader}>
              Staff ID
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("staffId")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              Name
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("staffName")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              Level
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleSortClick("level")}
              >
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.columnHeader}>
              Date of Birth
              <IconButton sx={{ p: 0 }} onClick={() => handleSortClick("DOB")}>
                <img src={SortIcon} alt="Sort" />
              </IconButton>
            </div>
          </TableCell>
          {dates?.map((item) => {
            if (isSameDate(item?.[0])) {
              return null;
            }
            return (
              <TableCell>
                <div
                  className={classes.columnHeader}
                  style={{ justifyContent: "center" }}
                >
                  {item?.[0]}
                </div>
              </TableCell>
            );
          })}
          <TableCell sx={{ textAlign: "center" }}>
            {format(new Date(), "dd-MM-yyyy")}
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };

  const nextConfimationText = () => {
    return (
      <Box>
        <Typography
          variant="body1"
          component={"span"}
          sx={{ fontWeight: "700", color: TypeSecondary }}
        >
          {"Warning: "}
        </Typography>
        <Typography
          variant="body1"
          component={"span"}
          sx={{ color: TypeSecondary }}
        >
          {"Clicking on next will freeze the attendee list for this training. "}
        </Typography>
        <Typography
          variant="body1"
          component={"span"}
          sx={{ color: StatusAlertSevere, fontWeight: "600" }}
        >
          {"No further additions can be made, only deletions will be allowed. "}
        </Typography>
        <Typography
          variant="body1"
          component={"span"}
          sx={{ color: TypeSecondary }}
        >
          {
            "Do you want to proceed to the next step - Deliver Training and Evaluate?"
          }
        </Typography>
      </Box>
    );
  };
  return (
    <Fragment>
      <Paper sx={{ my: 1, p: 1.6 }}>
        <Box
          sx={{
            pb: "1rem",
            display: "flex",
            borderRadius: "8px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">{`Step ${
            trainingType === "New joinee" ? 1 : 2
          } - Record Attendance`}</Typography>
          {!loading && (
            <Box style={{ display: "flex", position: "relative" }}>
              <RefreshButton handleRefresh={fetchRecords} />
              <Box>
                <TransparentButton
                  disabled={isAddDisabled}
                  onClick={handleOpenDialog}
                >
                  Record Attendance Manually
                </TransparentButton>
              </Box>
              <Box sx={{ mr: "1rem" }} />
              <Box>
                {/* TODO:Add Query Parameters here */}
                <TransparentButton
                  disabled={isAddDisabled}
                  onClick={handleOpenQrCode}
                >
                  Record Attendance via QR Code
                </TransparentButton>
              </Box>
            </Box>
          )}
        </Box>
        {loading ||
        loadingMarkAttendance ||
        loadingUpdateBatch ||
        deleteBatchLoading ||
        loadingBatchTopics ||
        batchCreateStatus === "INPROGRESS" ? (
          <Skeleton
            className={`${classes["details-table-dimensions"]}`}
            animation="wave"
            variant="rectangular"
          />
        ) : filteredData?.length ? (
          <>
            <DownloadContainer
              totalCount={filteredData?.length}
              handleDownload={() => downloadExcel(filteredData)}
            />
            <TableContainer
              className={`${classes["details-table-dimensions"]}`}
              component={Paper}
            >
              <Table stickyHeader>
                {getHeader()}
                <TableBody>
                  {filteredData?.map((row, index) => (
                    <TableData
                      key={index}
                      row={row}
                      updateAttendance={(value) => updateAttendance(value, row)}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <NoAttendees />
        )}
      </Paper>
      {isDialogOpen && (
        <SearchSelect
          open={isDialogOpen}
          onClose={handleCloseDialog}
          handleRecordAttendance={handleRecordAttendance}
          trainingType={trainingType.replace(" ", "%20")}
          attendedTraineesData={getAttendedTraineesData()}
        />
      )}
      <Box sx={{ pb: "2rem" }}>
        <Footer
          handleNext={handleNextClick}
          handleCancel={() => {
            setShowAlert(true);
          }}
          cancelLabel="Cancel Training"
          nextLabel={"Next"}
          nextDisabled={getButtonState()}
        />
      </Box>
      {showAlert && (
        <ConfirmationDialog
          openConfirm={showAlert}
          handleChoice={() => {
            handleDeleteAllRecord();
          }}
          handleClose={() => setShowAlert(false)}
          headerText={"Cancel Training"}
          confirmButtonText={"Cancel Training"}
          highlightedText={"permanently delete"}
          infoText={
            "Cancelling this training will permanently delete the entire batch, along with all attendee and test data. Are you sure you want to proceed with the deletion?"
          }
        />
      )}
      {showNextConfirmation && (
        <ConfirmationDialog
          openConfirm={showNextConfirmation}
          handleChoice={handleConfirmNext}
          handleClose={() => setShowNextConfirmation(false)}
          headerText={"Confirm Attendee List For This Batch"}
          confirmButtonText={"Confirm Attendee List & Proceed"}
          description={nextConfimationText()}
        />
      )}
       <Alert
        open={showInfoBar}
        handleClose={() => setShowInfoBar(false)}
        message={ errorMessage || "" }
        sx={{
          height: "auto",
          whiteSpace: "pre-line",
        }}
      />
    </Fragment>
  );
};
export default RecordAttendance;
