import {
  deleteTrainingApi,
  fetchAreaStationsData,
  fetchExistingOperators,
  fetchStaffTestResults,
  fetchStaffTrainingData,
  markTrainingComplete,
  navigateNextTrainingApi,
  saveStaffTestResults,
  saveStationApi,
  uploadJpegPdfFile,
} from "../../Repository/JobTrainingRepository";
import {
  setAlertMessage,
  setIsAlert,
} from "../ActionCreator/AlertActionCreator";
import {
  addMaruFile,
  deleteTrainingAction,
  deleteTrainingActionLoading,
  //Upload pdf file
  setAddMaruFileStatus,
  setAreaStationData,
  setAreaStationDataLoading,
  //Complete Training
  setCompleteTrainingData,
  setCompleteTrainingDataLoading,
  setExistingOperatorsData,
  setExistingOperatorsDataLoading,
  setNavigateNextTrainingData,
  setNavigateNextTrainingDataLoading,
  //Ojt test fetch
  setOjtTestData,
  setOjtTestDataLoading,
  setSaveStationDataAction,
  setSaveStationDataActionLoading,
  //Ojt Save
  setSubmitOjtTestData,
  setSubmitOjtTestDataLoading,
  setTrainingDetailsData,
  setTrainingDetailsLoading,
} from "../ActionCreator/JobTrainingActionCreator";
export const fetchTrainingDetailsData = (payload) => async (dispatch) => {
  try {
    dispatch(setTrainingDetailsLoading(true));
    const res = await fetchStaffTrainingData(payload);
    dispatch(setTrainingDetailsData(res.data.response));
    dispatch(setTrainingDetailsLoading(false));
  } catch (ex) {
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};
//fetch All Area Station
export const fetchAllAreaStationsData = (payload) => async (dispatch) => {
  try {
    dispatch(setAreaStationDataLoading(true));
    const res = await fetchAreaStationsData(payload);
    dispatch(setAreaStationData(res.data.response));
    dispatch(setAreaStationDataLoading(false));
  } catch (ex) {
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};

export const removeSaveOjtTestData = (payload) => async (dispatch) => {
  dispatch(setSubmitOjtTestData({}));
};
// submitOjtTest Data
export const saveOjtTestData = (payload) => async (dispatch) => {
  try {
    dispatch(setSubmitOjtTestDataLoading(true));
    const res = await saveStaffTestResults(payload);
    dispatch(setSubmitOjtTestData(res.data));
    dispatch(setSubmitOjtTestDataLoading(false));
  } catch (ex) {
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};
// fetchOjt Test data
export const fetchOjtTestData = (payload) => async (dispatch) => {
  try {
    dispatch(setOjtTestDataLoading(true));
    const res = await fetchStaffTestResults(payload);
    dispatch(setOjtTestData(res.data.response));
    dispatch(setOjtTestDataLoading(false));
  } catch (ex) {
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};
// Update station and start training
export const saveStationDataApi = (payload) => async (dispatch) => {
  try {
    dispatch(setSaveStationDataActionLoading(true));
    const res = await saveStationApi(payload);
    dispatch(
      setSaveStationDataAction({
        ...res.data.response,
        responseCode: "SMM200",
      })
    );
    dispatch(setSaveStationDataActionLoading(false));
  } catch (ex) {
    dispatch(setSaveStationDataActionLoading(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};
//Reset and Delete Training
export const deleteTrainingApiAction = (payload) => async (dispatch) => {
  try {
    dispatch(deleteTrainingActionLoading(true));
    const res = await deleteTrainingApi(payload);
    dispatch(deleteTrainingAction(res.data));
    dispatch(deleteTrainingActionLoading(false));
  } catch (ex) {
    dispatch(deleteTrainingActionLoading(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};

//GO TO NEXT LEVEL TRAINiNG
export const navigateNextLevel = (payload) => async (dispatch) => {
  try {
    dispatch(setNavigateNextTrainingDataLoading(true));
    const res = await navigateNextTrainingApi(payload);
    dispatch(setNavigateNextTrainingData(res.data));
    dispatch(setNavigateNextTrainingDataLoading(false));
  } catch (ex) {
    dispatch(setNavigateNextTrainingDataLoading(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};

//Upload pdf/jpeg file
export const changePdfUploadApiStatus = (status) => async (dispatch) => {
  dispatch(setSaveStationDataActionLoading(status));
};
export const uploadMaruPDFJpegFile = (payload) => async (dispatch) => {
  try {
    dispatch(setAddMaruFileStatus(true));
    const res = await uploadJpegPdfFile(payload);
    dispatch(addMaruFile(res.data.response));
    dispatch(setAddMaruFileStatus(false));
  } catch (ex) {
    dispatch(setAddMaruFileStatus(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};

//fetch All Existing Operators
export const fetchExistingOperatorsData = (payload) => async (dispatch) => {
  try {
    dispatch(setExistingOperatorsDataLoading(true));
    const res = await fetchExistingOperators(payload);
    dispatch(setExistingOperatorsData(res.data.response));
    dispatch(setExistingOperatorsDataLoading(false));
  } catch (ex) {
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};
//Complete Training Data
export const completeTraining = (payload) => async (dispatch) => {
  try {
    dispatch(setCompleteTrainingDataLoading(true));
    const res = await markTrainingComplete(payload);
    dispatch(setCompleteTrainingData(res.data));
    dispatch(setCompleteTrainingDataLoading(false));
  } catch (ex) {
    dispatch(setCompleteTrainingDataLoading(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};
