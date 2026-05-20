import { authClient } from "@/shared/api";

export const getAllOrders = async () => {
  const res = await authClient("/orders");
  return res.data;
};
