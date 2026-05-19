import { CartTotals } from "@/entities/cart";
import { CheckoutForm } from "@/features/checkout/ui/CheckoutForm";
import { SectionTitle } from "@/shared/ui";
import { useSelector } from "react-redux";

export const Checkout = () => {
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  if (cartTotal === 0) {
    return <SectionTitle text="your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="place your order" />
      <div className="mt-8 grid gap-8 md: grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};
