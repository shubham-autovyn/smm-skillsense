import {
  SMM_CLASSROOM_TRAINING_ATTENDEES_RECORD_DATA,
  SMM_CLASSROOM_TRAINING_ATTENDEES_RECORD_LOADING,
  SMM_CLASSROOM_TRAINING_BATCH_TOPICS_DATA,
  SMM_CLASSROOM_TRAINING_BATCH_TOPICS_LOADING,
  SMM_CLASSROOM_TRAINING_FETCH_STAFF_SEARCH_DATA,
  SMM_CLASSROOM_TRAINING_FETCH_STAFF_SEARCH_LOADING,
  SMM_CLASSROOM_TRAINING_MARK_ATTENDANCE_LOADING,
  SMM_CLASSROOM_TRAINING_MARK_ATTENDANCE_STATUS,
  SMM_CLASSROOM_TRAINING_REATTEMPT_STATUS_DATA,
  SMM_CLASSROOM_TRAINING_REATTEMPT_STATUS_LOADING,
  SMM_CLASSROOM_TRAINING_SAVE_TOPIC_COMPLETED_DATA,
  SMM_CLASSROOM_TRAINING_SAVE_TOPIC_COMPLETED_LOADING,
  SMM_CLASSROOM_TRAINING_UPDATE_BATCH_DATA,
  SMM_CLASSROOM_TRAINING_UPDATE_BATCH_LOADING,
  SMM_CLASSROOM_TRAINING_UPDATE_TOPICS_STATUS_DATA,
  SMM_CLASSROOM_TRAINING_UPDATE_TOPICS_STATUS_LOADING,
  //Batch Creations
  SMM_SET_CLASSROOM_TRAINING_CREATED_BATCH_ID,
  SMM_SET_CLASSROOM_TRAINING_CREATE_BATCH_STATUS,
  SMM_SET_REFRESHER_ATTENDEE_BATCH_DETAILS,
  SMM_SET_REFRESHER_ATTENDEE_BATCH_DETAILS_LOADING,
  //attendee details
  SMM_SET_REFRESHER_ATTENDEE_DETAILS,
  SMM_SET_REFRESHER_ATTENDEE_DETAILS_LOADING,
  SMM_SET_REFRESHER_ATTENDEE_STAFF_LIST,
  SMM_SET_REFRESHER_ATTENDEE_STAFF_LIST_LOADING,
  SMM_SET_REFRESHER_ONGOING_BATCH_DATA,
  SMM_SET_REFRESHER_ONGOING_BATCH_LOADING,
  SMM_SET_REFRESHER_TRAINING_PLAN,
  //training plan api
  SMM_SET_REFRESHER_TRAINING_PLAN_LOADING,
  //New Refreseher Training
  SMM_SET_REFRESHER_TRAINING_TOPICS,
  SMM_SET_REFRESHER_TRAINING_TOPICS_LOADING,
  SMM_UPDATE_CLASSROOM_TAB_SELECTION,
  //test attempt view
  SMM_CLASSROOM_TRAINING_TEST_VIEW_LOADING,
  SMM_CLASSROOM_TRAINING_TEST_VIEW_DATA,
  SMM_CLASSROOM_TRAINING_DELETE_BATCH,
  //Trainer Evaluation
  SMM_CLASSROOM_TRAINING_SUBMIT_TRAINER_EVALUATION,
  SMM_CLASSROOM_TRAINING_SUBMIT_TRAINER_EVALUATION_LOADING,
  //Trainer Test Paper
  SMM_CLASSROOM_TRAINING_TRAINER_TEST_QUESTION_DATA,
  SMM_CLASSROOM_TRAINING_TRAINER_TEST_QUESTION_DATA_LOADING,
  //Submit Test Paper
  SMM_CLASSROOM_TRAINING_SUBMIT_TEST_DATA,
  SMM_CLASSROOM_TRAINING_SUBMIT_TEST_DATA_LOADING,
  SMM_CLASSROOM_TRAINING_DELETE_BATCH_LOADING,
  SMM_CLASSROOM_TRAINING_PENDING_BATCH_LOADING,
  SMM_CLASSROOM_TRAINING_PENDING_BATCH_DATA,
} from "../ActionTypes/ClassroomActionTypes";
export const setOngoingBatchLoading = (data) => ({
  type: SMM_SET_REFRESHER_ONGOING_BATCH_LOADING,
  payload: data,
});
export const setOngoingBatchData = (data) => ({
  type: SMM_SET_REFRESHER_ONGOING_BATCH_DATA,
  payload: data,
});
export const setTrainingPlanLoading = (data) => ({
  type: SMM_SET_REFRESHER_TRAINING_PLAN_LOADING,
  payload: data,
});
export const setTrainingPlanData = (data) => ({
  type: SMM_SET_REFRESHER_TRAINING_PLAN,
  payload: data,
});
//attendee details
export const setAttendeeDetailsData = (data) => ({
  type: SMM_SET_REFRESHER_ATTENDEE_DETAILS,
  payload: data,
});
export const setAttendeeDetailsLoading = (data) => ({
  type: SMM_SET_REFRESHER_ATTENDEE_DETAILS_LOADING,
  payload: data,
});
export const setBatchDetailsData = (data) => ({
  type: SMM_SET_REFRESHER_ATTENDEE_BATCH_DETAILS,
  payload: data,
});
export const setBatchDetailsLoading = (data) => ({
  type: SMM_SET_REFRESHER_ATTENDEE_BATCH_DETAILS_LOADING,
  payload: data,
});
//
export const setRefresherStaffData = (data) => ({
  type: SMM_SET_REFRESHER_ATTENDEE_STAFF_LIST,
  payload: data,
});
export const setRefresherStaffDataLoading = (data) => ({
  type: SMM_SET_REFRESHER_ATTENDEE_STAFF_LIST_LOADING,
  payload: data,
});
//NEW REFRESHERE TRAINING
export const setRefresherTrainingTopics = (data) => ({
  type: SMM_SET_REFRESHER_TRAINING_TOPICS,
  payload: data,
});
export const setRefresherTrainingTopicsLoading = (data) => ({
  type: SMM_SET_REFRESHER_TRAINING_TOPICS_LOADING,
  payload: data,
});
//CREATE BATCH
export const setClassroomTrainingCreatedBatchId = (data) => ({
  type: SMM_SET_CLASSROOM_TRAINING_CREATED_BATCH_ID,
  payload: data,
});
export const setClassroomTrainingCreateBatchStatus = (data) => ({
  type: SMM_SET_CLASSROOM_TRAINING_CREATE_BATCH_STATUS,
  payload: data,
});
//ATTENDEES RECORD
export const setAttendeesTrainingRecord = (data) => ({
  type: SMM_CLASSROOM_TRAINING_ATTENDEES_RECORD_DATA,
  payload: data,
});
export const setAttendeesTrainingRecordLoading = (data) => ({
  type: SMM_CLASSROOM_TRAINING_ATTENDEES_RECORD_LOADING,
  payload: data,
});
//MARK ATTENDANCE
export const setMarkAttendance = (data) => ({
  type: SMM_CLASSROOM_TRAINING_MARK_ATTENDANCE_STATUS,
  payload: data,
});
export const setMarkAttendanceLoading = (data) => ({
  type: SMM_CLASSROOM_TRAINING_MARK_ATTENDANCE_LOADING,
  payload: data,
});

