import { PaginationContainer, ProductsContainer } from "@/widgets/products";
import { useLoaderData } from "react-router-dom";
import { Filters } from "./Filters";
import { useQuery } from "@tanstack/react-query";
import { filteredProductQuery } from "@/entities/product";

export const Products = () => {
  const { params } = useLoaderData();
  const { data } = useQuery(filteredProductQuery(params));
  const { data: products, meta } = data;
  return (
    <>
      <Filters meta={meta} params={params} />
      <ProductsContainer products={products} meta={meta} />
      <PaginationContainer meta={meta} />
    </>
  );
};
