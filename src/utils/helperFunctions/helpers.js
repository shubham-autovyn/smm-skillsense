import moment from "moment";

export const getErrorMessage = (ex) => {
  let message = "";
  if (ex?.response?.status === 409) {
    message = ex?.response?.data?.message;
  } else {
    message = ex?.message;
  }
  return message;
};

export const formatTableData = (column, item) => {
  if (column?.formatter) {
    if (item !== null) {
      return column?.formatter(item);
    } else {
      return "-";
    }
  } else {
    if (item !== null) {
      return item;
    } else {
      return "-";
    }
  }
};

export const exists = (val) => {
  if (val && val !== null && val !== "") {
    return true;
  }
  return false;
};

export const eventReplica = (name, value) => {
  return { target: { name: name, value: value } };
};
export const getPageSize = () => {
  let page = 20;
  if (window.screen.height > 900) {
    page = 25;
  }
  if (window.screen.height > 1200) {
    page = 35;
  }
  // console.log("HEIGHT", window.screen.height);
  return page;
};

export const formatDateTime = (val, type = "DD MM YYYY; h:mm A") => {
  if (val === "-") {
    return "-";
  }
  if (val) {
    return moment(val).format(type);
  }
};

export const listResult = (list) => {
  if (list && Array.isArray(list)) {
    if (list.length === 0) {
      return undefined;
    } else {
      return list;
    }
  }
  return undefined;
};

export const selectResult = (val) => {
  if (val !== undefined && val !== null && val !== "All") {
    return val;
  }
  return undefined;
};

export const selectEmptyResult = (val) => {
  if (val !== undefined && val !== null && val !== "") {
    return val;
  }
  return undefined;
};
export const formatSecondsToTime = (totalSeconds) => {
  if (!totalSeconds) {
    return undefined;
  }
  const seconds = Number((totalSeconds % 60).toFixed(2));
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor(totalSeconds / 3600);

  const parts = [];
  if (hours > 0) parts.push(`${hours} hr${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? "s" : ""}`);
  if (seconds > 0) parts.push(`${seconds} sec${seconds > 1 ? "s" : ""}`);

  return parts.length > 0 ? parts.join(" ") : "0 secs";
};

export const sliceString = (input, length) => {
  return input?.length > length ? input?.slice(0, length) + "..." : input;
};

export function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}
