"use client";

import Link from "next/link";
import InputField from "@/components/atoms/InputField";
import SubmitButton from "@/components/atoms/SubmitButton";
import { otpVerificationSchema } from "@/features/auth/validators/otp-verification.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { otpVerificationApi } from "@/features/auth/api/otp-verification.api";
import { AxiosError } from "axios";

const OtpVerificationForm = () => {
  const [ServerErrorMessage, SetServerErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(otpVerificationSchema) });
  const onSubmit = async (data: { otp: string }): Promise<void> => {
    try {
      SetServerErrorMessage("");
      await otpVerificationApi(data);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message || "OTP verification failed";
      SetServerErrorMessage(message);
    }
  };
  return (
    <div className="w-110 mt-30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-4 bg-white/3 py-10 w-full rounded-md border border-white/45"
      >
        <div className="w-[80%]">
          <p className="text-sm">
            OTP verification:{" "}
            <span className="text-sm text-red-400">{ServerErrorMessage}</span>
          </p>
        </div>
        <InputField
          label={"Enter OTP"}
          placeholder={"OTP number"}
          register={register}
          name={"otp"}
          error={errors.otp?.message}
        />
        <div className="w-[80%] flex justify-between text-sm">
          <p className="text-white/50">Timer:</p>
          <p className="text-white/40 hover:cursor-pointer hover:underline hover:text-white/70">
            Resend OTP?
          </p>
        </div>
        <SubmitButton
          isSubmitting={isSubmitting}
          submittingText={"Verifying..."}
          text={"Verify OTP"}
        />
        <Link
          className="text-sm text-white/60 hover:text-white/80 hover:underline"
          href={"/signup"}
        >
          Back to Singup page ?
        </Link>
      </form>
    </div>
  );
};

export default OtpVerificationForm;
