import { z } from "zod";

export const channelBasicDetailsSchema = z.object({
  channelName: z
    .string()
    .trim()
    .min(3, "Channel name must be at least 3 characters"),
  channelId: z
    .string()
    .trim()
    .min(3, "Channe ID must be at least 3 characters"),
  bio: z
    .string()
    .trim()
    .max(160, "Bio cannot exceed 160 characters")
    .optional()
    .or(z.literal("")),
  gender: z.string().trim().min(1, "Gender is required"),
  email: z.string().trim().email("Invalid email address").optional(),
});
