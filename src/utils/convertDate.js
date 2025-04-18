const convertDate = (inputDate) => {
  if (!inputDate || typeof inputDate !== "string") {
    return "Invalid Date";
  }

  try {
    const [day, month, year] = inputDate.split(",")[0].split("-").map(Number);
    if (!day || !month || !year) throw new Error("Invalid date format");

    const date = new Date(year, month - 1, day);

    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return formatter.format(date);
  } catch (error) {
    console.error("Error converting date:", error.message);
    return "Invalid Date";
  }
};

export default convertDate;
