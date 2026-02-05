type Props = {
  placeholder: string;
  type?: string;
};

const InputField = ({ placeholder, type = "text" }: Props) => {
  return (
    <input
      className={`h-8 border border-white/15 w-[80%] rounded-sm p-2 text-sm placeholder:text-white/30`}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default InputField;
