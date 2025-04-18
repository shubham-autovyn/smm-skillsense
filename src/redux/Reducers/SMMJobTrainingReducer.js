import _ from "lodash";
import {
  SMM_SET_AREA_STATIONS_DATA,
  SMM_SET_AREA_STATIONS_DATA_LOADING,
  SMM_SET_SAVE_STATION_DATA,
  SMM_SET_SAVE_STATION_DATA_LOADING,
  SMM_SET_STAFF_TRAINING_DETAILS_DATA,
  SMM_SET_STAFF_TRAINING_DETAILS_DATA_LOADING,
  SMM_FETCH_OJT_TEST_DATA,
  SMM_FETCH_OJT_TEST_DATA_LOADING,
  SMM_SAVE_OJT_TEST_DATA,
  SMM_SAVE_OJT_TEST_DATA_LOADING,
  SMM_OJT_DELETE_TRAINING,
  SMM_OJT_DELETE_TRAINING_LOADING,
  SMM_NAVIGATE_NEXT_TRAINING,
  SMM_NAVIGATE_NEXT_TRAINING_LOADING,
  SMM_UPLOAD_PDF_IMAGE_STATUS,
  SMM_UPLOAD_PDF_IMAGE_STATUS_DATA,
  SMM_SET_EXISTING_OPERATORS_DATA,
  SMM_SET_EXISTING_OPERATORS_DATA_LOADING,
  SMM_SET_COMPLETE_TRAINING_DATA,
  SMM_SET_COMPLETE_TRAINING_DATA_LOADING
} from "../ActionTypes/JobTrainingActionTypes";
export default function SMMJobTrainingReducer(state = {}, action = {}) {
  switch (action.type) {
    case SMM_SET_STAFF_TRAINING_DETAILS_DATA: {
      return {
        ...state,
        trainingDetailsData: action.payload,
      };
    }
    case SMM_SET_STAFF_TRAINING_DETAILS_DATA_LOADING: {
      return {
        ...state,
        loadingTrainingData: action.payload,
      };
    }
    case SMM_SET_AREA_STATIONS_DATA: {
      return {
        ...state,
        areaStationsData: action.payload,
      };
    }
    case SMM_SET_AREA_STATIONS_DATA_LOADING: {
      return {
        ...state,
        loadingAreaStationsData: action.payload,
      };
    }
    case SMM_FETCH_OJT_TEST_DATA: {
      return {
        ...state,
        ojtTestData: action.payload,
      };
    }
    case SMM_FETCH_OJT_TEST_DATA_LOADING: {
      return {
        ...state,
        ojtTestDataLoading: action.payload,
      };
    }
    case SMM_SAVE_OJT_TEST_DATA: {
      return {
        ...state,
        saveOjtTestData: action.payload,
      };
    }
    case SMM_SAVE_OJT_TEST_DATA_LOADING: {
      return {
        ...state,
        saveOjtTestDataLoading: action.payload,
      };
    }
    case SMM_SET_SAVE_STATION_DATA: {
      return {
        ...state,
        saveStationData: action.payload,
      };
    }
    case SMM_SET_SAVE_STATION_DATA_LOADING: {
      return {
        ...state,
        loadingSaveStationData: action.payload,
      }
    }
    case SMM_OJT_DELETE_TRAINING: {
      return {
        ...state,
        deleteTrainingData: action.payload,
      }
    }
    case SMM_OJT_DELETE_TRAINING_LOADING: {
      return {
        ...state,
        deleteTrainingLoading: action.payload,
      }
    }
    case SMM_NAVIGATE_NEXT_TRAINING: {
      return {
        ...state,
        navigateNextData: action.payload,
      };
    }
    case SMM_NAVIGATE_NEXT_TRAINING_LOADING: {
      return {
        ...state,
        navigateNextDataLoading: action.payload,
      }
    }
    case SMM_UPLOAD_PDF_IMAGE_STATUS: {
      return {
        ...state,
        uploadPdfImageStatus: action.payload,
      };
    }
    case SMM_UPLOAD_PDF_IMAGE_STATUS_DATA: {
      return {
        ...state,
        uploadPdfImage: action.payload,
      }
    }
    case SMM_SET_EXISTING_OPERATORS_DATA: {
      return {
        ...state,
        existingOperatorsData: action.payload,
      }
    }
    case SMM_SET_EXISTING_OPERATORS_DATA_LOADING: {
      return {
        ...state,
        existingOperatorsDataLoading: action.payload,
      }
    }
    case SMM_SET_COMPLETE_TRAINING_DATA: {
      return {
        ...state,
        completeTrainingData: action.payload,
      }
    }
    case SMM_SET_COMPLETE_TRAINING_DATA_LOADING: {
      return {
        ...state,
        completeTrainingDataLoading: action.payload,
      }
    }
    default:
      return state;
  }
}
export function getTrainingDetailsData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "trainingDetailsData"],
    {}
  );
}
export function getTrainingDetailsLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "loadingTrainingData"],
    true
  );
}
//fetch all area stations
export function getAreaStationsData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "areaStationsData"],
    {}
  );
}
export function getAreaStationsDataLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "loadingAreaStationsData"],
    {}
  );
}
//OJT FETCH Test Data
export function getOjtTestData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "ojtTestData"],
    {}
  );
}
export function getOjtTestDataLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "ojtTestDataLoading"],
    {}
  );
}
//OJT submit test data
export function getOjtTestSubmitData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "saveOjtTestData"],
    {}
  );
}
export function getOjtTestSubmitDataLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "saveOjtTestDataLoading"],
    {}
  );
}
//update station and start training
export function getSaveStationData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "saveStationData"],
    false
  );
}
export function getSaveStationDataLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "loadingSaveStationData"],
    false
  );
}
//reset and delete training
export function getDeleteTrainingData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "deleteTrainingData"],
    ""
  );
}
export function getDeleteTrainingLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "deleteTrainingLoading"],
    ""
  );
}
//navigate next training
export function getNavigateNextData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "navigateNextData"],
    false
  );
}
export function getNavigateNextDataLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "navigateNextDataLoading"],
    false
  );
}
//Upload pdf/jpeg for Maru A/AR
//navigate next training
export function getUploadJpegPdfFileData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "uploadPdfImage"],
    false
  );
}
export function getUploadJpegPdfFileStatus(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMJobTrainingReducer", "uploadPdfImageStatus"],
    false
  );
}
//fetch existing operators
export function getExistingOperatorsData(state) {
  return _.get(
    state,
    ["SMMRootReducer","SMMJobTrainingReducer","existingOperatorsData"],
    false
  );
}
export function getExistingOperatorsDataLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer","SMMJobTrainingReducer","existingOperatorsDataLoading"],
    false
  );
}
//Complete Training Data
export function getCompleteTrainingData(state) {
  return _.get(
    state,
    ["SMMRootReducer","SMMJobTrainingReducer","completeTrainingData"],
    false
  );
}
export function getCompleteTrainingDataLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer","SMMJobTrainingReducer","completeTrainingDataLoading"],
    false
  );
}