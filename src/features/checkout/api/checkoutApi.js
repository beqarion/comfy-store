import { authClient } from "@/shared/api";

export const placeOrder = async (orderData) => {
  const res = await authClient.post("/orders", orderData);
  return res.data;
};
