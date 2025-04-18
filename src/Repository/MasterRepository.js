import { getBearerToken } from "../../../services/Authorization/AuthorizationService";
import { baseClient } from "./BaseRepository";

const fetchMasterData = (payload) => {
  var path = `smm/ct/master/details?shop_id=${payload?.shop_id}`;

  return baseClient.get(path);
};

const uploadMaster = (payload) => {
  var path = `smm/ct/master/upload`;
  const token = getBearerToken();
  let options = {
    headers: {
      shop_id: payload.shop_id,
      shop_name: payload.shop_name,
      manager_id: payload?.managerId,
      manager_email: payload?.manager_email,
      Authorization: token,
    },
  };
  const formdata = new FormData();
  formdata.append("file", payload.file);
  return baseClient.post(path, formdata, options);
};

const saveDetails = (payload) => {
  var path = `smm/ct/master/upload/details-save`;
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

export { downloadReport, fetchMasterData, saveDetails, uploadMaster };
