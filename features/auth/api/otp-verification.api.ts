import axios from "axios";

export const otpVerificationApi = async (otp: {otp: string}) => {
  console.log(otp);
  const response = await axios.post(
    "http://localhost:3001/api/auth/otp-verification",
    otp,
  );

  return response.data;
};
