import { baseClient } from "./BaseRepository";

//Allocation Staff Details
export function allocationStaffDetailsApi(payload) {
  const path = `/smm/ct/staff/details/allocation?shop_id=${payload.shop_id}&batch_id=${payload.batch_id}`;
  return baseClient.get(path);
}

//Fetch Online/Offline group line area
export function fetchAllocationAreas(payload) {
  const path = `/smm/ct/area/master/details?shop_id=${payload.shop_id}`;
  return baseClient.get(path);
}

//Fetch Staff Area Allocation
export function fetchStaffAreaAllocationApi(payload) {
  const path = "/smm/ct/staff/area/allocation";
  return baseClient.post(path, payload);
}
