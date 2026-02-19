import axios from "axios";

export const generateOtpApi = async (data: {
  email: string;
  purpose?: string;
}) => {
  const response = await axios.post(
    "/api/auth/otp/generate",
    data,
  );

  return response.data;
};
