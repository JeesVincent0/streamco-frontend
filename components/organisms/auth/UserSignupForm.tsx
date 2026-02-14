"use client";

import Link from "next/link";
import { useState } from "react";
import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import GoogleSignupButton from "@/components/molecules/GoogleSingupButton";

import { signupUser } from "@/features/auth/api/user/signup-user.api";
import { UserSingUp } from "@/features/auth/types/user-signup.type";
import { signupSchema } from "@/features/auth/validators/signup-schema.validator";
import ShInput from "@/components/atoms/ShInput";
import ShButton from "@/components/atoms/ShButton";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { Field, FieldLabel } from "@/components/ui/field";

/*
 *
 * UserSignupForm component is responsible for rendering
 * the user signup form and handling the signup process.
 * It includes form validation using react-hook-form and zod,
 * and makes an API call to register the user. If the signup is
 * successful, it stores the user ID in localStorage and navigates
 * to the OTP verification page. If there is an error during signup,
 * it displays the error message.
 *
 */

const UserSignupForm = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupSchema) });

  // Handle form submission
  const onSubmit = async (data: UserSingUp) => {
    try {
      // Clear previous server error message
      setServerErrorMessage("");

      // Make API call to signup user
      const response = await signupUser(data);
      if (response.status !== "success") {
        setServerErrorMessage(response.message || "Signup failed");
        return;
      }

      // Store user ID in localStorage and navigate to OTP verification page
      localStorage.setItem("id", response.data?.id || "");
      router.push("/otp-verification");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message = axiosError.response?.data?.message || "Signup failed";
      setServerErrorMessage(message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* Google button */}
      <div className="w-full max-w-4xl">
        <GoogleSignupButton />
      </div>

      <p className="dark:text-white/50 text-black/50 my-3">or</p>

      {/* Signup Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl dark:bg-white/10 p-6 rounded-lg border dark:border-white/15 border-black/15 space-y-6"
      >
        <div className="w-full text-sm text-center md:text-left">
          <p>
            <span className="text-lg font-semibold">User Signup:</span>
            <span className="text-red-400 text-sm">
              {serverErrorMessage ? serverErrorMessage : ""}
            </span>
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
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
              error={errors.email?.message}
              label="Email"
              placeholder="Enter email"
              type="email"
              name="email"
              register={register}
              htmlFor="input-email"
            />

            {/* Gender */}
            <Field>
              <FieldLabel>
                Gender{" "}
                <span className="text-xs text-red-400">
                  {errors.gender?.message}
                </span>
              </FieldLabel>

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="NON_BINARY">Non Binary</SelectItem>
                        <SelectItem value="PREFER_NOT_TO_SAY">
                          Prefer not to say
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <ShInput
              error={errors.dob?.message}
              label="Date of Birth"
              placeholder="Select date of birth"
              type="date"
              name="dob"
              register={register}
              htmlFor="input-dob"
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

            <ShButton classValue={`mt-8`} disabled={isSubmitting}>
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

        {/* Signin Link */}
        <div className="text-center">
          <Link
            className="text-sm dark:text-white/60 text-black/60 hover:text-white hover:underline"
            href="/signin"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserSignupForm;
