import { FormInput, SubmitBtn } from "@/shared/ui";
import { Form } from "react-router-dom";

export const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">shipping information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text={'place your order'} />
      </div>
    </Form>
  );
};
