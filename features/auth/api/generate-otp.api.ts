import axios from "axios";

export const generateOtpApi = async (data: { email: string }) => {
  const response = await axios.post(
    "http://localhost:3001/api/auth/generate-otp",
    data,
  );

  return response.data;
};
