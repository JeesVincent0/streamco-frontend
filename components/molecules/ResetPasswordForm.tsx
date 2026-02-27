"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ShInput from "../atoms/ShInput";
import ShButton from "../atoms/ShButton";
import { Spinner } from "../ui/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyResetPassword } from "@/features/auth/api";
import { AxiosError } from "axios";
import { resetPasswordSchema } from "@/features/auth/validators/reset-password-schema.validator";
import { AUTH_ROUTES } from "@/constants/routers";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const [isAllowed, setIsAllowed] = useState(() => {
    return localStorage.getItem("purpose") === "reset_password";
  });

  const handleOnSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    setErrorMessage("");
    const id = localStorage.getItem("id");
    if (!id) {
      setIsAllowed(false);
    }
    try {
      const response = await verifyResetPassword(data);
      if (response.status === "success") {
        localStorage.clear();
        router.replace(AUTH_ROUTES.LOGIN.ROOT);
      }
    } catch (error) {
      const axiosResponse = error as AxiosError<{ message: string }>;
      const data = axiosResponse.response?.data;
      setErrorMessage(data?.message || "Something went wrong");
    }
  };

  const handleBack = () => router.back();
  return (
    <div className="w-110 mt-30">
      {isAllowed ? (
        <div className="flex flex-col justify-center items-center gap-4 bg-white/15 py-10 w-full rounded-md border dark:border-white/15">
          <p className="text-red-400 text-sm">Session Expired</p>

          <button
            onClick={handleBack}
            className="text-sm dark:text-white/60 text-black/60 dark:hover:text-white/80 hover:text-black/80 hover:underline"
          >
            Go back?
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex flex-col items-center gap-4 dark:bg-white/10 p-6 md:p-6 w-full  mx-auto rounded-md border dark:border-white/15 border-black/15"
        >
          <p className="font-bold">
            Reset Password:{" "}
            <span className="text-sm text-red-400">{errorMessage}</span>
          </p>

          <div className="w-[95%] flex flex-col gap-5">
            <ShInput
              id={`password`}
              htmlFor={`input-password`}
              label={`Password`}
              placeholder={`Enter password`}
              name={`password`}
              type={`password`}
              error={errors.password?.message}
              register={register}
            />

            <ShInput
              id={`confirm_password`}
              htmlFor={`input-confirm-password`}
              label={`Confirm Password`}
              placeholder={`Confirm password`}
              name={`confirmPassword`}
              type={`password`}
              error={errors.confirmPassword?.message}
              register={register}
            />

            <div className="w-full mt-2">
              <ShButton disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner data-icon="inline-start" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </ShButton>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordForm;
