import axios from "axios";

export const getOtpTimerApi = async (id: string) => {
  const response = await axios.get(
    `http://localhost:3001/api/auth/otp-timer/${id}`,
  );
  return response.data;
};
