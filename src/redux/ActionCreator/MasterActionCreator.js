import {
  SMM_ADD_MASTER_FILE,
  SMM_ADD_MASTER_FILE_API_STATUS,
  SMM_SET_APPROVED,
  SMM_SET_MASTER_FILES,
  SMM_SET_MASTER_LOADING,
  SMM_SET_UPLOAD_MASTER_LOADING,
} from "../ActionTypes/MasterActionTypes";

export const setMasterFiles = (list) => ({
  type: SMM_SET_MASTER_FILES,
  payload: list,
});

export const setLoading = (val) => ({
  type: SMM_SET_MASTER_LOADING,
  payload: val,
});

export const setUploadLoading = (val) => ({
  type: SMM_SET_UPLOAD_MASTER_LOADING,
  payload: val,
});

export const setApproved = (file) => ({
  type: SMM_SET_APPROVED,
  payload: file,
});

export const addMasterFile = (file) => ({
  type: SMM_ADD_MASTER_FILE,
  payload: file[0],
});

export const setAddMasterApiStatus = (data) => ({
  type: SMM_ADD_MASTER_FILE_API_STATUS,
  payload: data,
});
