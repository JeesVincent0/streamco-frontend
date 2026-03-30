import { z } from "zod";

export const emailVerificationSchema = z.object({
  email: z.string().trim().email("Enter valid email"),
});
