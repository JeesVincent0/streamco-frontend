import { z } from "zod";

export const createChannelSchema = z.object({
  profileImage: z.string().min(1, "Profile image is required").optional(),
  channelName: z
    .string()
    .trim()
    .min(3, "Channel name must be at least 3 characters")
    .max(40),
  channelId: z
    .string()
    .trim()
    .min(3, "Channel ID must be at least 3 characters")
    .max(20)
    .regex(
      /^[a-z0-9_]+$/,
      "Channel ID can only contain lowercase letters, numbers, and underscores",
    ),
  bio: z
    .string()
    .trim()
    .max(500, "Bio cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
  backgroundBanner: z.string().trim().min(1, "Banner is required").optional(),
});

export type CreateChannelValues = z.infer<typeof createChannelSchema>;
