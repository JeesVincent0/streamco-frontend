import axios from "axios";

export const getOtpTimerApi = async (id: string) => {
  const response = await axios.get(
    `/api/auth/otp-timer/${id}`,
  );
  return response.data;
};
