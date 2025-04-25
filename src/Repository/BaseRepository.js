import axios from "axios";
import Config from "../Config/config";
import { getBearerToken } from "../services/auth";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export const addInterceptors = (client) => {
  client.interceptors.request.use(
    (config) => {
      const token = getBearerToken();
      if (token) {
        config.headers["Authorization"] = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  client.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (401 === error?.response?.status) {
        const originalRequest = error?.config;
        const refreshed = localStorage.getItem("refreshed");
        console.log("refreshed & 401: ", refreshed, originalRequest);
        if (refreshed && !originalRequest._retry) {
          originalRequest._retry = true;
          const token = getBearerToken();
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return client(originalRequest);
        } else {
          // setSessionExpiredTrue();
        }
      }
      return Promise.reject(error);
    }
  );
};

const baseClient = axios.create({
  baseURL: Config.SMM_ENDPOINT,
});

const platformClient = axios.create({
  //FOR FETCHING SHOP,
  baseURL: Config.USER_ENDPOINT,
});

addInterceptors(baseClient);
addInterceptors(platformClient);

export { baseClient, platformClient };
