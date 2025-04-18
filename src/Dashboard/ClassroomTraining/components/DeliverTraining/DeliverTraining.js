import { Box, Paper, Skeleton, ThemeProvider, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../../../../services/Authorization/AuthorizationService";
import CheckConfirmationDialog from "../../../../components/CheckConfirmationDialog";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import Footer from "../../../../components/Footer";
import {
  deleteBatchAction,
  reattemptStatusDataAction,
  saveTopicCompletedDataAction,
  setClassroomTrainingCreatedBatchId,
  updateTopicStatusDataAction,
} from "../../../../redux/ActionCreator/ClassroomActionCreator";
import {
  deleteBatchApiAction,
  fetchBatchTopicsApiAction,
  reattemptStatusApiAction,
  saveTopicCompletedApiAction,
  updateTopicStatusApiAction,
} from "../../../../redux/Actions/ClassroomAction";
import {
  getBatchTopicsData,
  getBatchTopicsLoading,
  getDeleteBatchData,
  getReattemptStatuscData,
  getSaveTopicCompletedData,
  getSaveTopicCompletedLoading,
  getTrainingBatchId,
  getUpdateTopicData,
  getUpdateTopicLoading,
} from "../../../../redux/Reducers/SMMClassroomReducer";
import { setSubmitTestData } from "../../../../redux/ActionCreator/ClassroomActionCreator";
import { getShop } from "../../../../redux/Reducers/SMMShopReducer";
import { SMMTheme } from "../../../../Theme/theme";
import useStyles from "../../../styles";
import AttendeesList from "./components/AttendeesList/AttendeesList";
import TrainingTopics from "./components/TrainingTopics/TrainingTopics";

const DeliverTraining = ({ handleNext, handlePrev, trainingType }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);
  const [showRetestAlert, setShowRetestAlert] = useState(false);
  const [selectedTrainingId, setSelectedTrainingId] = useState("");
  const [isTopicDelivered, setTopicDelivered] = useState(false);
  const [isPostTraining, setPostTraining] = useState(false);
  const [isPostTrainingCompleted, setPostTrainingCompleted] = useState(false);
  const [batchData, setBatchData] = useState();
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
  const [isReattemptApplied, setReattemptApplied] = useState(false);
  const [showPostCheckAlert, setShowPostCheckAlert] = useState(false);
  const [totalNoOfDays, setTotalNoOfDays] = useState();
  const [isfilledBy, setIsFilledBy] = useState("");
  const [attemptCount, setAttemptCount] = useState("");
  const [postTestAttempt, setPostTestAttempt] = useState("");
  const shop = useSelector(getShop);
  const { trainingBatchId } = useSelector(getTrainingBatchId);
  const loadingBatchTopics = useSelector(getBatchTopicsLoading);
  const batchTopicsData = useSelector(getBatchTopicsData);
  const loadingUpdateTopic = useSelector(getUpdateTopicLoading);
  const updateTopicData = useSelector(getUpdateTopicData);
  const loadingSaveTopicCompleted = useSelector(getSaveTopicCompletedLoading);
  const saveTopicCompletedData = useSelector(getSaveTopicCompletedData);
  const reattemptStatusData = useSelector(getReattemptStatuscData);
  const deleteBatchData = useSelector(getDeleteBatchData);

  useEffect(() => {
    fetchBatchDetails();
    dispatch(setSubmitTestData(""));
  }, [trainingBatchId]);

  useEffect(() => {
    if (batchTopicsData?.batchData?.topicsData) {
      setSelectedTrainingId("");
      setTotalNoOfDays(batchTopicsData?.batchData?.totalNoOfDays || 1);
      const data = batchTopicsData?.batchData?.topicsData || [];
      setBatchData(data);
      if (data?.length) {
        const filterNotDelivered = data?.filter(
          (topic) => topic?.topicStatus !== "COMPLETED"
        );
        const daysArr = Array.from(
          Array(batchTopicsData?.batchData?.totalNoOfDays || 1).keys()
        );
        if (daysArr?.length > 1) {
          filterNotDelivered?.sort((a, b) =>
            b?.topicSequenceDay > a?.topicSequenceDay ? -1 : 1
          );
        }
        const id = filterNotDelivered?.[0]?.trainingId || data?.[0]?.trainingId;
        const trainingFilledBy =
          filterNotDelivered?.[0]?.filledBy || data?.[0]?.filledBy; //trainee or trainer
        setIsFilledBy(trainingFilledBy);
        setSelectedTrainingId(id);
        fetchReattemptStatus(id, data);
      }
    }
  }, [batchTopicsData]);

  useEffect(() => {
    if (selectedTrainingId) {
      const staffDetails = getStaffData()?.staffDetails;
      const filterPostNotAttempted = staffDetails?.filter(
        (batch) => !batch?.postTestAttempt
      );
      if (!filterPostNotAttempted?.length) {
        setTopicDelivered(true);
      } else {
        setTopicDelivered(false);
      }
      const filterPreNotAttempted = staffDetails?.filter(
        (batch) => !batch?.preTestAttempt || batch?.preTestStatus === "Pending"
      );
      if (
        !getStaffData()?.testType?.includes("PRE") ||
        !filterPreNotAttempted?.length
      ) {
        setPostTraining(true);
      } else {
        setPostTraining(false);
      }
      const filterPostFailStatus = staffDetails?.filter(
        (batch) =>
          !batch?.postTestAttempt ||
          batch?.postTestStatus === "Fail" ||
          batch?.postTestStatus === "Pending"
      );
      setPostTrainingCompleted(!filterPostFailStatus?.length);
    }
  }, [selectedTrainingId, batchData]);

  useEffect(() => {
    if (selectedTrainingId && batchTopicsData?.batchData?.topicsData) {
      const selectedTopicData = batchTopicsData.batchData.topicsData.find(
        (topic) => topic.trainingId === selectedTrainingId
      );
      const attemptCount = selectedTopicData?.attempt_count;
      const postTestAttempt = selectedTopicData?.staffDetails?.map(
        (staff) => staff.postTestAttempt
      );
      setAttemptCount(attemptCount);
      setPostTestAttempt(postTestAttempt);
    }
  }, [selectedTrainingId, batchTopicsData]);

  useEffect(() => {
    if (updateTopicData && updateTopicData?.responseCode === "SMM200") {
      if (isfilledBy === "Trainer") {
        setReattemptApplied(false);
        setSelectedTrainingId("");
        fetchBatchDetails();
      } else {
        if (updateTopicData?.type === "viewQR") {
          handleOpenQrCode();
        }
        if (updateTopicData?.type === "retest") {
          setShowRetestAlert(false);
          setReattemptApplied(true);
          fetchReattemptStatus();
        }
      }
      dispatch(updateTopicStatusDataAction({}));
    }
  }, [updateTopicData]);

  useEffect(() => {
    if (
      saveTopicCompletedData &&
      saveTopicCompletedData?.responseCode === "SMM200"
    ) {
      const data = batchData.filter(
        (item) => item?.topicStatus !== "COMPLETED"
      );
      if (data?.length > 1) {
        fetchBatchDetails();
        setShowConfirmationAlert(true);
      } else {
        navigate("/SMM");
      }
      dispatch(saveTopicCompletedDataAction({}));
    }
  }, [saveTopicCompletedData]);

  useEffect(() => {
    if (deleteBatchData && deleteBatchData?.responseCode === "SMM200") {
      dispatch(deleteBatchAction({}));
      dispatch(setClassroomTrainingCreatedBatchId({}));
      navigate("/SMM");
    }
  }, [deleteBatchData]);

  const fetchBatchDetails = () => {
    const payload = {
      shop_id: shop?.id?.toString(),
      batch_id: trainingBatchId,
    };
    dispatch(fetchBatchTopicsApiAction(payload));
  };

  const fetchReattemptStatus = (id, data) => {
    const trainingId = id || selectedTrainingId;
    const topicName = getTopicName(trainingId, data);
    const testType = getStaffData(id, data)?.testType;
    if (trainingId && topicName && testType) {
      dispatch(reattemptStatusDataAction({}));
      const payload = {
        shop_id: shop?.id?.toString(),
        training_id: trainingId,
        training_topic_name: topicName,
        evaluation: testType,
        // evaluation: testType.replace("+", "%2B"),
      };
      dispatch(reattemptStatusApiAction(payload));
    }
  };

  const handleTrainingClick = (id, filledBy) => {
    setIsFilledBy(filledBy);
    setSelectedTrainingId(id);
    fetchReattemptStatus(id);
    setReattemptApplied(false);
  };

  const handleEnableRetest = () => {
    const failedCount = getStaffData()?.staffDetails?.filter(
      (batch) => batch?.postTestStatus === "Fail"
    );
    const payload = {
      shop_id: shop?.id?.toString(),
      topic_name: getStaffData()?.trainingTopicName,
      training_id: selectedTrainingId,
      is_reattempt_enabled: true,
      failed_count: failedCount?.length,
    };
    updateTopicsStatusCall(payload, "retest");
    setShowRetestAlert(false);
  };

  const getTopicName = (id, data) => {
    const checkData = data || batchData;
    const filter = checkData?.filter((item) => item?.trainingId === id);
    return filter?.[0]?.trainingTopicName || "";
  };

  const handleViewTestQR = () => {
    if (isPostTraining) {
      setShowPostCheckAlert(true);
    } else {
      updateTopicStatusCall();
    }
  };

  const updateTopicStatusCall = () => {
    const payload = {
      shop_id: shop?.id?.toString(),
      topic_name: getStaffData()?.trainingTopicName,
      training_id: selectedTrainingId,
      training_batch_id: trainingBatchId,
      evaluation_type: isPostTraining ? "post" : "pre",
    };
    updateTopicsStatusCall(payload, "viewQR");
  };

  const updateTopicsStatusCall = (info, type) => {
    dispatch(updateTopicStatusApiAction(info, type));
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

  const handleOpenQrCode = () => {
    const qrId = Date.now().toString(36);
    const dataToSend = {
      userName: getUserDetails()?.userName,
      shopId: shop?.id?.toString(),
      userId: getUserDetails()?.userId,
      trainingType: trainingType,
      batchId: trainingBatchId,
      flow: "test",
      testType: isPostTraining ? "post-training" : "pre-training",
      trainingId: selectedTrainingId,
      trainingTopicName: getStaffData()?.trainingTopicName,
      masterTopicId: getStaffData()?.masterTopicId,
      info: `${getStaffData()?.trainingTopicName} ${
        isPostTraining ? "Post" : "Pre"
      }-Training Test QR Code`,
    };
    // Store the data in localStorage
    sessionStorage.setItem(qrId, JSON.stringify(dataToSend));
    window.open(`/SMM/QRCode?qr=${[qrId]}`, "_blank");
  };

  const handleSaveEvaluation = () => {
    const payload = {
      shop_id: shop?.id?.toString(),
      training_batch_id: trainingBatchId,
      topic_name: getStaffData()?.trainingTopicName,
      training_id: selectedTrainingId,
    };
    dispatch(saveTopicCompletedApiAction(payload));
  };

  const getStaffData = (id, data) => {
    const selectedId = id || selectedTrainingId;
    const checkData = data || batchData;
    const filter = checkData?.filter((item) => item?.trainingId === selectedId);
    return filter?.[0] || {};
  };

  const getAllTopicCompleted = () => {
    const notCompleted = batchData?.filter(
      (topic) => topic?.topicStatus !== "COMPLETED"
    );
    if (notCompleted?.length <= 1) {
      const data = getStaffData(notCompleted?.[0]?.trainingId);
      const filterPostFailStatus = data?.staffDetails?.filter(
        (batch) =>
          !batch?.postTestAttempt ||
          batch?.postTestStatus === "Fail" ||
          batch?.postTestStatus === "Pending"
      );
      return !filterPostFailStatus?.length;
    }
    return false;
  };

  const getSaveButtonState = () => {
    if (loadingBatchTopics || loadingSaveTopicCompleted || loadingUpdateTopic) {
      return true;
    } else if (
      isPostTraining &&
      isPostTrainingCompleted &&
      getStaffData()?.topicStatus !== "COMPLETED"
    ) {
      return false;
    } else if (
      getStaffData()?.staffDetails?.every(
        (obj) => obj?.postTestStatus === "Pass"
      )
    ) {
      return false;
    }
    return true;
  };

  const getLoadingState = () => {
    if (loadingBatchTopics || loadingSaveTopicCompleted || loadingUpdateTopic) {
      return true;
    }
    return false;
  };

  const handleCancelTraining = () => {
    const payload = {
      shop_id: shop?.id?.toString(),
      training_batch_id: trainingBatchId,
    };
    dispatch(deleteBatchApiAction(payload));
    setShowAlert(false);
  };

  return (
    <ThemeProvider theme={SMMTheme}>
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
            <Typography variant="h4">
              {`Step ${
                trainingType === "New joinee" ? 2 : 3
              } - Deliver Training And Evaluate`}
            </Typography>
          </Box>
          {getLoadingState() ? (
            <Skeleton
              className={`${classes["details-table-dimensions"]}`}
              animation="wave"
              variant="rectangular"
            />
          ) : (
            <Box className={classes["container-flex"]}>
              <TrainingTopics
                batchData={batchData}
                selectedTrainingId={selectedTrainingId}
                handleTrainingClick={handleTrainingClick}
                totalNoOfDays={totalNoOfDays}
              />
              <AttendeesList
                topicFilledBy={isfilledBy}
                staffData={getStaffData()}
                isTopicDelivered={isTopicDelivered}
                isPostTraining={isPostTraining}
                isPostTrainingCompleted={isPostTrainingCompleted}
                reattemptStatusData={reattemptStatusData}
                isReattemptApplied={isReattemptApplied}
                handleRetestPress={() => setShowRetestAlert(true)}
                handleViewTestQR={handleViewTestQR}
                handleReattemptSuccessClose={() => setReattemptApplied(false)}
                handleRefresh={() => {
                  setReattemptApplied(false);
                  setSelectedTrainingId("");
                  fetchBatchDetails();
                }}
                trainingType={trainingType}
                attemptCount={attemptCount}
                postTestAttempt={postTestAttempt}
              />
            </Box>
          )}
        </Paper>
        <Box sx={{ pb: "2rem" }}>
          <Footer
            prevLabel={"Previous"}
            handlePrev={handlePrev}
            handleCancel={() => {
              setShowAlert(true);
            }}
            cancelLabel={"Cancel Training"}
            saveLabel={getAllTopicCompleted() ? "Complete Training" : "Save"}
            handleNext={handleSaveEvaluation}
            nextDisabled={
              getAllTopicCompleted()
                ? getLoadingState()
                  ? true
                  : false
                : getSaveButtonState()
            }
            currentStep={2}
          />
        </Box>
        {showAlert && (
          <ConfirmationDialog
            openConfirm={showAlert}
            handleChoice={handleCancelTraining}
            handleClose={() => setShowAlert(false)}
            headerText={"Cancel Training"}
            confirmButtonText={"Cancel Training"}
            highlightedText={"permanently delete"}
            infoText={
              "Cancelling this training will permanently delete the entire batch, along with all attendee and test data. Are you sure you want to proceed with the deletion?"
            }
          />
        )}
        {showRetestAlert && (
          <ConfirmationDialog
            openConfirm={showRetestAlert}
            handleChoice={handleEnableRetest}
            handleClose={() => setShowRetestAlert(false)}
            headerText={
              isfilledBy === "Trainer"
                ? "Enable Re-evaluation"
                : "Enable Re-test"
            }
            confirmButtonText={
              isfilledBy === "Trainer"
                ? "Enable Re-evaluation"
                : "Enable Re-test"
            }
            infoText={
              isfilledBy === "Trainer"
                ? "By enabling re-evaluation, you are confirming that retraining has been completed for operators who have failed the test. Are you sure you want to proceed?"
                : "Operators can retake the test only after undergoing retraining. Enabling re-test confirms retraining completion. Are you sure you want to proceed?"
            }
          />
        )}
        {showConfirmationAlert && (
          <ConfirmationDialog
            openConfirm={showConfirmationAlert}
            handleChoice={() => {
              dispatch(setClassroomTrainingCreatedBatchId({}));
              navigate("/SMM");
            }}
            handleClose={() => setShowConfirmationAlert(false)}
            headerText={"Confirmation"}
            cancelLabel={"Yes"}
            confirmButtonText={"Go to home screen"}
            infoText={"Continue to the next training topic?"}
          />
        )}
        {showPostCheckAlert && (
          <CheckConfirmationDialog
            openConfirm={showPostCheckAlert}
            handleChoice={() => {
              updateTopicStatusCall();
              setShowPostCheckAlert(false);
            }}
            handleClose={() => setShowPostCheckAlert(false)}
            headerText={"Training Delivery Confirmation"}
            confirmButtonText={
              isfilledBy === "Trainer"
                ? "Enable Evaluation"
                : "View Post-Training Test QR Code"
            }
            infoText={`I acknowledge that all instructions related to ${
              getStaffData()?.trainingTopicName
            } have been delivered.`}
          />
        )}
      </Fragment>
    </ThemeProvider>
  );
};
export default DeliverTraining;
