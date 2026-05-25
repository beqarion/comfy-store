import axios from "axios";

const API_BASE_URL = "https://strapi-store-server.onrender.com/api";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const authClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

authClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
