"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { advertiserSignupSchema } from "@/features/auth/validators/advertiser-schema.validator";
import ShButton from "../atoms/ShButton";
import ShInput from "../atoms/ShInput";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import LinkText from "../atoms/LinkText";
import { toast } from "sonner";
import { useSignupAdvertiserMutation } from "@/lib/service";
import { AdvertiserSignup } from "@/lib/interfaces";

const AdvertiserSigupForm = () => {
  const [signupAdvertiser, { isLoading }] = useSignupAdvertiserMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(advertiserSignupSchema) });

  const handleOnSubmit = async (data: AdvertiserSignup) => {
    try {
      setErrorMessage("");
      const response = await signupAdvertiser(data).unwrap();

      if (response?.status === "success") {
        localStorage.setItem("id", response?.data.id);
        localStorage.setItem(
          "otpResendAt",
          response.data?.otpResendAt.toString(),
        );
        router.push("/otp-verification?type=email-verification");
        toast.success("OTP send successfully");
      }
    } catch (error) {
      const exiosError = error as AxiosError<{ message: string }>;
      const data = exiosError.data;
      setErrorMessage(
        data?.message || "somthing wend wrong, try again after sometimes",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col items-center gap-4 dark:bg-white/10 p-4 md:p-6 w-full  mx-auto rounded-md border dark:border-white/15 border-black/15"
    >
      <div className="w-full text-sm text-center md:text-left">
        <p className="text-lg font-bold">
          Advertiser Signup:
          <span className="text-red-400 text-sm">
            {errorMessage ? errorMessage : ""}
          </span>
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <ShInput
          error={errors.firstName?.message}
          label="First Name"
          placeholder="Enter first name"
          type="text"
          name="firstName"
          register={register}
          htmlFor="input-first-name"
        />

        <ShInput
          error={errors.lastName?.message}
          label="Last Name"
          placeholder="Enter last name"
          type="text"
          name="lastName"
          register={register}
          htmlFor="input-last-name"
        />

        <ShInput
          error={errors.companyName?.message}
          label="Company Name"
          placeholder="Enter company name"
          type="text"
          name="companyName"
          register={register}
          htmlFor="input-company-name"
        />

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

        <ShInput
          error={errors.confirmPassword?.message}
          label="Confirm Password"
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          register={register}
          htmlFor="input-confirm-password"
        />
      </div>

      <div className="w-full mt-2">
        <ShButton disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner data-icon="inline-start" />
              Submitting...
            </>
          ) : (
            "Signup"
          )}
        </ShButton>
      </div>
      <LinkText path={`/login`} text={`Already have an account?`} />
    </form>
  );
};

export default AdvertiserSigupForm;
