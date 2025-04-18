import { combineReducers } from "redux";
import SMMShopReducer from "./SMMShopReducer";
import SMMClassroomReducer from "./SMMClassroomReducer";
import SMMAlertReducer from "./SMMAlertReducer";
import SMMMasterReducer from "./SMMMasterReducer";
import SMMReportReducer from "./SMMReportReducer";
import SMMDepartmentMasterReducer from "./SMMDepartmentMasterReducer";
import SMMAllocationReducer from "./SMMAllocationReducer";
import SMMJobTrainingReducer from "./SMMJobTrainingReducer";
import SMMRoleAccessReducer from "./SMMRoleAccessReducer";
export default combineReducers({
  SMMAlertReducer,
  SMMShopReducer,
  SMMClassroomReducer,
  SMMMasterReducer,
  SMMReportReducer,
  SMMDepartmentMasterReducer,
  SMMAllocationReducer,
  SMMJobTrainingReducer,
  SMMRoleAccessReducer
});
