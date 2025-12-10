import Input from '../atoms/Input';


function FormFields({ fields, formData, handleChange }) {
  return (
    <>
      {fields.map((field) => (
        <Input
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formData[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
        />
      ))}
    </>
  );
}

export default FormFields;

