import { singleProductQuery } from "@/entities/product/api/products";
import { queryClient } from "@/shared/api";

export const loader = async ({ params }) => {
  const { id } = params;
  await queryClient.ensureQueryData(singleProductQuery(id));
  return id;
};
