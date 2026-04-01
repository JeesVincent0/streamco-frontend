import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().trim().min(2, "First name required"),
    lastName: z.string().trim().min(2, "Last name required"),
    email: z.string().trim().email("Invalid email"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

    confirmPassword: z.string().trim(),
    gender: z.string().trim().min(1, "Select gender"),
    dob: z.string().trim().min(1, "Select date of birth"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
