import { baseClient } from "./BaseRepository";

const fetchReportFilters = (payload) => {
  let path = `smm/ct/training/test/report/filter?shop_id=${payload.shop_id}&training_type=${payload.training_type}&start_date=${payload.start_date}&end_date=${payload.end_date}`;
  return baseClient.get(path);
};

const fetchStaffSearch = (payload) => {
  let path = `smm/staffs/search?query=${payload.query}&shop_id=${payload.shop_id}`;
  if (payload?.is_trainer) {
    path = `${path}&is_trainer=${payload.is_trainer}`;
  }
  return baseClient.get(path);
};

const fetchStaffDetails = (payload) => {
  let path =
    `smm/ct/training/test/report/staff-details?shop_id=${payload.shop_id}&training_type=${payload.training_type}&training_date_from=${payload.training_date_from}&training_date_to=${payload.training_date_to}` +
    (payload.staff_ids ? `&staff_ids=${payload.staff_ids}` : ``) +
    (payload.trainer_id ? `&trainer_id=${payload.trainer_id}` : ``) +
    (payload.topic_names ? `&topic_names=${payload.topic_names}` : ``) +
    (payload.training_test_name
      ? `&training_test_name=${payload.training_test_name}`
      : ``) +
    (payload.control_no ? `&control_no=${payload.control_no}` : ``) +
    (payload.revision ? `&revision=${payload.revision}` : ``) +
    (payload.pass_or_fail ? `&pass_or_fail=${payload.pass_or_fail}` : ``) +
    (payload.evaluation ? `&evaluation=${payload.evaluation}` : ``) +
    (payload.no_of_attempts
      ? `&no_of_attempts=${payload.no_of_attempts}`
      : ``) +
    (payload.is_pagination_disabled
      ? `&is_pagination_disabled=${payload.is_pagination_disabled}`
      : ``) +
    (payload.start_key
      ? `&start_key=${encodeURIComponent(JSON.stringify(payload.start_key))}`
      : ``);

  return baseClient.get(path);
};

const fetchSupervisorStaffStationApi = (payload) => {
  let path =
    `smm/ojt/report/staff/station?shop_id=${payload.shop_id}&plant_id=${payload.plant_id}&group_name=${payload.group_name}&line_name=${payload.line_name}&area_name=${payload.area_name}&start_date=${payload.start_date}&end_date=${payload.end_date}` +
    (payload.station_type?.length
      ? `&station_type=${payload.station_type}`
      : ``) +
    (payload.ojt_type?.length ? `&ojt_type=${payload.ojt_type}` : ``);

  return baseClient.get(path);
};

const fetchSupervisorStaffReportsApi = (payload) => {
  let path =
    `smm/ojt/report/trainings?shop_id=${payload.shop_id}&plant_id=${payload.plant_id}&group_name=${payload.group_name}&line_name=${payload.line_name}&area_name=${payload.area_name}&start_date=${payload.start_date}&end_date=${payload.end_date}&pagination_allowed=${payload.pagination_allowed}` +
    (payload.station_type?.length
      ? `&station_type=${payload.station_type}`
      : ``) +
    (payload.ojt_type?.length ? `&ojt_type=${payload.ojt_type}` : ``) +
    (payload.staff_ids?.length ? `&staff_ids=${payload.staff_ids}` : ``) +
    (payload.stations?.length ? `&stations=${payload.stations}` : ``) +
    (payload.offset ? `&offset=${payload.offset}` : ``) +
    (payload.no_of_records ? `&no_of_records=${payload.no_of_records}` : ``);

  return baseClient.get(path);
};

const fetchDPMPlantAreaDetailApi = (payload) => {
  let path = `/smm/ojt/report/area-details?plant_id=${payload.plant_id}&start_date=${payload.start_date}&end_date=${payload.end_date}`;
  return baseClient.get(path);
};

export {
  fetchReportFilters,
  fetchStaffSearch,
  fetchStaffDetails,
  fetchSupervisorStaffStationApi,
  fetchSupervisorStaffReportsApi,
  fetchDPMPlantAreaDetailApi,
};
