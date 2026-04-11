import { z } from "zod";

export enum VISIBILITY {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  UNLISTED = "UNLISTED",
}

export const scheduleLiveSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  visibility: z.nativeEnum(VISIBILITY, {
    errorMap: () => ({ message: "Select a valid visibility" }),
  }),
  description: z.string().min(20, "Description is too short"),
  categoryId: z.string().min(1, "Category is required"),
  // Duration validation for HH:MM
  duration: z
    .string()
    .regex(/^([0-9]{1,2}):([0-5][0-9])$/, "Format must be HH:MM"),
  // Date handles pre-processing if it comes as a string from the input
  date: z.coerce
    .date({
      errorMap: () => ({ message: "A valid date is required" }),
    })
    .refine(
      (d) => d >= new Date(new Date().setHours(0, 0, 0, 0)),
      "Date cannot be in the past",
    ),
  time: z.string().min(1, "Time is required"),
  // Thumbnail as a File object (set after cropping)
  thumbnail: z
    .custom<File>((val) => val instanceof File, "Thumbnail is required")
    .refine((file) => file.size <= 5000000, "Max size is 5MB"),
});

export type ScheduleLiveFormValues = z.infer<typeof scheduleLiveSchema>;
