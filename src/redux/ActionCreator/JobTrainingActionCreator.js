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

//new joinee and existing Table Data
export const setTrainingDetailsData = (data) => ({
type: SMM_SET_STAFF_TRAINING_DETAILS_DATA,
payload: data,
});
export const setTrainingDetailsLoading = (data) => ({
type: SMM_SET_STAFF_TRAINING_DETAILS_DATA_LOADING,
payload: data,
});
//fetch all area stations 
export const setAreaStationData = (data) => ({
    type : SMM_SET_AREA_STATIONS_DATA,
    payload: data,
});
export const setAreaStationDataLoading = (data) => ({
    type: SMM_SET_AREA_STATIONS_DATA_LOADING,
    payload: data,
});
//SAVE OJT TEST DATA 
export const setSubmitOjtTestData = (data) => ({
    type : SMM_SAVE_OJT_TEST_DATA,
    payload: data,
});
export const setSubmitOjtTestDataLoading = (data) => ({
    type: SMM_SAVE_OJT_TEST_DATA_LOADING,
    payload: data,
});
//fetch all area stations 
export const setOjtTestData = (data) => ({
    type : SMM_FETCH_OJT_TEST_DATA,
    payload: data,
});
export const setOjtTestDataLoading = (data) => ({
    type: SMM_FETCH_OJT_TEST_DATA_LOADING,
    payload: data,
});
//update stationa and start training
export const setSaveStationDataAction = (data) => ({
    type: SMM_SET_SAVE_STATION_DATA,
    payload: data,
});
export const setSaveStationDataActionLoading = (data) => ({
    type: SMM_SET_SAVE_STATION_DATA_LOADING,
    payload: data,
});
//reset and delete training
export const deleteTrainingAction = (data) => ({
    type: SMM_OJT_DELETE_TRAINING,
    payload: data,
});
export const deleteTrainingActionLoading = (data) => ({
    type: SMM_OJT_DELETE_TRAINING_LOADING,
    payload: data,
});
//navigate next training level
export const setNavigateNextTrainingData = (data) => ({
    type: SMM_NAVIGATE_NEXT_TRAINING,
    payload: data,
});
export const setNavigateNextTrainingDataLoading = (data) => ({
    type: SMM_NAVIGATE_NEXT_TRAINING_LOADING,
    payload: data,
});
//Upload pdf/jpeg for maru A/AR
export const addMaruFile = (file) => ({
    type: SMM_UPLOAD_PDF_IMAGE_STATUS_DATA,
    payload: file,
  });
  
  export const setAddMaruFileStatus = (data) => ({
    type: SMM_UPLOAD_PDF_IMAGE_STATUS,
    payload: data,
  });
  //fetch existing operators
export const setExistingOperatorsData = (data) => ({
    type: SMM_SET_EXISTING_OPERATORS_DATA,
    payload: data,
});
export const setExistingOperatorsDataLoading = (data) => ({
    type: SMM_SET_EXISTING_OPERATORS_DATA_LOADING,
    payload: data,
});
//Complte Training Data
export const setCompleteTrainingData = (data) => ({
    type: SMM_SET_COMPLETE_TRAINING_DATA,
    payload: data,
});
export const setCompleteTrainingDataLoading = (data) => ({
    type: SMM_SET_COMPLETE_TRAINING_DATA_LOADING,
    payload: data,
});