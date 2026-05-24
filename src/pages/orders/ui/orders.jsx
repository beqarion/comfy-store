import { OrdersList } from "@/entities/orders";
import { SectionTitle } from "@/shared/ui";
import { PaginationContainer } from "@/widgets/products";
import { useLoaderData } from "react-router-dom";

export const Orders = () => {
  const { meta } = useLoaderData();

  if (meta.pagination.total < 1) {
    return <SectionTitle text={"please make an order "} />;
  }
  return (
    <>
      <SectionTitle text={"your orders"} />
      <OrdersList />
      <PaginationContainer meta={meta} />
    </>
  );
};
