import {
  SMM_ALLOCATION_STAFF_DETAIL_LOADING,
  SMM_ALLOCATION_STAFF_DETAIL_DATA,
  SMM_ALLOCATION_AREA_DETAIL_DATA,
  SMM_ALLOCATION_AREA_DETAIL_LOADING,
  SMM_STAFF_AREA_ALLOCATION_LOADING,
  SMM_STAFF_AREA_ALLOCATION_DATA,
} from "../ActionTypes/AllocationActionTypes";

// Allocation Staff Details
export const setAllocationStaffDetailLoading = (data) => ({
  type: SMM_ALLOCATION_STAFF_DETAIL_LOADING,
  payload: data,
});
export const setAllocationStaffDetailData = (data) => ({
  type: SMM_ALLOCATION_STAFF_DETAIL_DATA,
  payload: data,
});

// Allocation Area Details
export const setAllocationAreaDetailLoading = (data) => ({
  type: SMM_ALLOCATION_AREA_DETAIL_LOADING,
  payload: data,
});
export const setAllocationAreaDetailData = (data) => ({
  type: SMM_ALLOCATION_AREA_DETAIL_DATA,
  payload: data,
});

// Submit Staff Area Allocation
export const setStaffAreaAllocationLoading = (data) => ({
  type: SMM_STAFF_AREA_ALLOCATION_LOADING,
  payload: data,
});
export const setStaffAreaAllocationData = (data) => ({
  type: SMM_STAFF_AREA_ALLOCATION_DATA,
  payload: data,
});
