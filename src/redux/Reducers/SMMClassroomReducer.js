import _ from "lodash";
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
  //Create BATCH
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
  //ongoing batch api
  SMM_SET_REFRESHER_ONGOING_BATCH_LOADING,
  SMM_SET_REFRESHER_TRAINING_PLAN,
  //training plan api
  SMM_SET_REFRESHER_TRAINING_PLAN_LOADING,
  //New Refrehser Training
  SMM_SET_REFRESHER_TRAINING_TOPICS,
  SMM_SET_REFRESHER_TRAINING_TOPICS_LOADING,
  SMM_UPDATE_CLASSROOM_TAB_SELECTION,
  //Test Attempt View
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
export default function SMMClassroomReducer(
  state = {
    loadingBatchData: true,
    loadingPlanData: true,
    loadingAttendeesRecord: true,
  },
  action = {}
) {
  switch (action.type) {
    case SMM_SET_REFRESHER_TRAINING_PLAN_LOADING: {
      return {
        ...state,
        loadingPlanData: action.payload,
      };
    }
    case SMM_SET_REFRESHER_TRAINING_PLAN: {
      return {
        ...state,
        trainingPlanData: action.payload,
      };
    }
    case SMM_SET_REFRESHER_ONGOING_BATCH_LOADING: {
      return {
        ...state,
        loadingBatchData: action.payload,
      };
    }
    case SMM_SET_REFRESHER_ONGOING_BATCH_DATA: {
      return {
        ...state,
        ongoingBatchData: action.payload,
      };
    }
    //
    case SMM_SET_REFRESHER_ATTENDEE_DETAILS_LOADING: {
      return {
        ...state,
        loadingAttendeeDetailsData: action.payload,
      };
    }
    case SMM_SET_REFRESHER_ATTENDEE_DETAILS: {
      return {
        ...state,
        attendeeDetailsData: action.payload,
      };
    }
    case SMM_SET_REFRESHER_ATTENDEE_BATCH_DETAILS_LOADING: {
      return {
        ...state,
        loadingBatchDetailsData: action.payload,
      };
    }
    case SMM_SET_REFRESHER_ATTENDEE_BATCH_DETAILS: {
      return {
        ...state,
        batchDetailsData: action.payload,
      };
    }
    case SMM_SET_REFRESHER_ATTENDEE_STAFF_LIST: {
      return {
        ...state,
        staffListData: action.payload,
      };
    }
    case SMM_SET_REFRESHER_ATTENDEE_STAFF_LIST_LOADING: {
      return {
        ...state,
        staffListDataLoading: action.payload,
      };
    }
    //New Refrehser Training
    case SMM_SET_REFRESHER_TRAINING_TOPICS: {
      return {
        ...state,
        trainingTopics: action.payload,
      };
    }
    case SMM_SET_REFRESHER_TRAINING_TOPICS_LOADING: {
      return {
        ...state,
        trainingTopicsLoading: action.payload,
      };
    }
    //Create Batch
    case SMM_SET_CLASSROOM_TRAINING_CREATED_BATCH_ID: {
      return {
        ...state,
        trainingBatchId: action.payload,
      };
    }
    case SMM_SET_CLASSROOM_TRAINING_CREATE_BATCH_STATUS: {
      return {
        ...state,
        createBatchStatus: action.payload,
      };
    }
    // Attendees Traning Record
    case SMM_CLASSROOM_TRAINING_ATTENDEES_RECORD_LOADING: {
      return {
        ...state,
        loadingAttendeesRecord: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_ATTENDEES_RECORD_DATA: {
      return {
        ...state,
        attendeesTraningRecords: action.payload,
      };
    }
    // Mark Attendance
    case SMM_CLASSROOM_TRAINING_MARK_ATTENDANCE_LOADING: {
      return {
        ...state,
        loadingMarkAttendance: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_MARK_ATTENDANCE_STATUS: {
      return {
        ...state,
        markAttendanceData: action.payload,
      };
    }
    case SMM_UPDATE_CLASSROOM_TAB_SELECTION: {
      return {
        ...state,
        classroomTab: action.payload,
      };
    }
    // Update Batch
    case SMM_CLASSROOM_TRAINING_UPDATE_BATCH_LOADING: {
      return {
        ...state,
        loadingUpdateBatch: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_UPDATE_BATCH_DATA: {
      return {
        ...state,
        updateBatchData: action.payload,
      };
    }
    // Batch Topics
    case SMM_CLASSROOM_TRAINING_BATCH_TOPICS_LOADING: {
      return {
        ...state,
        loadingBatchTopics: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_BATCH_TOPICS_DATA: {
      return {
        ...state,
        batchTopicsData: action.payload,
      };
    }
    // Update Topic Status
    case SMM_CLASSROOM_TRAINING_UPDATE_TOPICS_STATUS_LOADING: {
      return {
        ...state,
        loadingUpdateTopic: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_UPDATE_TOPICS_STATUS_DATA: {
      return {
        ...state,
        updateTopicData: action.payload,
      };
    }
    // Reattempt Status
    case SMM_CLASSROOM_TRAINING_REATTEMPT_STATUS_LOADING: {
      return {
        ...state,
        loadingReattemptStatus: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_REATTEMPT_STATUS_DATA: {
      return {
        ...state,
        reattemptStatusData: action.payload,
      };
    }
    // Fetch Staff Search
    case SMM_CLASSROOM_TRAINING_FETCH_STAFF_SEARCH_LOADING: {
      return {
        ...state,
        loadingFetchStaffSearch: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_FETCH_STAFF_SEARCH_DATA: {
      return {
        ...state,
        fetchStaffSearchData: action.payload,
      };
    }
    // Save Evaluation
    case SMM_CLASSROOM_TRAINING_SAVE_TOPIC_COMPLETED_LOADING: {
      return {
        ...state,
        loadingSaveTopicCompleted: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_SAVE_TOPIC_COMPLETED_DATA: {
      return {
        ...state,
        saveTopicCompletedData: action.payload,
      };
    }
    // Test View Attempt
    case SMM_CLASSROOM_TRAINING_TEST_VIEW_LOADING: {
      return {
        ...state,
        loadingTestView: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_TEST_VIEW_DATA: {
      return {
        ...state,
        testViewData: action.payload,
      };
    }
    // Delete Batch
    case SMM_CLASSROOM_TRAINING_DELETE_BATCH: {
      return {
        ...state,
        deleteBatchData: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_DELETE_BATCH_LOADING: {
      return {
        ...state,
        deleteBatchLoading: action.payload,
      };
    }
    //
    case SMM_CLASSROOM_TRAINING_SUBMIT_TRAINER_EVALUATION: {
      return {
        ...state,
        trainerEvaluationData: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_SUBMIT_TRAINER_EVALUATION_LOADING: {
      return {
        ...state,
        trainerEvaluationLoading: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_TRAINER_TEST_QUESTION_DATA: {
      return {
        ...state,
        trainerTestData: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_TRAINER_TEST_QUESTION_DATA_LOADING: {
      return {
        ...state,
        trainerTestDataLoading: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_SUBMIT_TEST_DATA: {
      return {
        ...state,
        submitTestData: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_SUBMIT_TEST_DATA_LOADING: {
      return {
        ...state,
        submitTestDataLoading: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_PENDING_BATCH_LOADING: {
      return {
        ...state,
        pendingBatchLoading: action.payload,
      };
    }
    case SMM_CLASSROOM_TRAINING_PENDING_BATCH_DATA: {
      return {
        ...state,
        pendingBatchData: action.payload,
      };
    }
    default:
      return state;
  }
}
export function getTrainingPlanData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "trainingPlanData"],
    {}
  );
}
export function getTrainingPlanLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingPlanData"],
    true
  );
}
//
export function getOngoingBatchData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "ongoingBatchData"],
    {}
  );
}
export function getOngoingBatchLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingBatchData"],
    true
  );
}
//
export function getAttendeeDetailsData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "attendeeDetailsData"],
    {}
  );
}
export function getAttendeeDetailsLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingAttendeeDetailsData"],
    true
  );
}
export function getBatchDetailsData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "batchDetailsData"],
    {}
  );
}
export function getBatchDetailsLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingBatchDetailsData"],
    true
  );
}
export function getStaffListData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "staffListData"],
    []
  );
}
export function getStaffListDataLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "staffListDataLoading"],
    true
  );
}
//New Refresher Training
export function getTrainingTopicList(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "trainingTopics"],
    {}
  );
}
export function getTrainingTopicListLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "trainingTopicsLoading"],
    true
  );
}
//Create Batch
export function getTrainingBatchId(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "trainingBatchId"],
    ""
  );
}
export function getCreateTrainingBatchStatus(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "createBatchStatus"],
    false
  );
}

