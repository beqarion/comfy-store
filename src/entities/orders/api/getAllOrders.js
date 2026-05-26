import { authClient } from "@/shared/api";

export const getAllOrders = async (params) => {
  const res = await authClient("/orders", { params });
  return res.data;
};
export const allOrdersQuery = (params) => ({
  queryKey: ["orders", params],
  queryFn: () => getAllOrders(params),
});
