import {
  SMM_SUPERVISOR_ACCESS_DATA,
  SMM_SUPERVISOR_ACCESS_DATA_LOADING,
} from "../ActionTypes/RoleAccessActionTypes";
//SupervisorAccess control
export const setSupervisorAccess = (val) => ({
  type: SMM_SUPERVISOR_ACCESS_DATA,
  payload: val,
});

export const setSupervisorAccessLoading = (val) => ({
  type: SMM_SUPERVISOR_ACCESS_DATA_LOADING,
  payload: val,
});
