import { Box, Typography, Paper, Skeleton } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import useStyles from "../../../../styles";
import CustomToggleButton from "../../../../../../Utilities/Toggle/CustomToggleButton/CustomToggleButton";
import CustomMultiSelect from "../../../components/Select/CustomMultiSelect";
import {
  fetchNewRefresherTrainingTopic,
  createNewTraininigBatch,
} from "../../../../../redux/Actions/ClassroomAction";
import {
  getTrainingTopicList,
  getTrainingTopicListLoading,
  getTrainingBatchId,
  getCreateTrainingBatchStatus,
} from "../../../../../redux/Reducers/SMMClassroomReducer";
import Footer from "../../../../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../../../../services/Authorization/AuthorizationService";
import { setAlert } from "../../../../../redux/Actions/AlertActions";
import {
  getPlant,
  getShop,
} from "../../../../../redux/Reducers/SMMShopReducer";
import ConfirmationDialog from "../../../../../components/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import {
  checkPlannedInCurrentMonth,
  checkPlannedInPreviousMonth,
} from "../../../../../utils/helperFunctions";
const SelectTopic = ({ handleNext, setTopics }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const plant = useSelector(getPlant);
  const shop = useSelector(getShop);
  const createBatchStatus = useSelector(getCreateTrainingBatchStatus);
  const loading = useSelector(getTrainingTopicListLoading);
  const trainingBatchId = useSelector(getTrainingBatchId);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [activeTrainingPlan, setActiveTrainingPlan] = useState("Operator");
  const topicData = useSelector(getTrainingTopicList);
  const [filteredTopics, setFilteredTopic] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  // console.log("trainingTopic List", topicData);
  useEffect(() => {
    if (shop?.id) {
      const payload = {
        shop_id: shop?.id,
        training_type: "Refresher",
      };
      dispatch(fetchNewRefresherTrainingTopic(payload));
    }
    return () => {
      //CleanUp
    };
  }, []);
  useEffect(() => {
    // console.log("Active Training Plan",activeTrainingPlan);
    if (Array.isArray(topicData?.topicsPlan)) {
      setSelectedTopics([]);
      const filteredData = topicData?.topicsPlan.filter(
        (item) =>
          item?.planType.toLowerCase().substring(0, 8) ===
            activeTrainingPlan.toLowerCase().substring(0, 8) ||
          item?.planType.toLowerCase() === "all"
      );
      // console.log("FILTERED DATA",filteredData)
      setFilteredTopic(filteredData);
      let preSelected = filteredData.filter((item) => {
        //How to identify previous month,today JAN
        if (
          checkPlannedInPreviousMonth(
            item?.plannedMonths,
            topicData?.currentEpoch
          ) &&
          !item?.completionStatus
        ) {
          //If undefined or 0 and plannedIn previous Month
          return true;
        }
        if (
          checkPlannedInPreviousMonth(
            item?.plannedMonths,
            topicData?.currentEpoch
          ) &&
          item?.completionStatus < 100
        ) {
          //if <100 and Planned in previoud month
          return true;
        }
        return checkPlannedInCurrentMonth(
          item?.plannedMonths,
          topicData?.currentEpoch
        ); //If planned in current month
      });
      // console.log("PRESELECT",preSelected);
      setSelectedTopics(preSelected);
    }
  }, [activeTrainingPlan, topicData]);
  const handleActiveTrainingPlan = (val) => {
    if (val !== null) {
      setActiveTrainingPlan(val);
    }
  };

  const handleNextClick = () => {
    let topicDetails = selectedTopics.map((topic) => {
      return {
        topic_id: topic.topicId,
        topic_name: topic.topicName,
        topic_sequence_day: topic.topicSequenceDay,
        control_no: topic.controlNo,
      };
    });
    if (shop?.id && plant?.plant_name) {
      var cred = getUser()?.username.split("\\");
      if (cred) {
        let userId;
        let userName;
        if (cred.length === 1) {
          userId = cred[0];
          userName = cred[0];
        } else {
          userId = cred[0] + "%5C" + cred[1];
          userName = cred[1];
        }
        var payload = {
          shop_id: shop?.id.toString(),
          shop_name: shop?.shop_name,
          plant_name: plant?.plant_name,
          trainee_type: activeTrainingPlan.toLowerCase().substring(0, 10), //It will always operator for Department Change trainings
          trainer_id: userId,
          trainer_name: userName,
          trainer_email: getUser().email,
          topic_details: topicDetails,
          training_type: "Refresher",
        };
        dispatch(createNewTraininigBatch(payload));
        handleNext(activeTrainingPlan);
        setTopics(topicDetails);
      }
    }
  };
  return (
    <Fragment>
      <Paper sx={{ my: 1, p: 1.6 }}>
        <Typography variant="h4">Step 1 - Select Topic(s)</Typography>
        {loading ? (
          <Skeleton
            className={`${classes["master-table"]} ${classes["repository-table-dimensions"]}`}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            className={`${classes["master-table"]} ${classes["repository-table-dimensions"]}`}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: "300px",
                width: "fit-content",
                gap: "1rem",
              }}
            >
              <Typography variant="silverTitle">Attendee Type:</Typography>
              <CustomToggleButton
                selected={activeTrainingPlan}
                labels={["Operator", "Supervisor & Above"]}
                onChange={handleActiveTrainingPlan}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "1rem",
              }}
            >
              <Typography variant="silverTitle">
                Select Refresher Training Topic
              </Typography>
              <CustomMultiSelect
                options={filteredTopics}
                selected={selectedTopics}
                handleSelect={(item) => {
                  setSelectedTopics(item);
                }}
              />
            </Box>
          </Box>
        )}
      </Paper>
      <Box sx={{ pb: "2rem" }}>
        <Footer
          handleNext={handleNextClick}
          handleCancel={() => {
            setShowAlert(true);
          }}
          cancelLabel="Cancel Training"
          nextLabel={"Next"}
          nextDisabled={Object.values(selectedTopics).every(
            (item) => Array.isArray(item) && item.length === 0
          )}
        />
      </Box>
      {showAlert && (
        <ConfirmationDialog
          openConfirm={showAlert}
          handleChoice={() => {
            navigate("/SMM");
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
    </Fragment>
  );
};
export default SelectTopic;
