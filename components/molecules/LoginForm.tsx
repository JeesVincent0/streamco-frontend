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
import LinkText from "../atoms/LinkText";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const router = useRouter();

  // form validation function
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleOnSubmit = async (data: { email: string; password: string }) => {
    try {
      // Clearing error message and call sigin api with form data.
      setIsVerified(true);
      setErrorMessage("");
      const response = await userSigninApi(data);

      // Role based redirection after successfull signin
      if (response?.status === "success") {
        if (response.data.role === "ADVERTISER") {
          router.push("/advertiser");
        } else if (response.data.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError<{
        message: string;
        data: any;
      }>;
      const data = axiosError.response?.data;

      if (data?.data?.isVerified === false) {
        setIsVerified(false);
        setErrorMessage(data?.message || "User not verified");
        return;
      }

      // setting server error
      setErrorMessage(
        data?.message || "Something wend wrong, try again after sometimes",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col items-center gap-4 dark:bg-white/10 p-4 md:p-6 w-full  mx-auto rounded-md border dark:border-white/15"
    >
      <div className="w-[80%] flex  font-bold text-center md:text-left">
        <p>
          Login:
          <span className="text-red-400 text-sm">
            {errorMessage ? errorMessage : ""}
          </span>
        </p>
      </div>

      <div className="w-[80%] flex flex-col gap-3">
        {/* Email input field */}
        <ShInput
          error={errors.email?.message}
          label="Email"
          placeholder="Enter email"
          type="email"
          name="email"
          register={register}
          htmlFor="input-email"
        />

        {/* Password input field */}
        <ShInput
          error={errors.password?.message}
          label="Password"
          placeholder="Enter password"
          type="password"
          name="password"
          register={register}
          htmlFor="input-password"
        />

        {/* submit button */}
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

      {/* Redirection link for email verification */}
      {!isVerified && (
        <Link
          className="text-sm text-red-400 hover:text-white/80 hover:underline"
          href={`/verify-email`}
        >
          Verify Email?
        </Link>
      )}

      {/* Redirection link for create new account */}
      <LinkText path={"/signup"} text={`Create New Account?`} />
      {/* Redirection link for forgot password  */}
      <LinkText path={"/forgot-password"} text={`Forgot Password?`} />
    </form>
  );
};

export default LoginForm;
