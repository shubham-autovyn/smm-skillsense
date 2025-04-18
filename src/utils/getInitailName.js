function getInitialName(fullName) {
  if (!fullName) return "";
  // Remove aliases like "Mr.", "Mrs."
  const cleanedName = fullName?.replace(/^(mr\.|mrs\.|ms\.)\s*/i, "").trim();
  // Split the cleaned name into words
  const nameParts = cleanedName?.split(" ");
  // Extract the first letter of the first and last names
  const firstInitial = nameParts[0] ? nameParts[0][0].toUpperCase() : "";
  const lastInitial =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1][0].toUpperCase()
      : "";

  return firstInitial + lastInitial;
}

export default getInitialName;
