import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type Props = {
  label: string;
  placeholder: string;
  type?: string;
  register: any;
  name: string;
  error?: string;
  fieldDescription?: string;
  htmlFor: string;
  id?: string;
};

const ShInput = ({
  id,
  htmlFor,
  label,
  placeholder,
  type = "text",
  register,
  name,
  error,
  fieldDescription,
}: Props) => {
  return (
    <>
      {" "}
      <Field>
        <FieldLabel htmlFor={htmlFor}>
          {label}: <span className="text-xs text-red-400">{error}</span>
        </FieldLabel>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          {...register(name)}
        />
        <FieldDescription>{fieldDescription}</FieldDescription>
      </Field>
    </>
  );
};

export default ShInput;
