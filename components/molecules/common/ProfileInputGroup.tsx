import React from "react";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; // 1. Add the error prop
  children?: React.ReactNode;
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  (
    { label, error, readOnly, className, type = "text", children, ...props },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {label}
        </label>

        <div className="relative w-full">
          <input
            ref={ref}
            type={type}
            readOnly={readOnly}
            {...props}
            // 2. Adjust the className to handle the error state styling (red borders)
            className={`w-full rounded-md border p-2.5 text-sm transition-all focus:outline-none focus:ring-1 ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500/80"
                : "focus:border-[#C35B00] focus:ring-[#C35B00]"
            } ${children ? "pr-10" : ""} ${
              readOnly
                ? "bg-neutral-100 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/5 text-neutral-500 dark:text-neutral-400 cursor-default"
                : `bg-neutral-50 dark:bg-[#0F0F0F] ${!error ? "border-neutral-200 dark:border-white/10" : ""} text-neutral-900 dark:text-white cursor-text`
            } ${className || ""}`}
          />

          {children && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400">
              {children}
            </div>
          )}
        </div>

        {/* 3. Render the error message below the input */}
        {error && (
          <span className="text-xs font-medium text-red-500 dark:text-red-400">
            {error}
          </span>
        )}
      </div>
    );
  },
);

InputGroup.displayName = "InputGroup";

export default InputGroup;
