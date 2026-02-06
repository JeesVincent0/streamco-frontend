import { UserSingUp } from "@/features/auth/types/user-signup.type";
import axios from "axios";

export const signupUser = async (data: UserSingUp) => {
  console.log(data);
  const response = await axios.post(
    "http://localhost:3001/api/auth/register",
    data,
  );

  return response.data;
};
