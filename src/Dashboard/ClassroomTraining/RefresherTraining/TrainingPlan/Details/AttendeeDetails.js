/* eslint-disable react-hooks/exhaustive-deps */
import { Box, TableContainer, Typography, Paper } from "@mui/material";
import { Fragment, useState } from "react";
import DialogCard from "../../../../../components/Dialog/CustomDialogCard";
import DetailsTable from "./DetailsTable/DetailsTable";
import DateSelector from "../../../../../components/DateSelector/DateSelector";
import Filters from "./Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "../../../../styles";
import {
  getAttendeeDetailsData,
  getAttendeeDetailsLoading,
  getBatchDetailsData,
  getBatchDetailsLoading,
  getStaffListData,
} from "../../../../../redux/Reducers/SMMClassroomReducer";
import { useEffect } from "react";
import {
  fetchAttendeeDetailsData,
  fetchAttendeeBatchDetailsData,
  fetchRefresherStaffData,
} from "../../../../../redux/Actions/ClassroomAction";
import { getShop } from "../../../../../redux/Reducers/SMMShopReducer";
// import { MarutiBlue500 } from "../../../../../../Utilities/colors";

const AttendeeDetails = ({ open, handleClose, title, topicId, topicName,traineeType }) => {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const dispatch = useDispatch();
  const attendeeDetailsData = useSelector(getAttendeeDetailsData);
  const attendeeDetailsLoading = useSelector(getAttendeeDetailsLoading);
  const attendeBatchDetails = useSelector(getBatchDetailsData);
  const attendeeBatchDetailsLoading = useSelector(getBatchDetailsLoading);
  const staffData = useSelector(getStaffListData);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const shop = useSelector(getShop);
  const classes = useStyles();
  useEffect(() => {
    if (search?.staffId) {
      setSelectedStaffId(search?.staffId);
    } else {
      setSelectedStaffId(null);
    }
  }, [search]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== "") {
        const payload = {
          shop_id: shop?.id,
          query: searchQuery,
          trainee_type:traineeType
        };
        dispatch(fetchRefresherStaffData(payload));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);
  useEffect(() => {
    if (open && shop?.id) {
      const batchDetailsPayload = {
        shop_id: shop?.id,
        topic_id: topicId,
        training_date: getDateTime(selectedDate),
        staff_id: selectedStaffId,
      };
      dispatch(fetchAttendeeBatchDetailsData(batchDetailsPayload));
    }
  }, [shop, open, selectedDate, selectedStaffId]);
  useEffect(() => {
    if (
      Array.isArray(attendeBatchDetails?.batchList) &&
      attendeBatchDetails?.batchList.length > 0
    ) {
      setSelectedBatch(attendeBatchDetails?.batchList[0]);
    }
  }, [attendeBatchDetails]);
  useEffect(() => {
    if (selectedBatch !== null && open) {
      const attendeeDetailsPayload = {
        shop_id: shop?.id,
        training_id: selectedBatch.trainingId,
        topic_id: topicId,
      };
      dispatch(fetchAttendeeDetailsData(attendeeDetailsPayload));
    }
  }, [selectedBatch]);
  const getDateTime = (date) => {
    if (date === null) {
      return date;
    }
    //Converting to epoc
    var d = new Date(date).getTime();
    return parseInt(d / 1000);
  };
  const handleDialogClose = () => {
    handleClose();
    setSelectedDate(null);
    setSearch("");
    setSearchQuery("");
  };
  return (
    <Fragment>
      <DialogCard
        open={open}
        handleClose={handleDialogClose}
        maxWidth={"lg"}
        minHeigh={"lg"}
        fullWidth={true}
        title={title}
      >
        <Box>
          <Filters
            handleGroupChange={() => {}}
            handleAreaChange={() => {}}
            handleLineChange={() => {}}
            handleResetClick={() => {
              setSelectedDate(null);
              setSearch("");
              setSearchQuery("");
            }}
            handleSelectDate={(evt) => {
              setSelectedDate(evt);
            }}
            selectedDate={selectedDate}
            searchValue={search}
            handleSearch={(value) => {
             // console.log("SELECTED VALUE", value);
              setSearch(value);
            }}
            handleSearchQuery={(value) => {
             // console.log("SEARCH QUERY", value);
              setSearchQuery(value);
            }}
            autoCompleteData={staffData}
          />
          <Box>
            <DateSelector
              data={attendeBatchDetails?.batchList?.sort((a,b)=>b?.trainingDate-a?.trainingDate)}
              handleSelect={(val) => setSelectedBatch(val)}
              isItemSelected={(item) =>
                item?.trainingId === selectedBatch?.trainingId
              }
            />
            <Box sx={{ p: "2rem" }}>
              <DetailsTable
                topicName={topicName}
                preTestAssigned={attendeeDetailsData?.preTestAssigned}
                data={
                  attendeBatchDetails?.batchList?.length === 0
                    ? []
                    : attendeeDetailsData?.attendeeDetails
                }
                loading={attendeeDetailsLoading}
                staffId={selectedStaffId}
              />
            </Box>
          </Box>
        </Box>
      </DialogCard>
    </Fragment>
  );
};
export default AttendeeDetails;
