import _ from "lodash";

import {
  setAddMasterApiStatus,
  setLoading,
  setMasterFiles,
  setUploadLoading,
} from "../ActionCreator/MasterActionCreator";

import {
  fetchMasterData,
  saveDetails,
  uploadMaster,
} from "../../Repository/MasterRepository";
import {
  setAlertMessage,
  setIsAlert,
} from "../ActionCreator/AlertActionCreator";

export const fetchAllMasterFiles =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setLoading(true));
      }
      const res = await fetchMasterData(payload);
      const files = _.get(res, ["data", "response"], []) || [];
      dispatch(setMasterFiles(files));
      if (dispatchApiStatus) {
        dispatch(setLoading(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        dispatch(setMasterFiles([]));
        let message = "";
        if (ex?.response?.status === 409) {
          message = ex?.response?.data?.message;
        } else {
          message = ex?.message;
        }
        dispatch(setAlertMessage(message));
        dispatch(setIsAlert(true));
        dispatch(setLoading(false));
      }
    }
  };
export const changeMasterApiStatus = (status) => async (dispatch) => {
  dispatch(setLoading(status));
};
export const changeAddMasterApiStatus = (status) => async (dispatch) => {
  dispatch(setAddMasterApiStatus(status));
};
export const uploadMasterFile =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setAddMasterApiStatus("INPROGRESS"));
      }
      const res = await uploadMaster(payload);
      const data = _.get(res, ["data", "response"], {});
      payload.file_name = data.filename;
      payload.file_path = data.filepath;
      try {
        const response = await saveDetails(payload);
        const result = _.get(response, ["data", "response"], {});
        if (result) {
          dispatch(fetchAllMasterFiles(payload));
        }
        if (dispatchApiStatus) {
          dispatch(setAddMasterApiStatus("COMPLETED"));
          dispatch(
            setAlertMessage(
              "Master upload in progress. Please refresh after sometime"
            )
          );
          dispatch(setIsAlert(true));
        }
      } catch (ex) {
        if (dispatchApiStatus) {
          let message = "";
          if (ex?.response?.status === 409) {
            message = ex?.response?.data?.message;
          } else {
            message = ex?.message;
          }
          dispatch(setAlertMessage(message));
          dispatch(setIsAlert(true));
          dispatch(setUploadLoading(false));
          dispatch(setAddMasterApiStatus("FAILED"));
        }
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        let message = "";
        if (ex?.response?.status === 409) {
          message = ex?.response?.data?.message;
        } else {
          message = ex?.message;
        }
        dispatch(setAlertMessage(message));
        dispatch(setIsAlert(true));
        dispatch(setUploadLoading(false));
        dispatch(setAddMasterApiStatus("FAILED"));
      }
    }
  };
