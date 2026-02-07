import axios from "axios";

export const otpVerificationApi = async (data: { otp: string, id: string }) => {
  const response = await axios.post(
    "http://localhost:3001/api/auth/otp-verification",
    data,
  );

  return response.data;
};
