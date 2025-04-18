import {
  createClassroomTrainingBatch,
  fetchAttendeesBatchDetails,
  fetchAttendeesDetailsData,
  fetchAttendeesTrainingRecord,
  fetchBatchTopicsApi,
  fetchReattemptStatusApi,
  fetchRefresherOngoingBatchData,
  fetchRefresherStaffDetails,
  fetchRefresherTrainingPlanData,
  fetchStaffSearchApi,
  fetchTopicByTrainingType,
  markAttendance,
  saveTopicCompletedApi,
  updateBatchApi,
  updateTopicStatusApi,
  fetchTestViewData,
  deleteBatchApi,
  trainerEvaluationSubmit,
  fetchTrainerTest,
  submitTest,
  pendingBatchApi,
} from "../../Repository/ClassroomRepository";
import {
  setAlertMessage,
  setIsAlert,
} from "../ActionCreator/AlertActionCreator";
import {
  fetchBatchTopicsDataAction,
  fetchBatchTopicsLoadingAction,
  fetchStaffSearchDataAction,
  fetchStaffSearchLoadingAction,
  reattemptStatusDataAction,
  reattemptStatusLoadingAction,
  saveTopicCompletedDataAction,
  saveTopicCompletedLoadingAction,
  setAttendeeDetailsData,
  setAttendeeDetailsLoading,
  setAttendeesTrainingRecord,
  setAttendeesTrainingRecordLoading,
  setBatchDetailsData,
  setBatchDetailsLoading,
  setClassroomTrainingCreateBatchStatus,
  setClassroomTrainingCreatedBatchId,
  setMarkAttendance,
  setMarkAttendanceLoading,
  setOngoingBatchData,
  setOngoingBatchLoading,
  setRefresherStaffData,
  setRefresherStaffDataLoading,
  setRefresherTrainingTopics,
  setRefresherTrainingTopicsLoading,
  setTrainingPlanData,
  setTrainingPlanLoading,
  updateBatchDataAction,
  updateBatchLoadingAction,
  updateTopicStatusDataAction,
  updateTopicStatusLoadingAction,
  setTestViewData,
  setTestViewLoading,
  deleteBatchAction,
  setSubmitTrainerEvaluationLoading,
  setSubmitTrainerEvaluation,
  setTrainerTestData,
  setTrainerTestDataLoading,
  setSubmitTestData,
  setSubmitTestDataLoading,
  deleteBatchLoadingAction,
  setPendingBatchLoading,
  setPendingBatchData,
} from "../ActionCreator/ClassroomActionCreator";
import axios from "axios";
export const fetchTrainingPlanData =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setTrainingPlanLoading(true));
      }
      const res = await fetchRefresherTrainingPlanData(payload);
      //console.log("Training Plan Data:", res);
      dispatch(setTrainingPlanData(res.data.response));
      if (dispatchApiStatus) {
        dispatch(setTrainingPlanLoading(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
        } else {
          dispatch(setAlertMessage(ex?.message));
        }
        dispatch(setIsAlert(true));
      }
    }
  };

export const fetchOngoingBatchData =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setOngoingBatchLoading(true));
      }
      const res = await fetchRefresherOngoingBatchData(payload);
      // console.log("Ongoing batch data response:", res);
      dispatch(setOngoingBatchData(res.data.response.ongoingBatch));

      if (dispatchApiStatus) {
        dispatch(setOngoingBatchLoading(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
          dispatch(setIsAlert(true));
          dispatch(setOngoingBatchLoading(false));
        } else if (axios.isCancel(ex)) {
          //dispatch(setAlertMessage("AXIOS ERROR"));
          // console.log("AXIOS CANCELLED!");
        } else {
          dispatch(setAlertMessage(ex?.message));
          dispatch(setIsAlert(true));
          dispatch(setOngoingBatchLoading(false));
        }
      }
    }
  };

//attendee details
export const fetchAttendeeDetailsData =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setAttendeeDetailsLoading(true));
      }
      const res = await fetchAttendeesDetailsData(payload);
      dispatch(setAttendeeDetailsData(res.data.response));

      if (dispatchApiStatus) {
        dispatch(setAttendeeDetailsLoading(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
        } else {
          dispatch(setAlertMessage(ex?.message));
        }
        dispatch(setIsAlert(true));
      }
    }
  };

