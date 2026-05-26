import { FormCheckbox, FormInput, FormRange, FormSelect } from "@/shared/ui";
import { Form, Link } from "react-router-dom";

export const Filters = ({ meta, params }) => {
  const { companies, categories } = meta;
  const { search, company, category, shipping, order, price } = params;
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        list={categories}
        size="select-sm"
        defaultValue={category}
      />
      {/* COMPANY */}
      <FormSelect
        label="select company"
        name="company"
        list={companies}
        size="select-sm"
        defaultValue={company}
      />
      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        size="select-sm"
        defaultValue={order}
      />
      {/* PRICE */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        value={price}
      />
      {/* SHIPPING */}
      <FormCheckbox
        label="free shipping"
        name="shipping"
        size="checkbox-small"
        defaultValue={shipping}
      />
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm uppercase">
        search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm uppercase">
        reset
      </Link>
    </Form>
  );
};
