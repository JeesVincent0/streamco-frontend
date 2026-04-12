import { z } from "zod";

export enum VISIBILITY {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  UNLISTED = "UNLISTED",
}

export const scheduleLiveSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters"),
  visibility: z.nativeEnum(VISIBILITY, {
    message: "Select a valid visibility",
  }),
  description: z.string().trim().min(20, "Description is too short"),
  categoryId: z.string().trim().min(1, "Category is required"),
  duration: z
    .string()
    .regex(/^([0-9]{1,2}):([0-5][0-9])$/, "Format must be HH:MM"),

  // FIX: Treat date as a string to match HTML input, but validate it as a date
  date: z
    .string()
    .min(1, "A valid date is required")
    .refine((val) => {
      const selectedDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Strip time from today to compare correctly
      return selectedDate >= today;
    }, "Date cannot be in the past"),

  time: z.string().trim().min(1, "Time is required"),
  thumbnail: z
    .custom<File>((val) => val instanceof File, "Thumbnail is required")
    .refine((file) => file.size <= 5000000, "Max size is 5MB"),
});

export type ScheduleLiveFormValues = z.infer<typeof scheduleLiveSchema>;
