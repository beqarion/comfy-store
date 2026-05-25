import { fetchFilteredProducts } from "@/entities/product";

export const loader = async ({ request }) => {
  const params = Object.fromEntries(new URL(request.url).searchParams);

  const res = await fetchFilteredProducts(params);
  const { data: products, meta } = res;
  return { products, meta, params };
};
