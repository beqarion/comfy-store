import { allOrdersQuery, OrdersList } from "@/entities/orders";
import { SectionTitle } from "@/shared/ui";
import { PaginationContainer } from "@/widgets/products";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

export const Orders = () => {
  const { params } = useLoaderData();
  const { data } = useQuery(allOrdersQuery(params));
  const { data: orders, meta } = data;

  if (meta.pagination.total < 1) {
    return <SectionTitle text={"please make an order "} />;
  }
  return (
    <>
      <SectionTitle text={"your orders"} />
      <OrdersList meta={meta} orders={orders} />
      <PaginationContainer meta={meta} />
    </>
  );
};
