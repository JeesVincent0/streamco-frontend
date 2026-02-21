import axios from "axios";

export const adminSigninApi = async (data: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("/api/auth/admin/signin", data);
  return response;
};
