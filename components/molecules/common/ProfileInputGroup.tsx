interface InputGroupProps {
  label: string;
  value?: string;
  readOnly?: boolean;
  placeholder?: string;
}

const InputGroup = ({
  label,
  value,
  readOnly,
  placeholder,
}: InputGroupProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
        {label}
      </label>
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full rounded-md border p-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#C35B00] focus:border-[#C35B00] 
        ${
          readOnly
            ? "bg-neutral-100 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/5 text-neutral-500 dark:text-neutral-400 cursor-default"
            : "bg-neutral-50 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white cursor-text"
        }`}
      />
    </div>
  );
};

export default InputGroup;
