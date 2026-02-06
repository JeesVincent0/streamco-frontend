import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name required"),
    lastName: z.string().min(2, "Last name required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be 8 characters"),
    confirmPassword: z.string(),
    gender: z.string().min(1, "Select gender"),
    dob: z.string().min(1, "Select date of birth"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
