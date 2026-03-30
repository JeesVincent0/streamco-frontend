"use client";

import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import { toast } from "sonner";
import Loading from "../common/LoadingPage";
import { useVerifyOtpMutation } from "@/lib/service/user-api/settingsApi";
import { useResendOtpMutation } from "@/lib/service";
// Assuming you have a generic Spinner or Loader icon
import { Loader2 } from "lucide-react";

interface OtpVerificationProps {
  email: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const OTP_LENGTH = 6;

const UpdateEmailOtpVerification = ({
  onSuccess,
  onCancel,
}: OtpVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false); // New state for resend spinner

  const [verifyOtp] = useVerifyOtpMutation();
  const [resendOtp] = useResendOtpMutation();

  const refreshTimeLeft = () => {
    if (typeof window === "undefined") return 0;
    const resendAtStr = localStorage.getItem("otpResendAt");
    if (!resendAtStr) return 0;

    const resendAt = new Date(resendAtStr).getTime();
    if (isNaN(resendAt)) return 0;

    const diff = Math.floor((resendAt - Date.now()) / 1000);
    return diff > 0 ? diff : 0;
  };

  // Improved Timer Effect
  useEffect(() => {
    // Sync initial state
    setTimeLeft(refreshTimeLeft());

    const timer = setInterval(() => {
      const current = refreshTimeLeft();
      setTimeLeft(current);

      if (current <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isResending]); // Re-run effect when a resend finishes to restart interval

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < OTP_LENGTH) newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length < OTP_LENGTH) return toast.error("Enter complete code.");

    setIsVerifying(true);
    try {
      const id = localStorage.getItem("id");
      const purpose = localStorage.getItem("purpose");
      if (!id || !purpose) throw new Error("Session expired");

      await verifyOtp({ id, purpose, otp: Number(otpCode) }).unwrap();

      localStorage.removeItem("id");
      localStorage.removeItem("purpose");
      localStorage.removeItem("otpResendAt");

      toast.success("Email verified successfully!");
      onSuccess();
    } catch (err: unknown) {
      const error = err as { data: { message: string } };
      toast.error(error?.data?.message || "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0 || isResending) return;

    setIsResending(true);
    try {
      const id = localStorage.getItem("id");
      if (!id) return toast.error("Session expired.");

      const response = await resendOtp({ id }).unwrap();
      const resendAt = response?.data?.otpResendAt;

      if (resendAt) {
        localStorage.setItem("otpResendAt", resendAt.toString());
        // The useEffect will pick this up because isResending changes back to false
      }

      toast.success("New code sent!");
      setOtp(new Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err: unknown) {
      const error = err as { data: { message: string } };
      toast.error(error?.data?.message || "Failed to resend.");
    } finally {
      setIsResending(false);
    }
  };

  if (isVerifying) return <Loading message="Verifying..." />;

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
        disabled={otp.join("").length < OTP_LENGTH || isVerifying}
        className="w-full rounded bg-[#C35B00] px-6 py-3 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Verify Email
      </button>

      <div className="mt-4 flex flex-col items-center gap-2 text-sm">
        <p className="text-neutral-500">{`Didn't receive the code?`}</p>
        <button
          type="button"
          onClick={handleResend}
          disabled={timeLeft > 0 || isResending}
          className={`flex items-center gap-2 font-medium transition-colors ${
            timeLeft > 0 || isResending
              ? "text-neutral-400 cursor-default"
              : "text-[#C35B00] hover:underline cursor-pointer"
          }`}
        >
          {isResending && <Loader2 className="h-4 w-4 animate-spin" />}
          {timeLeft > 0 ? `Resend code in ${timeLeft}s` : "Resend Code"}
        </button>
      </div>

      <button
        onClick={onCancel}
        className="mt-6 text-xs text-neutral-500 underline cursor-pointer"
      >
        Cancel and go back
      </button>
    </div>
  );
};

export default UpdateEmailOtpVerification;
