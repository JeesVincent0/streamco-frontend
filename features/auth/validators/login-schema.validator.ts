import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter valid email"),
  password: z.string().min(8, "enter min 8 charecter"),
});
