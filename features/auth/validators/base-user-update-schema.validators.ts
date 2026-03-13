import { email, z } from "zod";

export const baseUserUpdateSchema = z.object({
  displayName: z.string().min(3, "Display name must be at least 3 characters"),
  bio: z
    .string()
    .max(160, "Bio cannot exceed 160 characters")
    .optional()
    .or(z.literal("")),
  dob: z.string().refine((dateStr) => {
    const birthDate = new Date(dateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 12;
  }, "You must be at least 12 years old"),
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email("Invalid email address").optional(),
});
