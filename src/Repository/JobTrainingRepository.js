import { baseClient } from "./BaseRepository";
import { getBearerToken } from "../../../services/Authorization/AuthorizationService";
export function fetchStaffTrainingData(payload) {
  var path = `/smm/mp/ojt/summary/details?shopID=${payload.shop_id}&groupName=${payload.groupName}&lineName=${payload.lineName}&areaName=${payload.areaName}`;
  return baseClient.get(path);
}
//fetch all stations
export function fetchAreaStationsData(payload) {
  var path = `/smm/ojt/fetch/area/stations?shopID=${payload.shop_id}&group=${payload.group}&line=${payload.line}&area=${payload.area}&type=${payload.type}`;
  return baseClient.get(path);
}
//
export function saveStaffTestResults(payload) {
  var path = `/smm/ojt/save/test-result`; 
  return baseClient.post(path, payload);
}
export function fetchStaffTestResults(payload) {
  //var path = `smm/ojt/fetch/test-details?shopID=${payload?.shop_id}&OjtTrainingID=${payload?.ojt_training_id}&staffID=${payload?.staff_id}&level=${payload?.level}&stationName=${payload?.station_name}`;
  var path = `smm/ojt/fetch/test-details?shopID=${payload?.shop_id}&staffID=${payload?.staff_id}&level=${payload?.level}&stationName=${payload?.station_name}&OJTTrainingID=${payload?.ojt_training_id}`;
  return baseClient.get(path);
}
//update station and start training
export function saveStationApi(payload) {
  var path = `/smm/ojt/start/training`;
  return baseClient.post(path, payload);
}
//reset and delete training
export function deleteTrainingApi(payload){
  var path = `smm/ojt/training/delete`;
  return baseClient.delete(path, { data: payload });
}

//upload jpeg pdf files
export const uploadJpegPdfFile = (payload) => {
  var path = `/smm/ojt/level/form/upload`;
  const token = getBearerToken();
  let options = {
    headers: {
      shopID: payload?.shop_id,
      groupName:payload?.group,
      lineName:payload?.line,
      areaName:payload?.area,
      levelType: payload?.level_type,
      "Content-Type": payload?.content_type,
      Authorization: token,
    },
  };
  return baseClient.post(path, payload.file, options);
};
//Download files api
export const downloadJpegPdfFile = (payload, options) => {
  var path = `/smm/ct/file/download/url?file_type=Ojt_Test&file_path=${payload.path}&shop_id=${payload?.shop_id}`;
  return baseClient.get(path, options);
};
//update station and start training
export function navigateNextTrainingApi(payload) {
  var path = `/smm/ojt/update/level/matrix`;
  return baseClient.post(path, payload);
}
//fetch existing Operators
export function fetchExistingOperators(payload) {
  var path = `smm/ojt/multi-skilling/staff-details?shopID=${payload.shop_id}&group=${payload.group}&line=${payload.line}&area=${payload.area}`;
  return baseClient.get(path);
}
//Complete training 
export function markTrainingComplete(payload) {
  var path = `/smm/ojt/mark/training/complete`;
  return baseClient.post(path, payload);
}