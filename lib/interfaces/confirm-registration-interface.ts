import { ROLE } from "@/constants/role.enum";

export interface IConfirmRegistrationResponse {
  status: string;
  message: string;
  data: {
    user: { id: string; displayName: string; email: string; avatarUrl: string };
    role: ROLE;
  };
}
export interface IConfirmRegistrationRequest {
  otp: string;
  id: string;
}
