import { z } from "zod";

export const advertiserSignupSchema = z
  .object({
    firstName: z.string().min(2, "First name required"),
    lastName: z.string().min(2, "Last name required"),
    companyName: z.string().min(2, "Company name required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be in 8 charecteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