export const updateClassroomTab = (data) => ({
  type: SMM_UPDATE_CLASSROOM_TAB_SELECTION,
  payload: data,
});

// UPDATE BATCH
export const updateBatchDataAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_UPDATE_BATCH_DATA,
  payload: data,
});
export const updateBatchLoadingAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_UPDATE_BATCH_LOADING,
  payload: data,
});

// BATCH TOPICS
export const fetchBatchTopicsDataAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_BATCH_TOPICS_DATA,
  payload: data,
});
export const fetchBatchTopicsLoadingAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_BATCH_TOPICS_LOADING,
  payload: data,
});

// UPDATE TOPIC STATUS
export const updateTopicStatusDataAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_UPDATE_TOPICS_STATUS_DATA,
  payload: data,
});
export const updateTopicStatusLoadingAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_UPDATE_TOPICS_STATUS_LOADING,
  payload: data,
});

// REATTEMPT STATUS
export const reattemptStatusDataAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_REATTEMPT_STATUS_DATA,
  payload: data,
});
export const reattemptStatusLoadingAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_REATTEMPT_STATUS_LOADING,
  payload: data,
});

// FETCH STAFF
export const fetchStaffSearchDataAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_FETCH_STAFF_SEARCH_DATA,
  payload: data,
});
export const fetchStaffSearchLoadingAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_FETCH_STAFF_SEARCH_LOADING,
  payload: data,
});

// SAVE TOPIC COMPLETED
export const saveTopicCompletedDataAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_SAVE_TOPIC_COMPLETED_DATA,
  payload: data,
});
export const saveTopicCompletedLoadingAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_SAVE_TOPIC_COMPLETED_LOADING,
  payload: data,
});

//TEST ATTEMPT VIEW
export const setTestViewLoading = (data) => ({
  type: SMM_CLASSROOM_TRAINING_TEST_VIEW_LOADING,
  payload: data,
});
export const setTestViewData = (data) => ({
  type: SMM_CLASSROOM_TRAINING_TEST_VIEW_DATA,
  payload: data,
});

//DELETE BATCH
export const deleteBatchAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_DELETE_BATCH,
  payload: data,
});
export const deleteBatchLoadingAction = (data) => ({
  type: SMM_CLASSROOM_TRAINING_DELETE_BATCH_LOADING,
  payload: data,
});
//Evaluation trainer
//Submit Evaluation
export const setSubmitTrainerEvaluation = (data) => ({
  type: SMM_CLASSROOM_TRAINING_SUBMIT_TRAINER_EVALUATION,
  payload: data,
});
export const setSubmitTrainerEvaluationLoading = (data) => ({
  type: SMM_CLASSROOM_TRAINING_SUBMIT_TRAINER_EVALUATION_LOADING,
  payload: data,
});
//TRAINER TEST PAPER
export const setTrainerTestData = (data) => ({
  type: SMM_CLASSROOM_TRAINING_TRAINER_TEST_QUESTION_DATA,
  payload: data,
});
export const setTrainerTestDataLoading = (data) => ({
  type: SMM_CLASSROOM_TRAINING_TRAINER_TEST_QUESTION_DATA_LOADING,
  payload: data,
});
//SUBMIT TEST PAPER FILLED BY TRAINER
export const setSubmitTestData = (data) => ({
  type: SMM_CLASSROOM_TRAINING_SUBMIT_TEST_DATA,
  payload: data,
});
export const setSubmitTestDataLoading = (data) => ({
  type: SMM_CLASSROOM_TRAINING_SUBMIT_TEST_DATA_LOADING,
  payload: data,
});
//Pending Batch
export const setPendingBatchLoading = (data) => ({
  type: SMM_CLASSROOM_TRAINING_PENDING_BATCH_LOADING,
  payload: data,
});
export const setPendingBatchData = (data) => ({
  type: SMM_CLASSROOM_TRAINING_PENDING_BATCH_DATA,
  payload: data,
});
