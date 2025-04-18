import _ from "lodash";
import {
  uploadAreaMaster,
  saveAreaDetails,
  fetchAreaMasterData,
  uploadRoleMaster,
  saveRoleDetails,
  fetchRoleMasterData,
  deleteAreaMaster,
} from "../../Repository/DepartmentMasterRepository";
import {
  setAlertMessage,
  setIsAlert,
} from "../ActionCreator/AlertActionCreator";
import {
  setAddMasterApiStatus,
  setLoading,
  setUploadLoading,
  setMasterFiles,
  setDeleteMasterFile,
} from "../ActionCreator/DepartmentMasterActionCreator";

export const changeMasterApiStatus = (status) => async (dispatch) => {
  dispatch(setLoading(status));
};
export const changeAddMasterApiStatus = (status) => async (dispatch) => {
  dispatch(setAddMasterApiStatus(status));
};
//Area Master
export const fetchAreaMasterFiles =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setLoading(true));
      }
      const res = await fetchAreaMasterData(payload);
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
export const uploadAreaMasterFile =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setAddMasterApiStatus("INPROGRESS"));
      }
      const res = await uploadAreaMaster(payload);
      const data = _.get(res, ["data", "response"], {});
      payload.file_name = data.filename;
      payload.file_path = data.filepath;
      try {
        const response = await saveAreaDetails(payload);
        const result = _.get(response, ["data", "response"], {});
        if (result) {
          dispatch(fetchAreaMasterFiles(payload));
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
//Role Master
export const fetchRoleMasterFiles =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setLoading(true));
      }
      const res = await fetchRoleMasterData(payload);
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
export const uploadRoleMasterFile =
  (payload, dispatchApiStatus = true) =>
  async (dispatch) => {
    try {
      if (dispatchApiStatus) {
        dispatch(setAddMasterApiStatus("INPROGRESS"));
      }
      const res = await uploadRoleMaster(payload);
      const data = _.get(res, ["data", "response"], {});
      payload.file_name = data.filename;
      payload.file_path = data.filepath;
      try {
        const response = await saveRoleDetails(payload);
        const result = _.get(response, ["data", "response"], {});
        if (result) {
          dispatch(fetchRoleMasterFiles(payload));
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
export const deleteAreaMasterFile =
  (payload, isDelete = false) =>
  async (dispatch) => {
    try {
      const res = await deleteAreaMaster(payload, isDelete);
      dispatch(
        setDeleteMasterFile({ ...res.data.response, responseCode: "SMM200" })
      );
      dispatch(setAlertMessage("File deleted successfully."));
      dispatch(setIsAlert(true));
    } catch (error) {
      dispatch(setAlertMessage("Failed to delete the file."));
      dispatch(setIsAlert(true));
    }
  };