// Attendees Training record
export function getAttendeesTrainingLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingAttendeesRecord"],
    ""
  );
}
export function getAttendeesTrainingRecords(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "attendeesTraningRecords"],
    false
  );
}

// Mark Attendance
export function getMarkAttendanceLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingMarkAttendance"],
    ""
  );
}
export function getMarkAttendanceData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "markAttendanceData"],
    false
  );
}

export function getClassroomTabIndex(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "classroomTab"],
    "1"
  );
}

// Update Batch
export function getUpdateBatchLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingUpdateBatch"],
    false
  );
}
export function getUpdateBatchData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "updateBatchData"],
    false
  );
}

// Batch Topics
export function getBatchTopicsLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingBatchTopics"],
    false
  );
}
export function getBatchTopicsData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "batchTopicsData"],
    false
  );
}

// Update Topic Status
export function getUpdateTopicLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingUpdateTopic"],
    false
  );
}
export function getUpdateTopicData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "updateTopicData"],
    false
  );
}

// Reattempt Status
export function getReattemptStatusLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingReattemptStatus"],
    false
  );
}
export function getReattemptStatuscData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "reattemptStatusData"],
    false
  );
}

// Fetch Staff Search
export function getFetchStaffSearchLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingFetchStaffSearch"],
    false
  );
}
export function getFetchStaffSearchData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "fetchStaffSearchData"],
    false
  );
}

