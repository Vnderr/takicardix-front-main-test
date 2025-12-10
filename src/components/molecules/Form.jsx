import Input from "../atoms/Input";

function Form({ label, ...inputProps }) {
  return (
    <div className="form">
      <label>{label}</label>
      <Input {...inputProps} />
    </div>
  );
}

export default Form;
