import { authClient } from "@/shared/api";

export const getAllOrders = async (params) => {
  const res = await authClient("/orders", { params });
  return res.data;
};
