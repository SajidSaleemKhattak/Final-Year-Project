import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Update this with your backend API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
