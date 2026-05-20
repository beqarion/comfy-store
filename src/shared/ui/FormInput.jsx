export const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <div className="form-control">
      {/* <legend className="fieldset-legend"></legend> */}
      <label htmlFor={name} className="label py-2 px-1">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        id={name}
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered w-full ${size || ""}`}
      />
    </div>
  );
};