export const fetchAttendeeBatchDetailsData =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setBatchDetailsLoading(true));
      }
      const res = await fetchAttendeesBatchDetails(payload);
      // console.log("Attendee Batch Details data response:", res);
      dispatch(setBatchDetailsData(res.data.response));

      if (dispatchApiStatus) {
        dispatch(setBatchDetailsLoading(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
        } else {
          dispatch(setAlertMessage(ex?.message));
        }
        dispatch(setIsAlert(true));
      }
    }
  };

//

export const fetchRefresherStaffData =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setRefresherStaffDataLoading(true));
      }
      const res = await fetchRefresherStaffDetails(payload);

      dispatch(setRefresherStaffData(res.data.response));

      if (dispatchApiStatus) {
        dispatch(setRefresherStaffDataLoading(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
        } else {
          dispatch(setAlertMessage(ex?.message));
        }
        dispatch(setIsAlert(true));
      }
    }
  };
//New Refresher Training fetch traininig topic
export const fetchNewRefresherTrainingTopic =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setRefresherTrainingTopicsLoading(true));
      }
      const res = await fetchTopicByTrainingType(payload);
      // console.log("Training TOPIC RESPONSE",res.data.response);
      dispatch(setRefresherTrainingTopics(res.data.response));

      if (dispatchApiStatus) {
        dispatch(setRefresherTrainingTopicsLoading(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
        } else {
          dispatch(setAlertMessage(ex?.message));
        }
        dispatch(setIsAlert(true));
      }
    }
  };

//Create New Training Batch
export const createNewTraininigBatch =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setClassroomTrainingCreateBatchStatus("INPROGRESS"));
      }
      const res = await createClassroomTrainingBatch(payload);
      //  console.log("Training TOPIC RESPONSE",res.data.response);
      dispatch(setClassroomTrainingCreatedBatchId(res.data.response));

      if (dispatchApiStatus) {
        dispatch(setClassroomTrainingCreateBatchStatus("COMPLETED"));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
        } else {
          dispatch(setAlertMessage(ex?.message));
        }
        dispatch(setIsAlert(true));
        dispatch(setClassroomTrainingCreateBatchStatus("FAILED"));
      }
    }
  };

// Attendees Training Record
export const fetchAttendeesRecord =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setAttendeesTrainingRecordLoading(true));
      }
      const res = await fetchAttendeesTrainingRecord(payload);
      dispatch(setAttendeesTrainingRecord(res.data.response));

      if (dispatchApiStatus) {
        dispatch(setAttendeesTrainingRecordLoading(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        dispatch(setAttendeesTrainingRecordLoading(false));
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
        } else {
          dispatch(setAlertMessage(ex?.message));
        }
        dispatch(setIsAlert(true));
      }
    }
  };

// Mark Attendance
export const markAttendanceUpdate =
  (payload, isDelete = false, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setMarkAttendanceLoading(true));
      }
      const res = await markAttendance(payload, isDelete);
      dispatch(
        setMarkAttendance({ ...res.data.response, responseCode: "SMM200" })
      );

      if (dispatchApiStatus) {
        dispatch(setMarkAttendanceLoading(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        dispatch(setMarkAttendanceLoading(false));
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
        } else {
          dispatch(setAlertMessage(ex?.message));
        }
        dispatch(setIsAlert(true));
      }
    }
  };
// Update Batch
export const updateBatchApiAction =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(updateBatchLoadingAction(true));
      }
      const res = await updateBatchApi(payload);
      dispatch(
        updateBatchDataAction({ ...res.data.response, responseCode: "SMM200" })
      );
      if (dispatchApiStatus) {
        dispatch(updateBatchLoadingAction(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        dispatch(updateBatchLoadingAction(false));
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
        } else {
          dispatch(setAlertMessage(ex?.message));
        }
        dispatch(setIsAlert(true));
      }
    }
  };

// Batch Topics
export const fetchBatchTopicsApiAction =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(fetchBatchTopicsLoadingAction(true));
      }
      const res = await fetchBatchTopicsApi(payload);
      dispatch(fetchBatchTopicsDataAction(res.data.response));
      if (dispatchApiStatus) {
        dispatch(fetchBatchTopicsLoadingAction(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        dispatch(fetchBatchTopicsLoadingAction(false));
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
        } else {
          dispatch(setAlertMessage(ex?.message));
        }
        dispatch(setIsAlert(true));
      }
    }
  };

