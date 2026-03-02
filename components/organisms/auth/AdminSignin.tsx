"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ShInput from "@/components/atoms/ShInput";
import { Spinner } from "@/components/ui/spinner";
import ShButton from "@/components/atoms/ShButton";
import { loginSchema } from "@/features/auth/validators/login-schema.validator";
import { adminSigninApi } from "@/features/auth/api";
import { ADMIN_ROUTES } from "@/constants/routers";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/slice/authSlice";

const AdminSignin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
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
      setErrorMessage("");
      const response = await adminSigninApi(data);

      if (response?.data.status === "success") {
        const data = response.data.data;
        dispatch(setCredentials({ user: data.user, role: data.role }));
        router.replace(ADMIN_ROUTES.HOME.ROOT);
        toast.success("Successfully logged in...");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{
        message: string;
        data: any;
      }>;
      const data = axiosError.response?.data;

      // setting server error
      setErrorMessage(
        data?.message || "Something wend wrong, try again after sometimes",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col items-center gap-4 dark:bg-white/10 p-4 py-[50] md:p-6 w-full  mx-auto rounded-md border dark:border-white/15"
    >
      <div className="w-[80%] flex  font-bold text-center md:text-left">
        <p>
          Admin Login:
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
    </form>
  );
};

export default AdminSignin;
