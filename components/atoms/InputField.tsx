type Props = {
  label: string;
  placeholder: string;
  type?: string;
  register: any;
  name: string;
  error?: string;
};

const InputField = ({
  label,
  placeholder,
  type = "text",
  register,
  name,
  error,
}: Props) => {
  return (
    <div className="w-[80%]">
      <label className="text-sm text-white/80" htmlFor="">
        {label}
        {error && (
          <span>
            : <span className="text-red-400 text-xs">{error}</span>
          </span>
        )}
      </label>
      <input
        className={`mt-1 h-8 border border-white/45 w-full rounded-sm p-2 text-sm placeholder:text-white/30`}
        placeholder={placeholder}
        type={type}
        {...register(name)}
      />
    </div>
  );
};

export default InputField;
