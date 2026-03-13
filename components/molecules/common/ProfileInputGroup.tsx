import React from "react";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  children?: React.ReactNode; // 1. Add children to the interface
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ label, readOnly, className, type = "text", children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {label}
        </label>

        {/* 2. Add a relative wrapper around the input */}
        <div className="relative w-full">
          <input
            ref={ref}
            type={type}
            readOnly={readOnly}
            {...props}
            // Add conditional right padding (pr-10) if children are present
            className={`w-full rounded-md border p-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[#C35B00] focus:border-[#C35B00] ${
              children ? "pr-10" : ""
            } ${
              readOnly
                ? "bg-neutral-100 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/5 text-neutral-500 dark:text-neutral-400 cursor-default"
                : "bg-neutral-50 dark:bg-[#0F0F0F] border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white cursor-text"
            } ${className || ""}`}
          />

          {/* 3. Render children absolutely positioned to the right */}
          {children && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400">
              {children}
            </div>
          )}
        </div>
      </div>
    );
  },
);

InputGroup.displayName = "InputGroup";

export default InputGroup;
