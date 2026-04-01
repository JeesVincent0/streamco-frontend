"use client";

import { otpVerificationSchema } from "@/features/auth/validators/otp-verification.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import ShInput from "@/components/atoms/ShInput";
import ShButton from "@/components/atoms/ShButton";
import { Spinner } from "@/components/ui/spinner";
import {
  useConfirmRegistrationMutation,
  useResendOtpMutation,
  useVerifyOtpResetPasswordMutation,
} from "@/lib/service/authApi";
import { ADVERTISER_ROUTES, USER_ROUTES } from "@/constants/routers";
import { ROLE } from "@/constants/role.enum";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/slice/authSlice";

const OtpVerificationForm = () => {
  const [confirmRegistration, { isLoading }] = useConfirmRegistrationMutation();
  const [resendOtp, { isLoading: isResedning }] = useResendOtpMutation();
  const [verifyOtpResetPassword] = useVerifyOtpResetPasswordMutation();
  const dispatch = useDispatch();

  const [ServerErrorMessage, SetServerErrorMessage] = useState("");

  const [isAllowed, setIsAllowed] = useState(() => {
    return !!localStorage.getItem("id");
  });

  const router = useRouter();

  const handleGoBack = () => router.back();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ otp: string }>({ resolver: zodResolver(otpVerificationSchema) });

  const getTimeleft = (): number => {
    const id = localStorage.getItem("id");
    const otpResendAt = localStorage.getItem("otpResendAt");
    if (!id || !otpResendAt) return 0;
    const now = new Date().getTime();
    const expiry = new Date(otpResendAt).getTime();
    const remainingTime = Math.max(0, Math.floor((expiry - now) / 1000));
    return remainingTime;
  };

  const [timeLeft, setTimeLeft] = useState<number>(getTimeleft());

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const searchParams = useSearchParams();
  // OTP submit handler
  const onSubmit = async (data: { otp: string }): Promise<void> => {
    try {
      SetServerErrorMessage("");

      const body = {
        otp: data.otp,
        id: localStorage.getItem("id") || "",
      };

      const type = searchParams.get("type");

      if (type === "email-verification") {
        const response = await confirmRegistration(body).unwrap();
        if (response.status === "success") {
          localStorage.clear();
          dispatch(
            setCredentials({
              user: response.data.user,
              role: response.data.role,
            }),
          );

          if (response.data.role === ROLE.USER) {
            router.replace(USER_ROUTES.HOME.ROOT);
          } else if (response.data.role === ROLE.ADVERTISER) {
            router.replace(ADVERTISER_ROUTES.HOME.ROOT);
          }

          toast.success("Account created successfully");
        }
      } else if (type === "reset") {
        const response = await verifyOtpResetPassword(body).unwrap();
        if (response.status === "success") {
          localStorage.clear();
          router.replace("/forgot-password/reset");
          toast.success("OTP verified successfully");
        }
      }
    } catch (error: unknown) {
      const err = error as {
        data: { data: { cachedUser: boolean }; message: string };
      };
      const data = err?.data;

      if (data?.data?.cachedUser === false) {
        setIsAllowed(false);
      }

      SetServerErrorMessage(data?.message || "OTP expired");
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (timeLeft > 0) return;

    try {
      const id = localStorage.getItem("id");
      if (!id) {
        setIsAllowed(false);
        return;
      }

      const response = await resendOtp({ id }).unwrap();

      localStorage.setItem(
        "otpResendAt",
        response.data?.otpResendAt.toString(),
      );
      setTimeLeft(getTimeleft());

      SetServerErrorMessage("OTP resent successfully");
    } catch (error: unknown) {
      const err = error as {
        data: { data: { cachedUser: boolean }; message: string };
      };
      const data = err?.data;

      if (data?.data?.cachedUser === false) {
        setIsAllowed(false);
      }

      SetServerErrorMessage(data?.message);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-110 mt-30">
      {!isAllowed ? (
        <div className="flex flex-col justify-center items-center gap-4 bg-white/15 py-10 w-full rounded-md border dark:border-white/15">
          <p className="text-red-400 text-sm">
            {ServerErrorMessage
              ? ServerErrorMessage
              : "Too many attempts or not allowed to access this page."}
          </p>

          <button
            onClick={handleBack}
            className="text-sm dark:text-white/60 text-black/60 dark:hover:text-white/80 hover:text-black/80 hover:underline"
          >
            Go back
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 dark:bg-white/10 p-6 md:p-6 w-full  mx-auto rounded-md border dark:border-white/15 border-black/15"
        >
          <div className="w-full">
            <p className="font-bold">
              OTP verification:{" "}
              <span className="text-sm text-red-400">{ServerErrorMessage}</span>
            </p>
          </div>

          <ShInput
            error={errors.otp?.message}
            label="Enter OTP"
            placeholder="OTP"
            type="text"
            name="otp"
            register={register}
            htmlFor="input-otp"
          />

          <div className="w-full flex justify-between text-sm">
            <p className="dark:text-white/50 text-black/50">
              Timer: {timeLeft}s
            </p>

            <p
              onClick={handleResendOtp}
              className={`dark:text-white/40 text-black/50 ${
                timeLeft === 0
                  ? "hover:cursor-pointer hover:underline dark:hover:text-white/70 hover:text-black/70"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {isResedning ? (
                <>
                  <Spinner data-icon="inline-start" />
                </>
              ) : (
                `Resend OTP?`
              )}
            </p>
          </div>

          <div className="w-full mt-2">
            <ShButton disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner data-icon="inline-start" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </ShButton>
          </div>

          <button
            onClick={handleGoBack}
            className="text-sm dark:text-white/60 text-black/60 dark:hover:text-white/80 hover:text-black/80 hover:underline"
          >
            Go to back?
          </button>
        </form>
      )}
    </div>
  );
};

export default OtpVerificationForm;
