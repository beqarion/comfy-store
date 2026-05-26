import { allOrdersQuery, getAllOrders } from "@/entities/orders";
import { queryClient } from "@/shared/api";
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
    await queryClient.ensureQueryData(allOrdersQuery(params));
    return { params };
  };
