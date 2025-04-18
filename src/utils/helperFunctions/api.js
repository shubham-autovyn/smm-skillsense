import { setSessionExpiredTrue } from "../../redux/Actions/SessionAction";
import { getBearerToken } from "../../services/Authorization/AuthorizationService";

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
      if (401 === error?.response?.status) setSessionExpiredTrue();
      return Promise.reject(error);
    }
  );
};
