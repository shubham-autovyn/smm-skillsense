import { baseClient } from "./BaseRepository";

//Start
// const token = getBearerToken();
// axios.defaults.headers.common.Authorization = token;
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

// export function fetchAttendeesDetailsData(payload) {
//   // let  payload={
//   //     "topic":"",
//   //     "trainingId":"",
//   //     "date":"",
//   // }
//   // console.log("Payload", payload);
//   var path = `data`;
//   return axios
//     .create({
//       baseURL: "http://localhost:8000/",
//     })
//     .get(path);
// }
//ENd
export function fetchRefresherOngoingBatchData(payload) {
  var path = `/smm/ct/ongoing-batches?shop_id=${payload.shop_id}&training_type=${payload.training_type}`;
  if (payload?.source !== undefined) {
    return baseClient.get(path, { cancelToken: payload.source.token });
  } else {
    return baseClient.get(path);
  }
}
export function fetchRefresherTrainingPlanData(payload) {
  var path = `/smm/ct/master/topic-details?shop_id=${payload.shop_id}`;
  return baseClient.get(path);
}

//Attendee details
export function fetchAttendeesBatchDetails(payload) {
  //Returns list of training batch for a particular training topic
  var path =
    `/smm/ct/topic-wise-batch-list?shop_id=${payload.shop_id}&topic_id=${payload.topic_id}` +
    (payload.training_date
      ? `&training_date=${payload.training_date + 19800}`
      : ``) +
    (payload.staff_id ? `&staff_id=${payload.staff_id}` : ``);
  return baseClient.get(path);
}
export function fetchAttendeesDetailsData(payload) {
  var path = `/smm/ct/topic/training-details?training_id=${payload.training_id}&shop_id=${payload.shop_id}&topic_id=${payload.topic_id}`;
  return baseClient.get(path);
}
export function fetchRefresherStaffDetails(payload) {
  //Return the array of Staff name and their Ids
  // var path = `/smm/staffs/search?shop_id=${payload.shop_id}&query_str=${payload.query}`;
  var path = `/smm/staffs/search?shop_id=${payload.shop_id}&query=${payload.query}&trainee_type=${payload.trainee_type}`;
  return baseClient.get(path);
}

//New Refresher Training
export function fetchTopicByTrainingType(payload) {
  var path = `/smm/ct/topics-by-training-type?shop_id=${payload.shop_id}&training_type=${payload.training_type}`;
  return baseClient.get(path);
}

//Save details
export function createClassroomTrainingBatch(payload) {
  var path = `/smm/ct/batch/create`;
  return baseClient.post(path, payload);
}

//Attendees Training record
export function fetchAttendeesTrainingRecord(payload) {
  var path = `/smm/ct/batchwise/trainees?batch_id=${payload?.batchId}&shop_id=${payload.shop_id}`;
  return baseClient.get(path);
}

//Update Attendance
export function markAttendance(payload, isDelete) {
  var path = `/smm/ct/batch/mark-attendance`;
  return isDelete
    ? baseClient.delete(path, { data: payload })
    : baseClient.post(path, payload);
}

//Update Batch
export function updateBatchApi(payload) {
  var path = `/smm/ct/batch/update`;
  return baseClient.post(path, payload);
}

//Batch Topics
export function fetchBatchTopicsApi(payload) {
  var path = `/smm/ct/batch/topic/details?shop_id=${payload.shop_id}&batch_id=${payload.batch_id}`;
  return baseClient.get(path);
}

//Update Topics Status
export function updateTopicStatusApi(payload) {
  var path = `/smm/ct/batch/topic/update`;
  return baseClient.post(path, payload);
}

//Fetch Status
export function fetchReattemptStatusApi(payload) {
  var path = `/smm/ct/batch/topic/reattempt-popup-check?shop_id=${
    payload.shop_id
  }&training_id=${
    payload.training_id
  }&training_topic_name=${payload.training_topic_name.replaceAll(
    "&",
    "%26"
  )}&evaluation=${payload.evaluation}`;
  return baseClient.get(path);
}

// Fetch Staffs
export function fetchStaffSearchApi(payload) {
  var path = `/smm/ct/fetch/staff/details/attendance?shop_id=${payload.shop_id}&batch_id=${payload.batch_id}&training_type=${payload.training_type}&query=${payload.query}`;
  return baseClient.get(path);
}

// Save Topic Completed
export function saveTopicCompletedApi(payload) {
  var path = `/smm/ct/batch/save-topic-completed`;
  return baseClient.post(path, payload);
}

//Test Details
export function fetchTestViewData(payload) {
  var path = `/smm/ct/staff/test/details?shop_id=${payload.shop_id}&staff_id=${payload.staff_id}&training_id=${payload.training_id}&test_type=${payload.test_type}`;
  return baseClient.get(path);
}

//Delete Batch
export function deleteBatchApi(payload) {
  var path = `/smm/ct/batch/delete`;
  return baseClient.delete(path, { data: payload });
}

//Subjective Evaluation By Trainer
export function trainerEvaluationSubmit(payload) {
  var path = `/smm/ct/training/subjective/evaluation-by-trainer`;
  return baseClient.post(path, payload);
}

//Fetch the Test Question Paper filled By Trainer
export function fetchTrainerTest(payload) {
  var path =
    `smm/ct/training/trainer-test/questions?shopId=${payload.shop_id}&masterTopicId=${payload.master_topic_id}` +
    (payload.FilledBy ? `&FilledBy=${payload.FilledBy}` : ``) +
    (payload.templateRequired
      ? `&templateRequired=${payload.templateRequired}`
      : ``);
  return baseClient.get(path);
}

//Submit Test Paper
export function submitTest(payload) {
  var path = `/smm/ct/test/submission/by/trainer`;
  return baseClient.post(path, payload);
}

//Pending Batch
export function pendingBatchApi(payload) {
  var path = `/smm/ct/batches/allocation/pending?shop_id=${payload.shop_id}&training_type=${payload.training_type}`;
  return baseClient.get(path);
}
