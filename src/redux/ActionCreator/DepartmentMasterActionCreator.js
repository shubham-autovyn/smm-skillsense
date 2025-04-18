import {
    SMM_ADD_MASTER_FILE,
    SMM_SET_MASTER_FILES,
    SMM_SET_MASTER_LOADING,
    SMM_SET_UPLOAD_MASTER_LOADING,
    SMM_ADD_MASTER_FILE_API_STATUS,
    SMM_SET_APPROVED,
    SMM_AREA_DELETE_MASTER_FILE,
} from "../ActionTypes/DepartmentMasterActionTypes";

//AREA MASTER IN DEPARTMENT HEAD DASHBOARD
export const addMasterFile = (file) => ({
  type: SMM_ADD_MASTER_FILE,
  payload: file[0],
});
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
export const setAddMasterApiStatus = (data) => ({
    type: SMM_ADD_MASTER_FILE_API_STATUS,
    payload: data,
  });
export const setApproved = (file) => ({
    type: SMM_SET_APPROVED,
    payload: file,
  });
export const setDeleteMasterFile = (id) => ({
  type: SMM_AREA_DELETE_MASTER_FILE,
  payload: id,
});
