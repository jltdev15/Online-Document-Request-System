import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:4000/v1/api",
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: "https://pbc-api.onrender.com/v1/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
