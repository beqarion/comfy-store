import { Link, useParams } from "react-router-dom";
import { formatPrice } from "@/shared/utils";
import { AddToCartForm } from "@/features/add-to-cart";
import { useQuery } from "@tanstack/react-query";
import { singleProductQuery } from "@/entities/product";

export const SingleProduct = () => {
  const { id } = useParams();
  const { data: product } = useQuery(singleProductQuery(id));
  console.log(product);

  const { image, title, price, description, company } = product.attributes;

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/products"}>Products</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{formatPrice(price)}</p>
          <p className="mt-6 leading-8">{description}</p>
          <AddToCartForm product={product} />
        </div>
      </div>
    </section>
  );
};
