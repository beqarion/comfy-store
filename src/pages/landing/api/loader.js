import { fetchFeaturedProducts } from "@/entities/product/api/products";

export const loader = async () => {
  const products = await fetchFeaturedProducts();
  return products;
};
