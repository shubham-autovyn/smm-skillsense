import { getBearerToken } from "../../../services/Authorization/AuthorizationService";
import { baseClient } from "./BaseRepository";

const fetchAreaMasterData = (payload) => {
  var path = `smm/area/master/details?shop_id=${payload?.shop_id}`;
  return baseClient.get(path);
};

const uploadAreaMaster = (payload) => {
  var path = `smm/area/master/upload`;
  const token = getBearerToken();
  let options = {
    headers: {
      shop_id: payload.shop_id,
      shop_name: payload.shop_name,
      Authorization: token,
    },
  };
  return baseClient.post(path, payload.file, options);
};

const saveAreaDetails = (payload) => {
  var path = `smm/area/master/upload/details-save`;
  const token = getBearerToken();
  let options = {
    headers: {
      Authorization: token,
    },
  };
  const data = {
    shop_id: payload.shop_id + "",
    shop_name: payload.shop_name,
    plant_name: payload.plant_name,
    uploader_id: payload.uploader_id,
    uploader_name: payload.uploader_name,
    uploader_email: payload.uploader_email,
    file_name: payload.file_name,
    file_path: payload.file_path,
    siteName: payload.site_name,
    location: payload.location_name,
    effective_date: payload.effective_date,
    manager_id: payload?.manager_id,
    manager_email: payload?.manager_email,
  };
  return baseClient.post(path, data, options);
};
export function deleteAreaMaster(payload) {
  var path = `smm/area/master/delete`;
  return baseClient.delete(path, { data: payload });
}
const fetchRoleMasterData = (payload) => {
  var path = `smm/role/master/details?shop_id=${payload?.shop_id}`;
  return baseClient.get(path);
};

const uploadRoleMaster = (payload) => {
  var path = `smm/role/master/upload`;
  const token = getBearerToken();
  let options = {
    headers: {
      shop_id: payload.shop_id,
      shop_name: payload.shop_name,
      Authorization: token,
    },
  };
  return baseClient.post(path, payload.file, options);
};

const saveRoleDetails = (payload) => {
  var path = `smm/role/master/upload/details-save`;
  const token = getBearerToken();
  let options = {
    headers: {
      Authorization: token,
    },
  };
  const data = {
    shop_id: payload.shop_id + "",
    shop_name: payload.shop_name,
    plant_name: payload.plant_name,
    module_name: payload.module_name,
    uploader_id: payload.uploader_id,
    uploader_name: payload.uploader_name,
    uploader_email: payload.uploader_email,
    file_name: payload.file_name,
    file_path: payload.file_path,
    siteName: payload.site_name,
    location: payload.location_name,
  };
  return baseClient.post(path, data, options);
};
const downloadReport = (payload, options) => {
  var path = `/smm/ct/file/download/url?file_type=${payload.file_type}&shop_id=${payload.shop_id}&file_path=${payload.file_path}`;
  return baseClient.get(path, options);
};

export {
  downloadReport,
  fetchAreaMasterData,
  fetchRoleMasterData,
  saveAreaDetails,
  saveRoleDetails,
  uploadAreaMaster,
  uploadRoleMaster,
};
