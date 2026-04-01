"use client";

import React, { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
  label?: string;
  placeholder: string;
  type?: string;
  register?: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  fieldDescription?: string;
  htmlFor: string;
  id?: string;
  style?: string;
  children?: React.ReactNode;
};

const ShInput = <T extends FieldValues>({
  id,
  htmlFor,
  label,
  placeholder,
  type = "text",
  register,
  name,
  error,
  fieldDescription,
  style,
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Field>
      {label && (
        <FieldLabel htmlFor={htmlFor}>
          {label}: <span className="text-xs text-red-400">{error}</span>
        </FieldLabel>
      )}

      {type === "password" ? (
        <InputGroup>
          <InputGroupInput
            className={style}
            id={id}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            {...(register ? register(name) : {})}
          />
          <InputGroupAddon align="inline-end">
            <div
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
              className="flex items-center justify-center h-full px-2"
            >
              {showPassword ? (
                <EyeIcon height={17} />
              ) : (
                <EyeOffIcon height={17} />
              )}
            </div>
          </InputGroupAddon>
        </InputGroup>
      ) : (
        <Input
          className={style}
          id={id}
          type={type}
          placeholder={placeholder}
          {...(register ? register(name) : {})}
        />
      )}

      {fieldDescription && (
        <FieldDescription>{fieldDescription}</FieldDescription>
      )}
    </Field>
  );
};

export default ShInput;
