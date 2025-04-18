import {
  Box,
  Breadcrumbs,
  Link,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../../../../../services/Authorization/AuthorizationService";
import Alert from "../../../../../Utilities/Snackbar/Snackbar";
import CustomStepper from "../../../../components/Stepper/CustomStepper";
import { setClassroomTrainingCreatedBatchId } from "../../../../redux/ActionCreator/ClassroomActionCreator";
import {
  setAlert,
  setAlertStatus,
} from "../../../../redux/Actions/AlertActions";
import { createNewTraininigBatch } from "../../../../redux/Actions/ClassroomAction";
import {
  getAlertMessage,
  getAlertStatus,
} from "../../../../redux/Reducers/SMMAlertReducer";
import { getTrainingTopicList } from "../../../../redux/Reducers/SMMClassroomReducer";
import { getPlant, getShop } from "../../../../redux/Reducers/SMMShopReducer";
import { SMMTheme } from "../../../../Theme/theme";
import useStyles from "../../../styles";
import DeliverTraining from "../../components/DeliverTraining/DeliverTraining";
import RecordAttendance from "../../components/RecordAttendance/RecordAttendance";
const NewJoinee = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const alertMessage = useSelector(getAlertMessage);
  const isAlert = useSelector(getAlertStatus);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [isAddDisabled, setAddDisabled] = useState(false);
  const shop = useSelector(getShop);
  const { state } = useLocation();
  const topicData = useSelector(getTrainingTopicList);
  const plant = useSelector(getPlant);
  useEffect(() => {
    if (
      Array.isArray(topicData?.topicsPlan) &&
      topicData?.topicsPlan.length > 0
    ) {
      let topicDetails = topicData?.topicsPlan.map((topic) => {
        return {
          topic_id: topic.topicId,
          topic_name: topic.topicName,
          topic_sequence_day: topic.topicSequenceDay,
          control_no: topic.controlNo,
        };
      });
      setSelectedTopics(topicDetails);
      if (shop?.id && plant?.plant_name && !state?.trainingBatchId) {
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
            training_type: "New joinee",
          };
          dispatch(createNewTraininigBatch(payload));
        }
      }
    }
  }, [topicData,state]);
  useEffect(() => {
    if (state?.stepValue?.toString()) {
      dispatch(
        setClassroomTrainingCreatedBatchId({
          trainingBatchId: state?.trainingBatchId,
        })
      );
      if (state?.stepValue === 1) {
        setAddDisabled(true);
      }
      setActiveStep(state?.stepValue);
    }
  }, [state, state?.trainingBatchId]);

  useEffect(() => {
    if (!shop?.id) {
      navigate("/SMM");
    }
  }, []);

  const handleAlertClose = () => {
    dispatch(setAlert(""));
    dispatch(setAlertStatus(false));
  };
  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setActiveStep((prev) => prev - 1);
  };

  const steps = [
    {
      title: "Step 1",
      subtitle: "Record Attendance",
    },
    {
      title: "Step 2",
      subtitle: "Deliver Training & Evaluate",
    },
  ];
  const RenderSteps = ({ step }) => {
    switch (step) {
      case 0:
        return (
          <RecordAttendance
            handleNext={() => {
              handleNext();
              setAddDisabled(true);
            }}
            selectedTopics={selectedTopics}
            isAddDisabled={isAddDisabled}
            setAttendees={(attendees) => setSelectedAttendees(attendees)}
            trainingType={"New joinee"}
          />
        );
      case 1:
        return (
          <DeliverTraining
            handleNext={handleNext}
            handlePrev={handlePrev}
            trainingType={"New joinee"}
          />
        );
      default:
        return null;
    }
  };
  const navigateToNewJoinee = () => {
    navigate("/SMM");
    dispatch(setClassroomTrainingCreatedBatchId({}));
  };
  return (
    <ThemeProvider theme={SMMTheme}>
      <Box sx={{ p: "2rem 7rem 0rem 7rem" }}>
        <Box className={classes["container-flex"]} sx={{ minWidth: "90vw" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="Blue.main" href={"/SMM"}>
              Classroom Training
            </Link>
            <Link
              color="Blue.main"
              sx={{ cursor: "pointer" }}
              onClick={navigateToNewJoinee}
            >
              New Joinee Training
            </Link>
            <Typography color="Silver.dark">
              New Joinee Training Batch
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ mb: 0 }} className={classes["container-flex"]}>
              <Box
                className={classes["container-flex"]}
                sx={{ width: "fit-content", gap: "8rem" }}
              >
                <Typography variant="h2">New Joinee Training Batch</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <CustomStepper
                steps={steps}
                activeStep={activeStep}
                disableLastStep={!selectedAttendees?.length}
              />
            </Box>
            <RenderSteps step={activeStep} />
          </Box>
        </Box>
        <Alert
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={isAlert}
          onClose={handleAlertClose}
          message={alertMessage}
        />
      </Box>
    </ThemeProvider>
  );
};
export default NewJoinee;
