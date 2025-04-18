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
import Alert from "../../../../../Utilities/Snackbar/Snackbar";
import CustomStepper from "../../../../components/Stepper/CustomStepper";
import { setClassroomTrainingCreatedBatchId } from "../../../../redux/ActionCreator/ClassroomActionCreator";
import {
  setAlert,
  setAlertStatus,
} from "../../../../redux/Actions/AlertActions";
import {
  getAlertMessage,
  getAlertStatus,
} from "../../../../redux/Reducers/SMMAlertReducer";
import { SMMTheme } from "../../../../Theme/theme";
import useStyles from "../../../styles";
import DeliverTraining from "../../components/DeliverTraining/DeliverTraining";
import RecordAttendance from "../../components/RecordAttendance/RecordAttendance";
import SelectTopic from "./SelectTopic/SelectTopic";
import {
  getShop,
} from "../../../../redux/Reducers/SMMShopReducer";
const NewDepartmentTraining = (props) => {
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

  const getName = () => "New Department Change Training";

  useEffect(() => {
    if (state?.stepValue?.toString()) {
      dispatch(
        setClassroomTrainingCreatedBatchId({
          trainingBatchId: state?.trainingBatchId,
        })
      );
      if (state?.stepValue === 2) {
        setAddDisabled(true);
      }
      setActiveStep(state?.stepValue);
    }
  }, [state, state?.trainingBatchId]);

  const handleAlertClose = () => {
    dispatch(setAlert(""));
    dispatch(setAlertStatus(false));
  };
  useEffect(() => {
    if(!shop?.id){
      navigate("/SMM");
    }
  }, []);
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
      subtitle: "Select Topic(s)",
    },
    {
      title: "Step 2",
      subtitle: "Record Attendance",
    },
    {
      title: "Step 3",
      subtitle: "Deliver Training & Evaluate",
    },
  ];
  const RenderSteps = ({ step }) => {
    switch (step) {
      case 0:
        return (
          <SelectTopic
            handleNext={handleNext}
            setTopics={(topics) => setSelectedTopics(topics)}
          />
        );
      case 1:
        return (
          <RecordAttendance
            handleNext={() => {
              handleNext();
              setAddDisabled(true);
            }}
            selectedTopics={selectedTopics}
            isAddDisabled={isAddDisabled}
            setAttendees={(attendees) => setSelectedAttendees(attendees)}
            trainingType={"Department change"}
          />
        );
      case 2:
        return (
          <DeliverTraining
            handleNext={handleNext}
            handlePrev={handlePrev}
            trainingType={"Department change"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={SMMTheme}>
      <Box className={classes["outer-container"]}>
        <Box className={classes["container-flex"]} sx={{ minWidth: "90vw" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="Blue.main" href={"/SMM"}>
              Classroom Training
            </Link>
            <Link
              color="Blue.main"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/SMM")}
            >
              Department Change Training
            </Link>
            <Typography color="Silver.dark">{getName()}</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ mb: 0 }} className={classes["container-flex"]}>
              <Box
                className={classes["container-flex"]}
                sx={{ width: "fit-content", gap: "8rem" }}
              >
                <Typography variant="h2">
                  New Department Change Training
                </Typography>
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
export default NewDepartmentTraining;
