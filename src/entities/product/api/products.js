import { httpClient } from "@/shared/api";

export const productKeys = {
  all: ["products"],
  featured: () => [...productKeys.all, "featured"],
  filtered: (params) => [...productKeys.all, "filtered", params],
  detail: (id) => [...productKeys.all, id],
};

// featured products
export const fetchFeaturedProducts = async () => {
  const res = await httpClient("/products", {
    params: {
      featured: true,
    },
  });
  return res.data.data;
};
// query
export const featuredProductsQuery = {
  queryKey: productKeys.featured(),
  queryFn: fetchFeaturedProducts,
};

// single product
export const fetchSingleProduct = async (id) => {
  const res = await httpClient(`/products/${id}`);
  return res.data.data;
};
// query
export const singleProductQuery = (id) => ({
  queryKey: productKeys.detail(id),
  queryFn: () => fetchSingleProduct(id),
});

// filtered products
export const fetchFilteredProducts = async (params) => {
  const res = await httpClient("/products", {
    params,
  });
  return res.data;
};
// query
export const filteredProductQuery = (params) => ({
  queryKey: productKeys.filtered(params),
  queryFn: () => fetchFilteredProducts(params),
});
