import { featuredProductsQuery } from "@/entities/product";
import { queryClient } from "@/shared/api";

export const loader = async () => {
  await queryClient.ensureQueryData(featuredProductsQuery);
  return null;
};
