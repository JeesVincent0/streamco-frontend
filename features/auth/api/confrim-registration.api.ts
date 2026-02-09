import axios from "axios";

export const confrimRegistrationApi = async (data: { otp: string, id: string }) => {
  const response = await axios.post(
    "http://localhost:3001/api/auth/register/confirm",
    data,
  );

  return response.data;
};
