import { CartTotals } from "@/entities/cart";
import { SectionTitle } from "@/shared/ui";
import { CartItemsList } from "@/widgets/cart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Cart = () => {
  const user = useSelector((state) => state.user.user);
  const numItemsInCart = useSelector((state) => state.cart.numItemsInCart);
  if (numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
