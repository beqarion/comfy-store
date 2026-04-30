import { PaginationContainer, ProductsContainer } from "@/widgets/products";
import { useLoaderData } from "react-router-dom";
import { Filters } from "./Filters";

export const Products = () => {
  const { products, meta } = useLoaderData();
  console.log({ products, meta });

  return (
    <>
      <Filters meta={meta} />
      <ProductsContainer products={products} meta={meta} />
      <PaginationContainer meta={meta} />
    </>
  );
};
