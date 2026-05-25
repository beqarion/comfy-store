import { register } from "@/features/auth";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const registerData = Object.fromEntries(formData);

  const redirectTo =
    new URL(request.url).searchParams.get("redirectTo") || "/login";

  try {
    const registerResponse = await register(registerData);
    toast.success("account created successfully");
    return redirect(redirectTo);
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check your credentials";
    toast.error(errorMessage);
    return null;
  }
};
