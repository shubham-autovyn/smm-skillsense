import {
  allocationStaffDetailsApi,
  fetchAllocationAreas,
  fetchStaffAreaAllocationApi,
} from "../../Repository/AllocationRepository";
import {
  setAlertMessage,
  setIsAlert,
} from "../ActionCreator/AlertActionCreator";
import {
  setAllocationAreaDetailData,
  setAllocationAreaDetailLoading,
  setAllocationStaffDetailData,
  setAllocationStaffDetailLoading,
  setStaffAreaAllocationData,
  setStaffAreaAllocationLoading,
} from "../ActionCreator/AllocationActionCreator";

// Staff Details
export const fetchStaffDetailAllocation = (payload) => async (dispatch) => {
  try {
    dispatch(setAllocationStaffDetailLoading(true));
    const res = await allocationStaffDetailsApi(payload);
    dispatch(setAllocationStaffDetailData(res.data.response));
    dispatch(setAllocationStaffDetailLoading(false));
  } catch (ex) {
    dispatch(setAllocationStaffDetailLoading(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};

// Fetch Allocation area Details
export const fetchAllocationAreaDetail = (payload) => async (dispatch) => {
  try {
    dispatch(setAllocationAreaDetailLoading(true));
    const res = await fetchAllocationAreas(payload);
    dispatch(setAllocationAreaDetailData(res.data.response));
    dispatch(setAllocationAreaDetailLoading(false));
  } catch (ex) {
    dispatch(setAllocationAreaDetailLoading(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};

// Fetch Staff Area Allocation
export const fetchStaffAreaAllocation = (payload) => async (dispatch) => {
  try {
    dispatch(setStaffAreaAllocationLoading(true));
    const res = await fetchStaffAreaAllocationApi(payload);
    dispatch(
      setStaffAreaAllocationData({
        ...res.data.response,
        responseCode: "SMM200",
      })
    );
    dispatch(setStaffAreaAllocationLoading(false));
  } catch (ex) {
    dispatch(setStaffAreaAllocationLoading(false));
    if (ex?.response?.status === 409) {
      dispatch(setAlertMessage(ex?.response?.data?.message));
    } else {
      dispatch(setAlertMessage(ex?.message));
    }
    dispatch(setIsAlert(true));
  }
};
