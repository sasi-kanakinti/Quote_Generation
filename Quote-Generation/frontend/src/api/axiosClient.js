// @ts-nocheck
import axios from "axios";

const backendURL = import.meta.env.VITE_API_URL;

export const API_BASE = `${backendURL}/api`;

const axiosClient = axios.create({
  baseURL: API_BASE,
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
