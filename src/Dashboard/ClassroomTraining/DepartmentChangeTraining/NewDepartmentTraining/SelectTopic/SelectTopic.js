import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../../../../../services/Authorization/AuthorizationService";
import ConfirmationDialog from "../../../../../components/ConfirmationDialog";
import Footer from "../../../../../components/Footer";
import {
  createNewTraininigBatch,
  fetchNewRefresherTrainingTopic,
} from "../../../../../redux/Actions/ClassroomAction";
import {
  getCreateTrainingBatchStatus,
  getTrainingBatchId,
  getTrainingTopicList,
  getTrainingTopicListLoading,
} from "../../../../../redux/Reducers/SMMClassroomReducer";
import {
  getPlant,
  getShop,
} from "../../../../../redux/Reducers/SMMShopReducer";
import useStyles from "../../../../styles";
import CustomMultiSelect from "../../../components/Select/CustomMultiSelect";
const SelectTopic = ({ handleNext, setTopics }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filteredObject, setFilteredObject] = useState({});
  const [selectedTopics, setSelectedTopics] = useState({});
  const plant = useSelector(getPlant);
  const shop = useSelector(getShop);
  const topicData = useSelector(getTrainingTopicList);
  const createBatchStatus = useSelector(getCreateTrainingBatchStatus);
  const loading = useSelector(getTrainingTopicListLoading);
  const trainingBatchId = useSelector(getTrainingBatchId);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (shop?.id) {
      const payload = {
        shop_id: shop?.id,
        training_type: "Department change",
      };
      dispatch(fetchNewRefresherTrainingTopic(payload));
    }
    return () => {
      setFilteredObject({});
      setSelectedTopics({});
    };
  }, []);
  useEffect(() => {
    if (Array.isArray(topicData?.topicsPlan)) {
      let dayObj = {};
      topicData?.topicsPlan.forEach((item) => {
        if (dayObj[item.topicSequenceDay]) {
          dayObj[item.topicSequenceDay].push(item);
        } else {
          dayObj[item.topicSequenceDay] = [];
          dayObj[item.topicSequenceDay].push(item);
        }
      });
      setFilteredObject(dayObj);
      setSelectedTopics(dayObj);
    }
  }, [topicData]);
  const handleMultiselect = (item, day) => {
    setSelectedTopics((prev) => {
      return { ...prev, [day]: item };
    });
  };
  const handleNextClick = () => {
    let topicDetails = []
      .concat(...Object.values(selectedTopics))
      .map((topic) => {
        return {
          topic_id: topic.topicId,
          topic_name: topic.topicName,
          topic_sequence_day: topic.topicSequenceDay,
          control_no: topic.controlNo,
          // trainee_type: topic.planType,
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
          trainee_type: "operator", //It will always operator for Department Change trainings
          trainer_id: userId,
          trainer_name: userName,
          trainer_email: getUser().email,
          topic_details: topicDetails,
          training_type: "Department change",
        };
        dispatch(createNewTraininigBatch(payload));
        handleNext();
        setTopics(topicDetails);
      }
    }
  };
  const checkValidSelection = (topicArray) => {
    // return Object.values(topicArray).every(item => Array.isArray(item) && item.length === 0)
    const checkArrays = Object.values(topicArray).every(
      (current, index, arrays) => {
        if (index === 0) {
          return current.length > 0;
        } else {
          if (current.length > 0) {
            return arrays[index - 1].length > 0;
          } else {
            return arrays[index - 1].length >= 0;
          }
        }
      }
    );
    return !checkArrays;
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
            {
              //TODO: SORT THE KEYS DAYWISE
              Object.keys(filteredObject).map((day) => {
                return (
                  <Box
                    key={day}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      gap: "1rem",
                    }}
                  >
                    <Typography variant="silverTitle">
                      {`Day ${day} Training Topic`}
                    </Typography>
                    <CustomMultiSelect
                      options={filteredObject[day]}
                      selected={
                        Object.keys(selectedTopics).includes(day) > 0
                          ? selectedTopics[day]
                          : []
                      }
                      handleSelect={(item) => handleMultiselect(item, day)}
                    />
                  </Box>
                );
              })
            }
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
          nextDisabled={checkValidSelection(selectedTopics)}
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
