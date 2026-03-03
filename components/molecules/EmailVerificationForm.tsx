"use client";

import { emailVerificationSchema } from "@/features/auth/validators/email-verification-schema.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ShInput from "../atoms/ShInput";
import ShButton from "../atoms/ShButton";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGenerateOtpApiMutation } from "@/lib/service";

const EmailVerificationForm = () => {
  const [generateOtpApi, { isLoading }] = useGenerateOtpApiMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(emailVerificationSchema) });

  const handleGoBack = () => router.back();

  const handleOnSubmit = async (data: { email: string; purpose?: string }) => {
    try {
      data.purpose = "reset_password";
      const response = await generateOtpApi(data).unwrap();
      if (response.status === "success") {
        localStorage.setItem("otpResendAt", response.data?.otpResendAt);
        localStorage.setItem("id", response.data?.id);
        router.push("/otp-verification?type=reset");
        toast.success("OTP send successfully");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const data = axiosError.response?.data;

      setErrorMessage(data?.message || "Somthing wend wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col items-center gap-4 px-6 dark:bg-white/10 p-4 md:p-6 w-full  mx-auto rounded-md border dark:border-white/15"
    >
      <div className="w-full text-sm font-semibold text-center  md:text-left">
        <p>
          Verify your email ID:
          <span className="text-red-400 text-sm">
            {errorMessage ? errorMessage : ""}
          </span>
        </p>
      </div>

      <ShInput
        error={errors.email?.message}
        label="Email"
        placeholder="Enter email"
        type="text"
        name="email"
        register={register}
        htmlFor="input-email"
      />

      <div className="w-full mt-1">
        <ShButton disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner data-icon="inline-start" />
              Generating...
            </>
          ) : (
            "Generate OTP"
          )}
        </ShButton>
      </div>
      <button
        onClick={handleGoBack}
        className="text-sm dark:text-white/60 dark:hover:text-white/80 hover:cursor-pointer hover:underline"
      >
        Go to back?
      </button>
    </form>
  );
};

export default EmailVerificationForm;
