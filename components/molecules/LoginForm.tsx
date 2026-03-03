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
import LinkText from "../atoms/LinkText";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/slice/authSlice";
import { ROLE } from "@/constants/role.enum";
import {
  ADMIN_ROUTES,
  ADVERTISER_ROUTES,
  USER_ROUTES,
} from "@/constants/routers";
import { toast } from "sonner";
import { useUserSigninApiMutation } from "@/lib/service";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [userSigninApi, { isLoading, isError }] = useUserSigninApiMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // form validation function
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleOnSubmit = async (dataa: { email: string; password: string }) => {
    try {
      // Clearing error message and call sigin api with form data.
      setErrorMessage("");
      const response = await userSigninApi(dataa).unwrap();
      const data = response;

      // Role based redirection after successfull signin
      if (data?.status === "success") {
        if (!data) throw new Error("No data");
        if (data.data.role === ROLE.ADVERTISER) {
          dispatch(
            setCredentials({
              user: data.data.user,
              role: data.data.role,
            }),
          );
          router.replace(ADVERTISER_ROUTES.HOME.ROOT);
        } else if (data.data.role === ROLE.ADMIN) {
          dispatch(
            setCredentials({
              user: data.data.user,
              role: data.data.role,
            }),
          );
          router.replace(ADMIN_ROUTES.HOME.ROOT);
        } else {
          dispatch(
            setCredentials({
              user: data.data.user,
              role: data.data.role,
            }),
          );
          router.replace(USER_ROUTES.HOME.ROOT);
        }
        toast.success("Successfully logged in...");
      }
    } catch (error) {
      console.log("this is error: ", error.data.message);
      const data = error.data;

      if (data?.data?.isVerified === false) {
        setErrorMessage(data?.data?.message || "User not verified");
        return;
      }

      // setting server error
      setErrorMessage(
        data?.message ||
          "Something wend wrong, try again after sometimes",
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
      </div>

      {/* Redirection link for create new account */}
      <LinkText path={"/signup"} text={`Create New Account?`} />
      {/* Redirection link for forgot password  */}
      <LinkText path={"/forgot-password"} text={`Forgot Password?`} />
    </form>
  );
};

export default LoginForm;
