import { z } from "zod";

export const strictSocialLinksSchema = z.object({
  instagram: z
    .string()
    .trim()
    .url({ message: "Please enter a valid URL" })
    .includes("instagram.com", { message: "Must be a valid Instagram link" })
    .optional()
    .or(z.literal("")),
  x: z
    .string()
    .trim()
    .url({ message: "Please enter a valid URL" })
    .refine(
      (val) =>
        val === "" || val.includes("x.com") || val.includes("twitter.com"),
      {
        message: "Must be a valid X or Twitter link",
      },
    )
    .optional()
    .or(z.literal("")),
  facebook: z
    .string()
    .trim()
    .url({ message: "Please enter a valid URL" })
    .includes("facebook.com", { message: "Must be a valid Facebook link" })
    .optional()
    .or(z.literal("")),
  youtube: z
    .string()
    .trim()
    .url({ message: "Please enter a valid URL" })
    .refine(
      (val) =>
        val === "" || val.includes("youtube.com") || val.includes("youtu.be"),
      {
        message: "Must be a valid YouTube link",
      },
    )
    .optional()
    .or(z.literal("")),
});

export type SocialLinksFormValues = z.infer<typeof strictSocialLinksSchema>;
