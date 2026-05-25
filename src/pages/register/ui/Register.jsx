import { FormInput, SubmitBtn } from "@/shared/ui";
import { Form, Link } from "react-router-dom";

export const Register = () => {
  return (
    <section className="min-h-svh grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold capitalize">register</h4>
        <FormInput label={"username"} name={"username"} type={"text"} />
        <FormInput label={"email"} name={"email"} type={"email"} />
        <FormInput label={"password"} type={"password"} name={"password"} />
        <div className="mt-4">
          <SubmitBtn text={"register"} />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to={"/login"}
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
