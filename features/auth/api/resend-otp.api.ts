import axios from "axios";

export const resendOtpApi = async (data: { id: string }) => {
  const response = await axios.post(
    `http://localhost:3001/api/auth/resend-otp`,
    data,
  );

  return response.data;
};
