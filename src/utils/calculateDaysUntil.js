const calculateDaysUntil = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);

  // Calculate the difference in time (milliseconds)
  const timeDifference = end - today;

  // Convert time difference to days
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
};

export default calculateDaysUntil;
