import _ from "lodash";
import {
  SMM_ADD_MASTER_FILE,
  SMM_SET_MASTER_FILES,
  SMM_SET_MASTER_LOADING,
  SMM_SET_UPLOAD_MASTER_LOADING,
  SMM_ADD_MASTER_FILE_API_STATUS,
  SMM_SET_APPROVED,
  SMM_AREA_DELETE_MASTER_FILE,
} from "../ActionTypes/DepartmentMasterActionTypes";

export default function SMMDepartmentMasterReducer(
  state = { loading: true, uploadLoading: false, data: [] },
  action = {}
) {
  switch (action.type) {
    case SMM_SET_MASTER_FILES: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case SMM_SET_MASTER_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case SMM_SET_UPLOAD_MASTER_LOADING: {
      return {
        ...state,
        uploadLoading: action.payload,
      };
    }
    case SMM_SET_APPROVED: {
      return {
        ...state,
        approvedFile: action.payload,
      };
    }
    case SMM_ADD_MASTER_FILE_API_STATUS: {
      return {
        ...state,
        addMasterApiStatus: action.payload,
      };
    }
    case SMM_ADD_MASTER_FILE: {
      let files = state.data;
      if (files.length > 0) {
        files.splice(1, 0, action.payload);
      } else {
        files[0] = action.payload;
      }
      return {
        ...state,
        data: files,
      };
    }
    case SMM_AREA_DELETE_MASTER_FILE: {
      return {
        ...state,
        deleteBatchData: action.payload,
      };
    }
    default:
      return state;
  }
}
export function getMasterFiles(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMDepartmentMasterReducer", "data"],
    []
  );
}
export function getMasterFilesStatus(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMDepartmentMasterReducer", "loading"],
    true
  );
}
export function getMasterUploadStatus(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMDepartmentMasterReducer", "uploadLoading"],
    false
  );
}
export const getAddMasterApiStatus = (state) => {
  return _.get(state, [
    "SMMRootReducer",
    "SMMDepartmentMasterReducer",
    "addMasterApiStatus",
  ]);
};
export function getDeleteAreaMasterFile(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMDepartmentMasterReducer", "deleteBatchData"],
    ""
  );
}
