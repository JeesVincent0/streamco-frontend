import { UserSingUp } from "@/features/auth/types/user-signup.type";
import axios from "axios";

export const signupUser = async (
  data: UserSingUp,
): Promise<{
  status: string;
  message: string;
  data?: { id: string; email: string; otpResendAt: string };
}> => {
  const response = await axios.post(
    "/api/auth/signup/user",
    data,
  );

  return response.data;
};
