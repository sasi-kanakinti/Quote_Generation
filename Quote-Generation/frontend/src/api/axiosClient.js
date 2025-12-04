// @ts-nocheck
import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;

export function parseJwt(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(decoded)));
  } catch {
    return null;
  }
}
