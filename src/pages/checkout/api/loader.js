import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = (store) => () => {
  const user = store.getState().user.user;
  if (!user) {
    toast.warn("You must be logged in to checkout");
    return redirect("/login?redirectTo=/checkout");
  }

  return null;
};
