import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://api-survey.krisantec.com/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  if (token) {
    config.headers["Authorization"] = `Token ${token}`; // Add the token to the request headers
  }
  return config;
});

export default axiosInstance;
