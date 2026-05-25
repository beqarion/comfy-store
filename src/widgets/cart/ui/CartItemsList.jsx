import { CartItem } from "@/entities/cart";
import { useSelector } from "react-redux";

export const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <>
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.cartID} cartItem={cartItem} />
      ))}
    </>
  );
};
