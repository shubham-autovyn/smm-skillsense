import { millisecondsToMinutes } from "date-fns";
import { jwtDecode } from "jwt-decode";

export const getBearerToken = () => {
  const bearerToken = localStorage.getItem("id_token");

  if (bearerToken !== null && isTokenValid(false)) {
    return bearerToken;
  } else {
    return null;
  }
};
export const getTokenActiveTime = () => {
  const tokenExpiry = new Date(localStorage.getItem("token_expiry")).getTime();
  if (tokenExpiry) {
    const today = new Date().getTime();

    const diff = tokenExpiry - today;
    const diffInMins = millisecondsToMinutes(diff);

    return diffInMins;
  }
  return null;
};

export const isTokenValid = (check = true) => {
  const checked = check && localStorage.getItem("check_session");
  const diff = getTokenActiveTime();

  return !checked && diff && diff > 0;
};

export const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const getUser = () => {
  let user = null;
  const token = localStorage.getItem("id_token");

  if (token) {
    const decodedToken = jwtDecode(token);
    if (!isTokenValid(false)) {
      handleLogout();
    } else {
      decodedToken.role = decodedToken["custom:role"];
      decodedToken.username = decodedToken["cognito:username"];
      decodedToken.tenant = decodedToken["custom:tenant"];
      decodedToken.manager = decodedToken["custom:manager"];
      decodedToken.managerId = decodedToken["custom:managerId"];
      user = decodedToken;
      if (!user.role || !user.tenant) {
        user.role = "Admin";
        user.tenant = "MSIL";
      }
    }
  }
  return user;
};
