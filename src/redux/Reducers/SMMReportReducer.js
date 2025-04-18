import _ from "lodash";
import {
  SMM_SET_COMBINED_REPORT_DATA,
  SMM_SET_DPM_PLANT_AREA_DETAIL_DATA,
  SMM_SET_DPM_PLANT_AREA_DETAIL_LOADING,
  SMM_SET_REPORT_COLUMN,
  SMM_SET_REPORT_FILTER_DATA,
  SMM_SET_REPORT_FILTER_LOADING,
  SMM_SET_STAFF_DETAILS_DATA,
  SMM_SET_STAFF_DETAILS_LOADING,
  SMM_SET_STAFF_SEARCH_DATA,
  SMM_SET_STAFF_SEARCH_LOADING,
  SMM_SET_SUPERVISOR_REPORT_COLUMN,
  SMM_SET_SUPERVISOR_STAFF_REPORTS_DATA,
  SMM_SET_SUPERVISOR_STAFF_REPORTS_LOADING,
  SMM_SET_SUPERVISOR_STAFF_STATION_DATA,
  SMM_SET_SUPERVISOR_STAFF_STATION_LOADING,
} from "../ActionTypes/ReportActionTypes";

const initialReportColumns = [
  "training_type",
  "training_topic_name",
  "training_test_name",
  "machine_name",
  "evaluation",
  "control_no",
  "revision",
  "pre_test_result",
  "post_test_result",
  "post_attempts",
  "training_time",
  "staff_id",
  "staff_name",
  "staff_level",
  "trainer_id",
  "trainer_name",
];

const initialSupervisorReportColumns = [
  "view_details",
  "staff_id",
  "staff_name",
  "station_name",
  "ojt_type",
  "area_name",
];

export default function SMMReportReducer(
  state = {
    reportColumns: initialReportColumns,
    supervisorReportColumns: initialSupervisorReportColumns,
  },
  action = {}
) {
  switch (action.type) {
    case SMM_SET_REPORT_FILTER_LOADING: {
      return {
        ...state,
        reportFilterLoading: action.payload,
      };
    }
    case SMM_SET_REPORT_FILTER_DATA: {
      return {
        ...state,
        reportFilterData: action.payload,
      };
    }
    case SMM_SET_STAFF_SEARCH_LOADING: {
      return {
        ...state,
        staffSearchLoading: action.payload,
      };
    }
    case SMM_SET_STAFF_SEARCH_DATA: {
      return {
        ...state,
        staffSearchData: action.payload,
      };
    }
    case SMM_SET_STAFF_DETAILS_LOADING: {
      return {
        ...state,
        staffDetailsLoading: action.payload,
      };
    }
    case SMM_SET_STAFF_DETAILS_DATA: {
      return {
        ...state,
        staffDetailsData: action.payload,
      };
    }
    case SMM_SET_REPORT_COLUMN: {
      return {
        ...state,
        reportColumns: action.payload,
      };
    }
    case SMM_SET_COMBINED_REPORT_DATA: {
      return {
        ...state,
        reportDataCombined: action.payload,
      };
    }
    case SMM_SET_SUPERVISOR_STAFF_STATION_LOADING: {
      return {
        ...state,
        supervisorStaffStationLoading: action.payload,
      };
    }
    case SMM_SET_SUPERVISOR_STAFF_STATION_DATA: {
      return {
        ...state,
        supervisorStaffStationData: action.payload,
      };
    }
    case SMM_SET_SUPERVISOR_REPORT_COLUMN: {
      return {
        ...state,
        supervisorReportColumns: action.payload,
      };
    }
    case SMM_SET_SUPERVISOR_STAFF_REPORTS_LOADING: {
      return {
        ...state,
        supervisorStaffReportsLoading: action.payload,
      };
    }
    case SMM_SET_SUPERVISOR_STAFF_REPORTS_DATA: {
      return {
        ...state,
        supervisorStaffReportsData: action.payload,
      };
    }
    case SMM_SET_DPM_PLANT_AREA_DETAIL_LOADING: {
      return {
        ...state,
        plantAreaDetailLoading: action.payload,
      };
    }
    case SMM_SET_DPM_PLANT_AREA_DETAIL_DATA: {
      return {
        ...state,
        plantAreaDetailData: action.payload,
      };
    }
    default:
      return state;
  }
}

export function getReportFilterLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "reportFilterLoading"],
    false
  );
}

export function getReportFilterData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "reportFilterData"],
    false
  );
}

export function getStaffSearchLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "staffSearchLoading"],
    false
  );
}

export function getStaffSearchData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "staffSearchData"],
    false
  );
}

export function getStaffDetailsLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "staffDetailsLoading"],
    false
  );
}

export function getStaffDetailsData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "staffDetailsData"],
    false
  );
}

export function getReportColumns(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "reportColumns"],
    false
  );
}

export function getReportDataCombined(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "reportDataCombined"],
    []
  );
}

export function getSupervisorStaffStationLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "supervisorStaffStationLoading"],
    false
  );
}

export function getSupervisorStaffStationData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "supervisorStaffStationData"],
    false
  );
}

export function getSupervisorReportColumns(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "supervisorReportColumns"],
    false
  );
}

export function getSupervisorStaffReportsLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "supervisorStaffReportsLoading"],
    false
  );
}

export function getSupervisorStaffReportsData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "supervisorStaffReportsData"],
    false
  );
}

export function getDPMPlantAreaDetailLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "plantAreaDetailLoading"],
    false
  );
}

export function getDPMPlantAreaDetailData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMReportReducer", "plantAreaDetailData"],
    false
  );
}
