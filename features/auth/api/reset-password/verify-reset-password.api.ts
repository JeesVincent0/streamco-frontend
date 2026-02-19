import axios from "axios";

export const verifyResetPassword = async (data: {
  password: string;
  confirmPassword: string;
}) => {
  const response = await axios.post("/api/auth/reset-password", data, {
    withCredentials: true,
  });
  return response.data;
};
