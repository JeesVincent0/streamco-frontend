import z from "zod";

export const otpVerificationSchema = z.object({
  otp: z
    .string()
    .regex(/^[0-9]+$/, "OTP must contain only numbers")
    .length(6, "OTP must be 6 digits"),
});
