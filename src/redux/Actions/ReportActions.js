import {
  fetchDPMPlantAreaDetailApi,
  fetchReportFilters,
  fetchStaffDetails,
  fetchStaffSearch,
  fetchSupervisorStaffReportsApi,
  fetchSupervisorStaffStationApi,
} from "../../Repository/ReportRepository";
import {
  setAlertMessage,
  setIsAlert,
} from "../ActionCreator/AlertActionCreator";
import {
  setCombinedReportData,
  setDPMPlantAreaDetailData,
  setDPMPlantAreaDetailLoading,
  setReportFilterData,
  setReportFilterLoading,
  setStaffDetailsData,
  setStaffDetailsLoading,
  setStaffSearchData,
  setStaffSearchLoading,
  setSupervisorStaffReportsData,
  setSupervisorStaffReportsLoading,
  setSupervisorStaffStationData,
  setSupervisorStaffStationLoading,
} from "../ActionCreator/ReportActionCreator";

export const fetchReportFilterData = (payload) => async (dispatch) => {
  try {
    dispatch(setReportFilterLoading(true));
    const res = await fetchReportFilters(payload);
    dispatch(setReportFilterData(res.data.response));
    dispatch(setReportFilterLoading(false));
  } catch (ex) {
    dispatch(setReportFilterLoading(false));
    let message = "";
    if (ex?.response?.status === 409) {
      message = ex?.response?.data?.message;
    } else {
      message = ex?.message;
    }
    dispatch(setAlertMessage(message));
    dispatch(setIsAlert(true));
  }
};

export const fetchStaffSearchApi = (payload) => async (dispatch) => {
  try {
    dispatch(setStaffSearchLoading(true));
    const res = await fetchStaffSearch(payload);
    dispatch(setStaffSearchData(res.data.response));
    dispatch(setStaffSearchLoading(false));
  } catch (ex) {
    dispatch(setStaffSearchLoading(false));
    let message = "";
    if (ex?.response?.status === 409) {
      message = ex?.response?.data?.message;
    } else {
      message = ex?.message;
    }
    dispatch(setAlertMessage(message));
    dispatch(setIsAlert(true));
  }
};

export const fetchStaffDetailsData = (payload) => async (dispatch) => {
  try {
    dispatch(setStaffDetailsLoading(true));
    const res = await fetchStaffDetails(payload);
    dispatch(setStaffDetailsData(res.data.response));
    dispatch(setStaffDetailsLoading(false));
  } catch (ex) {
    dispatch(setStaffDetailsLoading(false));
    let message = "";
    if (ex?.response?.status === 409) {
      message = ex?.response?.data?.message;
    } else {
      message = ex?.message;
    }
    dispatch(setAlertMessage(message));
    dispatch(setIsAlert(true));
  }
};

export const updateCombinedReportData = (data) => async (dispatch) => {
  dispatch(setCombinedReportData(data));
};

export const fetchSupervisorStaffStation = (payload) => async (dispatch) => {
  try {
    dispatch(setSupervisorStaffStationLoading(true));
    const res = await fetchSupervisorStaffStationApi(payload);
    dispatch(setSupervisorStaffStationData(res.data.response));
    dispatch(setSupervisorStaffStationLoading(false));
  } catch (ex) {
    dispatch(setSupervisorStaffStationLoading(false));
    let message = "";
    if (ex?.response?.status === 409) {
      message = ex?.response?.data?.message;
    } else {
      message = ex?.message;
    }
    dispatch(setAlertMessage(message));
    dispatch(setIsAlert(true));
  }
};

export const fetchSupervisorStaffReports = (payload) => async (dispatch) => {
  try {
    dispatch(setSupervisorStaffReportsLoading(true));
    const res = await fetchSupervisorStaffReportsApi(payload);
    dispatch(setSupervisorStaffReportsData(res.data.response));
    dispatch(setSupervisorStaffReportsLoading(false));
  } catch (ex) {
    dispatch(setSupervisorStaffReportsLoading(false));
    let message = "";
    if (ex?.response?.status === 409) {
      message = ex?.response?.data?.message;
    } else {
      message = ex?.message;
    }
    dispatch(setAlertMessage(message));
    dispatch(setIsAlert(true));
  }
};

export const fetchDPMPlantAreaDetail = (payload) => async (dispatch) => {
  try {
    dispatch(setDPMPlantAreaDetailLoading(true));
    const res = await fetchDPMPlantAreaDetailApi(payload);
    dispatch(setDPMPlantAreaDetailData(res.data.response));
    dispatch(setDPMPlantAreaDetailLoading(false));
  } catch (ex) {
    dispatch(setDPMPlantAreaDetailLoading(false));
    let message = "";
    if (ex?.response?.status === 409) {
      message = ex?.response?.data?.message;
    } else {
      message = ex?.message;
    }
    dispatch(setAlertMessage(message));
    dispatch(setIsAlert(true));
  }
};
