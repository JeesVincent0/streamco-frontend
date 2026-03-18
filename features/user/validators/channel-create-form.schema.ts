import { z } from "zod";

// We use `any()` or specific instance checks for files,
// but often storing the base64 string or Object URL is easiest for form submission.
export const createChannelSchema = z.object({
  profileImage: z.string().min(1, "Profile image is required").optional(),
  channelName: z
    .string()
    .min(3, "Channel name must be at least 3 characters")
    .max(40),
  channelId: z
    .string()
    .min(3, "Channel ID must be at least 3 characters")
    .max(20)
    .regex(
      /^[a-z0-9_]+$/,
      "Channel ID can only contain lowercase letters, numbers, and underscores",
    ),
  bio: z
    .string()
    .max(500, "Bio cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
  backgroundBanner: z.string().min(1, "Banner is required").optional(),
});

export type CreateChannelValues = z.infer<typeof createChannelSchema>;
