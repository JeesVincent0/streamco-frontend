"use client";

import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import GoogleSignupButton from "@/components/molecules/GoogleSingupButton";
import { UserSingUp } from "@/features/auth/types/user-signup.type";
import { signupUser } from "@/features/auth/api/signup-user.api";
import { signupSchema } from "@/features/auth/validators/signup-schema.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";

const UserSignupForm = () => {
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: UserSingUp) => {
    try {
      setServerErrorMessage("");
      await signupUser(data);
      alert("Signup successfull");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message = axiosError.response?.data?.message || "Signup failed";
      setServerErrorMessage(message);
    }
  };

  return (
    <div className="flex flex-col items-center w-200 gap-3">
      {/* Google button */}
      <GoogleSignupButton />

      <p className="text-white/50">or</p>

      {/* User singup form using email */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-4 bg-white/3 py-4 w-full rounded-md border border-white/45"
      >
        <div className="w-170 text-sm">
          <p>
            Singup:{" "}
            <span className="text-red-400 text-sm">{serverErrorMessage}</span>
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center w-85 gap-4">
            {/* first name input field */}
            <InputField
              label={"First Name"}
              placeholder=""
              register={register}
              name="firstName"
              error={errors.firstName?.message}
            />

            {/* Last name input field */}
            <InputField
              label={"Last Name"}
              placeholder=""
              register={register}
              name="lastName"
              error={errors.lastName?.message}
            />

            {/* email input field */}
            <InputField
              label={"Email"}
              placeholder=""
              type="email"
              register={register}
              name="email"
              error={errors.email?.message}
            />

            {/* Gender selction field */}
            <SelectField
              register={register}
              name="gender"
              error={errors.gender?.message}
            />
          </div>

          <div className="flex flex-col justify-center w-85 gap-4">
            {/* DOB input field */}
            <InputField
              label={"DOB"}
              placeholder=""
              type="date"
              register={register}
              name="dob"
              error={errors.dob?.message}
            />

            {/* Password input field */}
            <InputField
              label={"Password"}
              placeholder=""
              type="password"
              register={register}
              name="password"
              error={errors.password?.message}
            />

            {/* Confirm password input field */}
            <InputField
              label={"Confirm Password"}
              placeholder=""
              type="password"
              register={register}
              name="confirmPassword"
              error={errors.confirmPassword?.message}
            />

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 h-8 border border-white/75 hover:border-white w-[80%] rounded-sm bg-[#FF7701] hover:bg-[#c95e00] font-semibold text-sm hover:text-[15px] hover:cursor-pointer"
            >
              {isSubmitting ? "Signing Up..." : "SignUp"}
            </button>
          </div>
        </div>

        <Link
          className="text-sm text-white/60 hover:text-white/80 hover:underline"
          href={`/signin`}
        >
          Already have an account ?
        </Link>
      </form>
    </div>
  );
};

export default UserSignupForm;
