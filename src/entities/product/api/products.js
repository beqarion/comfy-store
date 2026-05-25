import { httpClient } from "@/shared/api";

// featured products
export const fetchFeaturedProducts = async () => {
  const res = await httpClient("/products", {
    params: {
      featured: true,
    },
  });
  return res.data.data;
};

// single product
export const fetchSingleProduct = async (id) => {
  const res = await httpClient(`/products/${id}`);
  return res.data.data;
};

// products
export const fetchProducts = async () => {
  const res = await httpClient("/products");

  return res.data;
};

// filtered products
export const fetchFilteredProducts = async (params) => {
  const res = await httpClient("/products", {
    params,
  });

  return res.data;
};
