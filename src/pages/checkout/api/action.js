import { clearCart } from "@/entities/cart";
import { placeOrder } from "@/features/checkout";
import { queryClient } from "@/shared/api";
import { formatPrice } from "@/shared/utils";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const { cartItems, orderTotal, numItemsInCart } = store.getState().cart;

    const compositeData = {
      address,
      cartItems,
      chargeTotal: orderTotal,
      name,
      numItemsInCart,
      orderTotal: formatPrice(orderTotal),
    };

    try {
      await placeOrder({ data: compositeData });
      queryClient.removeQueries({ queryKey: "orders" });
      store.dispatch(clearCart());
      toast.success("order placed successfully");
      return redirect("/orders");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      if (error.response.status === 401 || error.response.status === 403) {
        return redirect("/login");
      }
      return null;
    }
  };
