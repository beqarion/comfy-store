import { featuredProductsQuery } from "@/entities/product";
import { FeaturedProducts, Hero } from "@/widgets/landing";
import { useQuery } from "@tanstack/react-query";

export const Landing = () => {
  const { data: featuredProducts } = useQuery(featuredProductsQuery);
  return (
    <>
      <Hero />
      <FeaturedProducts featuredProducts={featuredProducts} />
    </>
  );
};
