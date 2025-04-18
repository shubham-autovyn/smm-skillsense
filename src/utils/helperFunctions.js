import dayjs from "dayjs";
const jsMonthMap = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
const monthsMap = {
  apr: 0,
  may: 1,
  jun: 2,
  jul: 3,
  aug: 4,
  sep: 5,
  oct: 6,
  nov: 7,
  dec: 8,
  jan: 9,
  feb: 10,
  mar: 11,
  // adhoc: 12,
};
export const getEpochToDDMMYY = (inputDate) => {
  if (Number.isInteger(inputDate)) {
    return dayjs(inputDate * 1000).format("DD/MM/YYYY"); //It automatically handles time zones
  }
  return "-";
};

export const checkPlannedInCurrentMonth = (plannedMonths, currentEpoch) => {
  const IST_time = new Date(currentEpoch * 1000 + 19800000);
  let monthsLowerCase = plannedMonths.map((month) => month.toLowerCase());
  return monthsLowerCase.includes(jsMonthMap[IST_time.getMonth()]);
};
export const checkPlannedInPreviousMonth = (plannedMonths, currentEpoch) => {
  const IST_time = new Date(currentEpoch * 1000 + 19800000);
  const currentMonth = jsMonthMap[IST_time.getMonth()]; //It will return jan for 0,

  return plannedMonths.some(
    (month) => monthsMap[month.toLowerCase()] < monthsMap[currentMonth]
  );
};
export const dateFormat = (date, symbol = "-") => {
  const data = date?.split(symbol);
  return new Date(`${data?.[1]}-${data?.[0]}-${data?.[2]}`);
};

export const isSameDate = (date) => {
  return (
    dateFormat(date, "-").setHours(0, 0, 0, 0) ===
    new Date().setHours(0, 0, 0, 0)
  );
};

export const getFormattedEpocDateTime = (inputDate) => {
  if (Number.isInteger(inputDate)) {
    return dayjs(inputDate * 1000).format("DD/MM/YYYY, HH:mm:ss");
  }
  return "-";
};

export const getMonthDiff = (date1, date2) => {
  let months;
  months = (date2?.getFullYear() - date1?.getFullYear()) * 12;
  months -= date1?.getMonth();
  months += date2?.getMonth();
  return months;
};

export const compareDates = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();
  return date1 < date2;
};
