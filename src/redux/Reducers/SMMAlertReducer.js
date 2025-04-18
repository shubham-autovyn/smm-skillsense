import _ from "lodash";
import {
  SMM_SET_ALERT_MESSAGE,
  SMM_SET_IS_ALERT,
} from "../ActionTypes/AlertActionTypes";

export default function SMMAlertReducer(
  state = { isAlert: false },
  action = {}
) {
  switch (action.type) {
    case SMM_SET_IS_ALERT: {
      return {
        ...state,
        isAlert: action.payload,
      };
    }
    case SMM_SET_ALERT_MESSAGE: {
      return {
        ...state,
        message: action.payload,
      };
    }
    default:
      return state;
  }
}

export function getAlertStatus(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMAlertReducer", "isAlert"],
    false
  );
}

export function getAlertMessage(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMAlertReducer", "message"],
    ""
  );
}
