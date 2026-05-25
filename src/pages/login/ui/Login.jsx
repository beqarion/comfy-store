import { loginUser } from "@/entities/user";
import { login } from "@/features/auth";
import { FormInput, SubmitBtn } from "@/shared/ui";
import { useDispatch } from "react-redux";
import { Form, Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const GUEST_CREDENTIALS = { identifier: "test@test.com", password: "secret" };

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const loginAsGuestUser = async () => {
    const redirectTo = searchParams.get("redirectTo") || "/";
    try {
      const response = await login(GUEST_CREDENTIALS);
      dispatch(loginUser(response));
      toast.success("welcome guest user");
      navigate(redirectTo);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "Please double check your credentials";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="min-h-svh grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput label={"email"} type={"email"} name={"identifier"} />
        <FormInput label={"password"} type={"password"} name={"password"} />
        <div className="mt-4">
          <SubmitBtn text={"login"} />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block uppercase"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to={"/register"}
            className="'ml-2 link link-hover link-primary capitalize'"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