// Update Topic Status
export const updateTopicStatusApiAction =
  (payload, type, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(updateTopicStatusLoadingAction(true));
      }
      const res = await updateTopicStatusApi(payload);
      dispatch(
        updateTopicStatusDataAction({
          ...res.data.response,
          responseCode: "SMM200",
          type: type,
        })
      );
      if (dispatchApiStatus) {
        dispatch(updateTopicStatusLoadingAction(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        dispatch(updateTopicStatusLoadingAction(false));
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
        } else {
          dispatch(setAlertMessage(ex?.message));
        }
        dispatch(setIsAlert(true));
      }
    }
  };

// Reattempt Status
export const reattemptStatusApiAction = (payload) => async (dispatch) => {
  try {
    dispatch(reattemptStatusLoadingAction(true));
    const res = await fetchReattemptStatusApi(payload);
    dispatch(reattemptStatusDataAction(res.data.response));
    dispatch(reattemptStatusLoadingAction(false));
  } catch (ex) {
    dispatch(reattemptStatusLoadingAction(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};

// Fetch Staffs
export const fetchStaffSearchData = (payload) => async (dispatch) => {
  try {
    dispatch(fetchStaffSearchLoadingAction(true));
    const res = await fetchStaffSearchApi(payload);
    dispatch(fetchStaffSearchDataAction(res.data.response));
    dispatch(fetchStaffSearchLoadingAction(false));
  } catch (ex) {
    dispatch(fetchStaffSearchLoadingAction(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};

// Save Topic Completed
export const saveTopicCompletedApiAction = (payload) => async (dispatch) => {
  try {
    dispatch(saveTopicCompletedLoadingAction(true));
    const res = await saveTopicCompletedApi(payload);
    dispatch(
      saveTopicCompletedDataAction({
        ...res.data.response,
        responseCode: "SMM200",
      })
    );
    dispatch(saveTopicCompletedLoadingAction(false));
  } catch (ex) {
    dispatch(saveTopicCompletedLoadingAction(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};

//Test Attempt View Details
export const fetchTestView = (payload) => async (dispatch) => {
  try {
    dispatch(setTestViewLoading(true));
    const res = await fetchTestViewData(payload);
    dispatch(setTestViewData(res.data.response));

    dispatch(setTestViewLoading(false));
  } catch (ex) {
    dispatch(setTestViewLoading(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};

//Delete Batch
export const deleteBatchApiAction = (payload) => async (dispatch) => {
  try {
    dispatch(deleteBatchLoadingAction(true));
    const res = await deleteBatchApi(payload);
    dispatch(deleteBatchAction(res.data));
    dispatch(deleteBatchLoadingAction(false));
  } catch (ex) {
    dispatch(deleteBatchLoadingAction(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};

//Submit Trainer Evalution
export const submitEvaluationTrainer =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setSubmitTrainerEvaluationLoading(true));
      }
      const res = await trainerEvaluationSubmit(payload);
      console.log("Submit Evaluation Data response:", res);
      dispatch(setSubmitTrainerEvaluation(res.data));

      if (dispatchApiStatus) {
        dispatch(setSubmitTrainerEvaluationLoading(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        if (ex?.response?.status === 409) {
          dispatch(setAlertMessage(ex?.response?.data?.message));
        } else {
          dispatch(setAlertMessage(ex?.message));
        }
        dispatch(setIsAlert(true));
        dispatch(setSubmitTrainerEvaluationLoading(false));
      }
    }
  };

//Trainer Test Paper
export const fetchTrainerTestData = (payload) => async (dispatch) => {
  try {
    dispatch(setTrainerTestDataLoading(true));
    const res = await fetchTrainerTest(payload);
    dispatch(setTrainerTestData(res.data.response));

    dispatch(setTrainerTestDataLoading(false));
  } catch (ex) {
    dispatch(setTrainerTestDataLoading(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};
//Submit Test Paper Filled By Trainer
export const submitTestData = (payload) => async (dispatch) => {
  try {
    dispatch(setSubmitTestDataLoading(true));
    const res = await submitTest(payload);
    dispatch(setSubmitTestData(res.data.message));

    dispatch(setSubmitTestDataLoading(false));
  } catch (ex) {
    dispatch(setSubmitTestDataLoading(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};

// Pending Batch
export const fetchPendingBatchAction = (payload) => async (dispatch) => {
  try {
    dispatch(setPendingBatchLoading(true));
    const res = await pendingBatchApi(payload);
    dispatch(setPendingBatchData(res.data.response));
    dispatch(setPendingBatchLoading(false));
  } catch (ex) {
    dispatch(setPendingBatchLoading(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};
