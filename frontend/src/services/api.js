// /src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // includes /api prefix
});

// Add token to headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;