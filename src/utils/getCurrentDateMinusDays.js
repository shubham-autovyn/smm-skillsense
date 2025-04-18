import moment from "moment";

const getCurrentDateMinusDays = (days, holidays) => {
  let count = 0;
  let currentDate = moment();

  while (count < days) {
    currentDate = currentDate?.subtract(1, "days");
    if (!holidays?.includes(currentDate?.format("DD-MM-YYYY"))) {
      count++;
    }
  }

  return currentDate.format("DD-MM-YYYY");
};

export default getCurrentDateMinusDays;
