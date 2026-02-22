import axios from "axios";

export const resendOtpApi = async (data: { id: string; }) => {
  const response = await axios.post(
    `/api/auth/otp/resend`,
    data,
  );

  return response.data;
};
