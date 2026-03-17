import { z } from "zod";

export const advertiserUpdateSchema = z.object({
  displayName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .refine((val) => val.trim().length > 0, "Name cannot be empty"),

  email: z.string().email("Please enter a valid email address").toLowerCase(),

  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name is too long")
    .refine((val) => val.trim().length > 0, "Company name cannot be empty"),
});

export type AdvertiserUpdateValues = z.infer<typeof advertiserUpdateSchema>;
