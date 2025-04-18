import {
  SMM_SET_REPORT_FILTER_LOADING,
  SMM_SET_REPORT_FILTER_DATA,
  SMM_SET_STAFF_SEARCH_LOADING,
  SMM_SET_STAFF_SEARCH_DATA,
  SMM_SET_STAFF_DETAILS_LOADING,
  SMM_SET_STAFF_DETAILS_DATA,
  SMM_SET_REPORT_COLUMN,
  SMM_SET_COMBINED_REPORT_DATA,
  SMM_SET_SUPERVISOR_STAFF_STATION_DATA,
  SMM_SET_SUPERVISOR_STAFF_STATION_LOADING,
  SMM_SET_SUPERVISOR_REPORT_COLUMN,
  SMM_SET_SUPERVISOR_STAFF_REPORTS_LOADING,
  SMM_SET_SUPERVISOR_STAFF_REPORTS_DATA,
  SMM_SET_DPM_PLANT_AREA_DETAIL_DATA,
  SMM_SET_DPM_PLANT_AREA_DETAIL_LOADING,
} from "../ActionTypes/ReportActionTypes";

export const setReportFilterLoading = (data) => ({
  type: SMM_SET_REPORT_FILTER_LOADING,
  payload: data,
});

export const setReportFilterData = (data) => ({
  type: SMM_SET_REPORT_FILTER_DATA,
  payload: data,
});

export const setStaffSearchLoading = (data) => ({
  type: SMM_SET_STAFF_SEARCH_LOADING,
  payload: data,
});

export const setStaffSearchData = (data) => ({
  type: SMM_SET_STAFF_SEARCH_DATA,
  payload: data,
});

export const setStaffDetailsLoading = (data) => ({
  type: SMM_SET_STAFF_DETAILS_LOADING,
  payload: data,
});

export const setStaffDetailsData = (data) => ({
  type: SMM_SET_STAFF_DETAILS_DATA,
  payload: data,
});

export const setReportColumns = (data) => ({
  type: SMM_SET_REPORT_COLUMN,
  payload: data,
});

export const setCombinedReportData = (data) => ({
  type: SMM_SET_COMBINED_REPORT_DATA,
  payload: data,
});

export const setSupervisorStaffStationLoading = (data) => ({
  type: SMM_SET_SUPERVISOR_STAFF_STATION_LOADING,
  payload: data,
});

export const setSupervisorStaffStationData = (data) => ({
  type: SMM_SET_SUPERVISOR_STAFF_STATION_DATA,
  payload: data,
});

export const setSupervisorReportColumns = (data) => ({
  type: SMM_SET_SUPERVISOR_REPORT_COLUMN,
  payload: data,
});

export const setSupervisorStaffReportsLoading = (data) => ({
  type: SMM_SET_SUPERVISOR_STAFF_REPORTS_LOADING,
  payload: data,
});

export const setSupervisorStaffReportsData = (data) => ({
  type: SMM_SET_SUPERVISOR_STAFF_REPORTS_DATA,
  payload: data,
});

export const setDPMPlantAreaDetailLoading = (data) => ({
  type: SMM_SET_DPM_PLANT_AREA_DETAIL_LOADING,
  payload: data,
});

export const setDPMPlantAreaDetailData = (data) => ({
  type: SMM_SET_DPM_PLANT_AREA_DETAIL_DATA,
  payload: data,
});
