import axios from "axios";

export const userSigninApi = async (data: { email: string; password: string }) => {
  const response = await axios.post(
    "/api/auth/signin",
    data,
  );
  return response.data;
};
