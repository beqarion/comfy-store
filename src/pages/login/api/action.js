import { loginUser } from "@/entities/user";
import { login } from "@/features/auth";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const loginData = Object.fromEntries(formData);

    const redirectTo =
      new URL(request.url).searchParams.get("redirectTo") || "/";

    try {
      const loginResponse = await login(loginData);

      store.dispatch(loginUser(loginResponse));
      toast.success("user logged in successfully");
      return redirect(redirectTo);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "Please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };
