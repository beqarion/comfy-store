import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { generateAmountOptions } from "./ui/generateAmountOptions";
import { formatPrice } from "@/shared/utils";
import { useDispatch } from "react-redux";
import { addItem } from "@/entities/cart/model";

function SingleProduct() {
  const product = useLoaderData();

  const { image, title, price, description, colors, company } =
    product.attributes;

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

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
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            {/* colors */}
            <div className="mt-2">
              {colors.map((color) => (
                <button
                  type="button"
                  key={color}
                  className={`badge w-6 h-6 mr-2 p-0 cursor-pointer ${color === productColor ? "border-2 border-secondary" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setProductColor(color)}
                ></button>
              ))}
            </div>
            {/* amount */}
            <div className="form-control w-full max-w-xs">
              <label htmlFor="amount" className="label px-1 py-2">
                <h4 className="text-md font-medium -tracking-wider capitalize">
                  amount
                </h4>
              </label>
              <select
                className="select select-secondary select-bordered select-md"
                id="amount"
                value={amount}
                onChange={handleAmount}
              >
                {generateAmountOptions(20)}
              </select>
            </div>
            {/* cart btn */}
            <div className="mt-10">
              <button
                className="btn btn-secondary btn-md uppercase"
                onClick={addToCart}
              >
                add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default SingleProduct;
