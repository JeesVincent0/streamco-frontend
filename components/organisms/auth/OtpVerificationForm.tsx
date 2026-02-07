"use client";

import Link from "next/link";
import InputField from "@/components/atoms/InputField";
import SubmitButton from "@/components/atoms/SubmitButton";
import { otpVerificationSchema } from "@/features/auth/validators/otp-verification.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { otpVerificationApi } from "@/features/auth/api/otp-verification.api";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { getOtpTimerApi } from "@/features/auth/api/get-otp-timer.api";
// import { resendOtpApi } from "@/features/auth/api/resend-otp.api";

const OtpVerificationForm = () => {
  const [ServerErrorMessage, SetServerErrorMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  const [isAllowed, setIsAllowed] = useState(() => {
    return !!localStorage.getItem("id");
  });

  const router = useRouter();

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
        console.log(data.data.timer);
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

      const response = await otpVerificationApi(body);

      console.log(response);

      localStorage.removeItem("id");
      router.push("/");
    } catch (error) {
      const axiosError = error as AxiosError<{
        message: string;
        data: {
          cachedUser: boolean;
        };
      }>;

      const data = axiosError.response?.data;
      if (data?.data.cachedUser === false) {
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
        SetServerErrorMessage("Session expired");
        return;
      }

      // await resendOtpApi({ id });

      // Reset timer to 60 seconds after resend
      setTimeLeft(60);

      SetServerErrorMessage("OTP resent successfully");
    } catch (error) {
      SetServerErrorMessage("Failed to resend OTP");
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-110 mt-30">
      {!isAllowed ? (
        <div className="flex flex-col justify-center items-center gap-4 bg-white/3 py-10 w-full rounded-md border border-white/45">
          <p className="text-red-400 text-sm">
            Too many attempts or not allowed to access this page.
          </p>

          <button
            onClick={handleBack}
            className="text-sm text-white/60 hover:text-white/80 hover:underline"
          >
            Go back
          </button>
        </div>
      ) : (
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
            <p className="text-white/50">Timer: {timeLeft}s</p>

            <p
              onClick={handleResendOtp}
              className={`text-white/40 ${
                timeLeft === 0
                  ? "hover:cursor-pointer hover:underline hover:text-white/70"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
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
            Back to Signup page ?
          </Link>
        </form>
      )}
    </div>
  );
};

export default OtpVerificationForm;
