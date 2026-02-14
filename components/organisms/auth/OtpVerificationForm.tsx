"use client";

import InputField from "@/components/atoms/InputField";
import SubmitButton from "@/components/atoms/SubmitButton";
import { otpVerificationSchema } from "@/features/auth/validators/otp-verification.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { confrimRegistrationApi } from "@/features/auth/api/confrim-registration.api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { getOtpTimerApi } from "@/features/auth/api/get-otp-timer.api";
import { resendOtpApi } from "@/features/auth/api/resend-otp.api";
import ShInput from "@/components/atoms/ShInput";
import ShButton from "@/components/atoms/ShButton";
import { Spinner } from "@/components/ui/spinner";

const OtpVerificationForm = () => {
  const [ServerErrorMessage, SetServerErrorMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  const [isAllowed, setIsAllowed] = useState(() => {
    return !!localStorage.getItem("id");
  });

  const router = useRouter();

  const handleGoBack = () => router.back();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(otpVerificationSchema) });

  // Fetch timer from server when page loads
  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) return;

    const fetchTimer = async () => {
      try {
        const data = await getOtpTimerApi(id);
        setTimeLeft(data.data.timer);
      } catch (error) {
        const axiosError = error as AxiosError<{
          message: string;
          data: { cachedUser: boolean };
        }>;
        const data = axiosError.response?.data;

        if (data?.data.cachedUser === false) {
          localStorage.removeItem("id");
          setIsAllowed(false);
        }
      }
    };

    fetchTimer();
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // OTP submit handler
  const onSubmit = async (data: { otp: string }): Promise<void> => {
    try {
      SetServerErrorMessage("");

      const body = {
        otp: data.otp,
        id: localStorage.getItem("id") || "",
      };

      const response = await confrimRegistrationApi(body);

      if (response.status === "success") {
        localStorage.removeItem("id");
        router.push("/");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{
        message: string;
        data: {
          cachedUser: boolean;
        };
      }>;

      const data = axiosError.response?.data;
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
      const id = localStorage.getItem("id") || "";

      const response = await resendOtpApi({ id });

      // Reset timer to 60 seconds after resend
      setTimeLeft(response.data.timer);

      SetServerErrorMessage("OTP resent successfully");
    } catch (error) {
      const axiosError = error as AxiosError<{
        message: string;
        data: { cachedUser: boolean };
      }>;

      const data = axiosError.response?.data;

      if (data?.data?.cachedUser === false) {
        SetServerErrorMessage(data.message);
        setIsAllowed(false);
      }
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
            <p className="dark:text-white/50 text-black/50">Timer: {timeLeft}s</p>

            <p
              onClick={handleResendOtp}
              className={`dark:text-white/40 text-black/50 ${
                timeLeft === 0
                  ? "hover:cursor-pointer hover:underline dark:hover:text-white/70 hover:text-black/70"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              Resend OTP?
            </p>
          </div>

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
