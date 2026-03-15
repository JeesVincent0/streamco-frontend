"use client";

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import { toast } from "sonner";
import Loading from "../common/LoadingPage"; // Adjust import path as needed
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/lib/service/user-api/settingsApi";
import { useRouter } from "next/navigation";
import { USER_ROUTES } from "@/constants/routers";

interface OtpVerificationProps {
  email: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const OTP_LENGTH = 6;

// Helper function to calculate remaining seconds from the saved timestamp
const calculateTimeLeft = () => {
  if (typeof window === "undefined") return 0;

  const resendAtStr = localStorage.getItem("otpResendAt");
  if (!resendAtStr) return 0;

  const resendAt = parseInt(resendAtStr, 10);
  const now = Date.now();

  const diffInSeconds = Math.floor((resendAt - now) / 1000);

  return diffInSeconds > 0 ? diffInSeconds : 0;
};

const UpdateEmailOtpVerification = ({
  email,
  onSuccess,
  onCancel,
}: OtpVerificationProps) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = [...otp];
    // Take only the last character in case they type fast
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pastedData)) return; // Ensure it's only numbers

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < OTP_LENGTH) {
      return toast.error("Please enter the complete verification code.");
    }

    setIsLoading(true);
    try {
      const id = localStorage.getItem("id");
      const purpose = localStorage.getItem("purpose");

      if (!id || !purpose) {
        toast.error("Session expired. Please try again.");
        router.push(USER_ROUTES.SETTINGS.PROFILE);
        return; // CRITICAL: Added return to stop execution if no ID/Purpose
      }

      await verifyOtp({ id, purpose, otp: Number(otpCode) }).unwrap();

      // Clean up local storage after success
      localStorage.removeItem("id");
      localStorage.removeItem("purpose");
      localStorage.removeItem("otpResendAt");

      toast.success("Email verified successfully!");
      onSuccess();
    } catch {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;

    try {
      const id = localStorage.getItem("id");
      const purpose = localStorage.getItem("purpose");

      // CRITICAL: Check if ID and purpose exist before attempting to resend
      if (!id || !purpose) {
        toast.error("Session expired. Please try again.");
        router.push(USER_ROUTES.SETTINGS.PROFILE);
        return;
      }

      const response = await resendOtp({ id, purpose }).unwrap();

      const newResendAt = response?.data.otpResendAt || Date.now() + 30000;

      localStorage.setItem("otpResendAt", newResendAt.toString());
      setTimeLeft(calculateTimeLeft());

      toast.success("A new code has been sent to your email.");
      setOtp(new Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch {
      toast.error("Failed to resend code. Please try again later.");
    }
  };

  if (isLoading) return <Loading message="Verifying..." />;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="flex gap-2 sm:gap-4 mb-6 justify-center w-full">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-semibold rounded-md border border-neutral-300 dark:border-white/20 bg-white dark:bg-[#0F0F0F] text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C35B00] transition-all"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        disabled={otp.join("").length < OTP_LENGTH || isLoading}
        className="w-full rounded bg-[#C35B00] px-6 py-3 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        Verify Email
      </button>

      <div className="mt-4 flex flex-col items-center gap-2 text-sm">
        <p className="text-neutral-500 dark:text-neutral-400">
          {`Didn't receive the code?`}
        </p>
        <button
          onClick={handleResend}
          disabled={timeLeft > 0}
          className={`font-medium transition-colors ${
            timeLeft > 0
              ? "text-neutral-400 cursor-not-allowed"
              : "text-[#C35B00] hover:underline"
          }`}
        >
          {timeLeft > 0 ? `Resend code in ${timeLeft}s` : "Resend Code"}
        </button>
      </div>

      <button
        onClick={onCancel}
        className="mt-6 text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 underline"
      >
        Cancel and go back
      </button>
    </div>
  );
};

export default UpdateEmailOtpVerification;
