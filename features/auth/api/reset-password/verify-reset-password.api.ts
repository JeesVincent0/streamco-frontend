import axios from "axios";

export const verifyResetPassword = async (data: {
  password: string;
  confirmPassword: string;
  id?: string | null;
}) => {
  const response = await axios.post(
    "http://localhost:3001/api/auth/reset-password",
    data,
  );
  return response.data;
};
