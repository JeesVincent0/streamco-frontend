import React from "react";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ label, readOnly, className, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          readOnly={readOnly}
          {...props}
          className={`w-full rounded-md border p-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#C35B00] focus:border-[#C35B00] 
            ${
              readOnly
                ? "bg-neutral-100 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/5 text-neutral-500 dark:text-neutral-400 cursor-default"
                : "bg-neutral-50 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white cursor-text"
            } ${className}`}
        />
      </div>
    );
  },
);

InputGroup.displayName = "InputGroup";

export default InputGroup;
