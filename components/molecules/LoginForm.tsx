"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ShInput from "../atoms/ShInput";
import { Spinner } from "../ui/spinner";
import ShButton from "../atoms/ShButton";
import { loginSchema } from "@/features/auth/validators/login-schema.validator";
import Link from "next/link";
import { userSigninApi } from "@/features/auth/api/login.api";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleOnSubmit = async (data: { email: string; password: string }) => {
    try {
      setErrorMessage("");
      const response = await userSigninApi(data);
      if (response.data?.status === "success") {
        router.push("/");
      }

    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const data = axiosError.response?.data;
      setErrorMessage(
        data?.message || "Something wend wrong, try again after sometimes",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col items-center gap-4 bg-white/3 p-4 md:p-6 w-full  mx-auto rounded-md border border-white/45"
    >
      <div className="w-full text-sm text-center md:text-left">
        <p>
          Login:
          <span className="text-red-400 text-sm">
            {errorMessage ? errorMessage : ""}
          </span>
        </p>
      </div>

      <div className="w-[80%]">
        <ShInput
          error={errors.email?.message}
          label="Email"
          placeholder="Enter email"
          type="email"
          name="email"
          register={register}
          htmlFor="input-email"
        />

        <ShInput
          error={errors.password?.message}
          label="Password"
          placeholder="Enter password"
          type="password"
          name="password"
          register={register}
          htmlFor="input-password"
        />

        <div className="mt-2">
          <ShButton disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner data-icon="inline-start" />
                Submitting...
              </>
            ) : (
              "Signup"
            )}
          </ShButton>
        </div>
      </div>
      <Link
        className="text-sm text-white/60 hover:text-white/80 hover:underline"
        href={`/signin`}
      >
        Create new account ?
      </Link>
      <Link
        className="text-sm text-white/60 hover:text-white/80 hover:underline"
        href={`/forgot-password`}
      >
        Forgot password?
      </Link>
    </form>
  );
};

export default LoginForm;
