"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { advertiserSignupSchema } from "@/features/auth/validators/advertiser-schema.validator";
import ShButton from "../atoms/ShButton";
import ShInput from "../atoms/ShInput";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { AdvertiserFormData } from "@/features/auth/types/advertiser-signup.types";
import { signupAdvertiser } from "@/features/auth/api/advertiser/signup-advertiser.api";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const AdvertiserSigupForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(advertiserSignupSchema) });

  const handleOnSubmit = async (data: AdvertiserFormData) => {
    try {
      setErrorMessage("");
      const response = await signupAdvertiser(data);

      if (response.status === "success") {
        localStorage.setItem("id", response.data?.id || "");
        router.push("/otp-verification");
      }
    } catch (error) {
      const exiosError = error as AxiosError<{ message: string }>;
      const data = exiosError.response?.data;
      setErrorMessage(
        data?.message || "somthing wend wrong, try again after sometimes",
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
          Signup:
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
      <Link
        className="text-sm dark:text-white/60 hover:text-white/80 hover:underline"
        href={`/advertiser/signin`}
      >
        Already have an account ? 
      </Link>
    </form>
  );
};

export default AdvertiserSigupForm;
