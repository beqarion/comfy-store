import { CartItem } from "@/entities/cart";
import { useSelector } from "react-redux";

export const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <div>
      {cartItems.map((cartItem) => (
        <CartItem cartItem={cartItem} key={cartItem.cartID} />
      ))}
    </div>
  );
};
