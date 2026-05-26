import { filteredProductQuery } from "@/entities/product";
import { queryClient } from "@/shared/api";

export const loader = async ({ request }) => {
  const params = Object.fromEntries(new URL(request.url).searchParams);
  await queryClient.ensureQueryData(filteredProductQuery(params));
  return { params };
};
