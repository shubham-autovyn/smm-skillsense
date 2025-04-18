import _ from "lodash";
import {
  SMM_ALLOCATION_STAFF_DETAIL_DATA,
  SMM_ALLOCATION_STAFF_DETAIL_LOADING,
  SMM_ALLOCATION_AREA_DETAIL_DATA,
  SMM_ALLOCATION_AREA_DETAIL_LOADING,
  SMM_STAFF_AREA_ALLOCATION_LOADING,
  SMM_STAFF_AREA_ALLOCATION_DATA,
} from "../ActionTypes/AllocationActionTypes";

export default function SMMAllocationReducer(
  state = { loading: true, data: [] },
  action = {}
) {
  switch (action.type) {
    case SMM_ALLOCATION_STAFF_DETAIL_LOADING: {
      return {
        ...state,
        allocationStaffDetailLoading: action.payload,
      };
    }
    case SMM_ALLOCATION_STAFF_DETAIL_DATA: {
      return {
        ...state,
        allocationStaffDetailData: action.payload,
      };
    }
    case SMM_ALLOCATION_AREA_DETAIL_LOADING: {
      return {
        ...state,
        allocationAreaDetailLoading: action.payload,
      };
    }
    case SMM_ALLOCATION_AREA_DETAIL_DATA: {
      return {
        ...state,
        allocationAreaDetailData: action.payload,
      };
    }
    case SMM_STAFF_AREA_ALLOCATION_LOADING: {
      return {
        ...state,
        staffAreaAllocationLoading: action.payload,
      };
    }
    case SMM_STAFF_AREA_ALLOCATION_DATA: {
      return {
        ...state,
        staffAreaAllocationData: action.payload,
      };
    }
    default:
      return state;
  }
}

// Allocation Staff Details
export function getAllocationStaffDetailLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMAllocationReducer", "allocationStaffDetailLoading"],
    false
  );
}
export function getAllocationStaffDetailData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMAllocationReducer", "allocationStaffDetailData"],
    ""
  );
}
// Allocation Area Detail
export function getAllocationAreaDetailLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMAllocationReducer", "allocationAreaDetailLoading"],
    false
  );
}
export function getAllocationAreaDetailData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMAllocationReducer", "allocationAreaDetailData"],
    ""
  );
}

// Staff Area Allocation Submit
export function getStaffAreaAllocationLoading(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMAllocationReducer", "staffAreaAllocationLoading"],
    false
  );
}
export function getStaffAreaAllocationData(state) {
  return _.get(
    state,
    ["SMMRootReducer", "SMMAllocationReducer", "staffAreaAllocationData"],
    ""
  );
}
