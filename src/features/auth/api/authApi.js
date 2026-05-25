import { httpClient } from "@/shared/api";

export const register = async (registerData) => {
  const res = await httpClient.post("/auth/local/register", registerData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await httpClient.post("/auth/local", loginData);
  return res.data;
};
