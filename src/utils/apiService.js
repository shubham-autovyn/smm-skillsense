import axios from "axios";
import config from "../../config/config";
import { getBearerToken } from "../../../services/Authorization/AuthorizationService";

const apiClient = axios.create({
  baseURL: config.SMM_ENDPOINT, 
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleRequestError = (error) => {
  return Promise.reject(error);
};

const handleResponseError = (error) => {
  if (error.response) {
    console.error("API Response Error:", error.response);
  } else {
    console.error("Network or other error", error);
  }
  return Promise.reject(error);
};

apiClient.interceptors.request.use((config) => config, handleRequestError);
apiClient.interceptors.request.use((config) => {
  const token = getBearerToken();
  if (token && config.headers) {
    config.headers["Authorization"] = token;
  }
  return config;
}, handleRequestError);
apiClient.interceptors.response.use(
  (response) => response,
  handleResponseError
);

// Implement the API service
const apiService = {
  get: (url, config) => {
    return apiClient.get(url, config);
  },
  post: (url, data, config) => {
    return apiClient.post(url, data, config);
  },
  put: (url, data, config) => apiClient.put(url, data, config),
  patch: (url, data, config) => apiClient.patch(url, data, config),
  delete: (url, config) => apiClient.delete(url, config),
};

export default apiService;
