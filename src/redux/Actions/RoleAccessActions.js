import _ from "lodash";
import { fetchSupervisorAccessData } from "../../Repository/RoleAccessRepository";

import {
  setSupervisorAccessLoading,
  setSupervisorAccess,
} from "../ActionCreator/RoleAccessActionCreator"; //For supervisor area access
export const fetchSupervisorShopsArea =
  (dispatchApiStatus = true) =>
  async (dispatch) => {
    const dummyData={
      roleAccess:[
        {
          shop_id:40,
          subcategory:"ABC",
          group:"A",
          line:"1",
          area:"TRIM"
        }
      ]
    }
    try {
      if (dispatchApiStatus) {
        dispatch(setSupervisorAccessLoading(true));
      }
      const res = await fetchSupervisorAccessData();
      const list = _.get(res, ["data", "response"], []);
      dispatch(setSupervisorAccess(list));
      if (dispatchApiStatus) {
        dispatch(setSupervisorAccessLoading(false));
      }
    } catch (ex) {
      if (dispatchApiStatus) {
        dispatch(setSupervisorAccessLoading(false));
      }
    }
  };
