import axios from "axios";
import { AdvertiserFormData } from "../../types/advertiser-signup.types";

export const signupAdvertiser = async (
  data: AdvertiserFormData,
): Promise<{
  status: string;
  message: string;
  data?: { id: string; email: string };
}> => {
  console.log(data);
  const response = await axios.post(
    "http://localhost:3001/api/auth/advertiser/register",
    data,
  );

  return response.data;
};