// Save Topic Completed
export function getSaveTopicCompletedLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingSaveTopicCompleted"],
    false
  );
}
export function getSaveTopicCompletedData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "saveTopicCompletedData"],
    false
  );
}

//Test Attempt View
export function getTestViewLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "loadingTestView"],
    ""
  );
}

export function getTestViewData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "testViewData"],
    []
  );
}

//Delete Batch
export function getDeleteBatchData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "deleteBatchData"],
    ""
  );
}
export function getDeleteBatchLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "deleteBatchLoading"],
    ""
  );
}
//Trainer Evaluation
export function getTrainerEvaluationData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "trainerEvaluationData"],
    ""
  );
}
export function getTrainerEvaluationLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "trainerEvaluationLoading"],
    ""
  );
}
//Fetch Trainer Test Question
export function getTrainerTestData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "trainerTestData"],
    ""
  );
}
export function getTrainerTestDataLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "trainerTestDataLoading"],
    ""
  );
}
//Submit Test Paper Filled By Trainer
export function getSubmitTestData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "submitTestData"],
    ""
  );
}
export function getSubmitTestDataLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "submitTestDataLoading"],
    ""
  );
}

// Pending Batch
export function getPendingBatchLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "pendingBatchLoading"],
    false
  );
}
export function getPendingBatchData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMClassroomReducer", "pendingBatchData"],
    ""
  );
}
