import { getAllOrders } from "@/entities/orders";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().user.user;
    if (!user) {
      toast.warn("You must be logged in to checkout");
      return redirect("/login?redirectTo=/checkout");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await getAllOrders(params);
      return { orders: response.data, meta: response.meta };
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
