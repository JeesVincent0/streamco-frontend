import axios from "axios";

export const verifyOtpResetPasswordApi = async (data: {
  otp: string;
  id: string;
}) => {
  const response = await axios.post(
    "/api/auth/verify-reset-password",
    data,
  );
  return response.data;
};
