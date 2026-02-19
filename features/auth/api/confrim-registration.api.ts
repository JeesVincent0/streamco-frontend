import axios from "axios";

export const confrimRegistrationApi = async (data: { otp: string, id: string }) => {
  const response = await axios.post(
    "/api/auth/signup/confirm",
    data,
  );

  return response.data;
};
