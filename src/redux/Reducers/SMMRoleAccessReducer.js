import _ from "lodash";
import {
  SMM_SUPERVISOR_ACCESS_DATA,
  SMM_SUPERVISOR_ACCESS_DATA_LOADING,
} from "../ActionTypes/RoleAccessActionTypes";

export default function SMMRoleAccessReducer(
  state = { loading: true },
  action = {}
) {
  switch (action.type) {
    case SMM_SUPERVISOR_ACCESS_DATA: {
      return {
        ...state,
        supervisorAccessData: action.payload,
      };
    }
    case SMM_SUPERVISOR_ACCESS_DATA_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
}
export function getSupervisorAccessData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMRoleAccessReducer", "supervisorAccessData"],
    {}
  );
}

export function getSupervisorAccessLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMRoleAccessReducer", "loading"],
    true
  );
}
