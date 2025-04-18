import {
  setAlertMessage,
  setIsAlert,
} from "../ActionCreator/AlertActionCreator";

export const setAlertStatus = (status) => async (dispatch) => {
  dispatch(setIsAlert(status));
};
export const setAlert = (val) => async (dispatch) => {
  dispatch(setAlertMessage(val));
};
