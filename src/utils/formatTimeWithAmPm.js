function formatDateTime(dateTimeString, type = "time") {
  const [datePart, timePart] = dateTimeString.split(" ");

  if (type === "time") {
    let [hours, minutes] = timePart.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  } else if (type === "date") {
    const [year, month, day] = datePart.split("-");
    return `${day}-${month}-${year}`;
  } else {
    throw new Error("Invalid type specified. Use 'time' or 'date'.");
  }
}

export default formatDateTime;
