import { SMM_SET_ALERT_MESSAGE, SMM_SET_IS_ALERT } from "../ActionTypes/AlertActionTypes";

export const setAlertMessage = (error) => ({
  type: SMM_SET_ALERT_MESSAGE,
  payload: error,
});

export const setIsAlert = (error) => ({
  type: SMM_SET_IS_ALERT,
  payload: error,
});