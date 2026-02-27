import { ROLE } from "@/constants/role.enum";

export interface IConfirmRegistrationResponse {
  status: string;
  message: string;
  data: { role: ROLE };
}
export interface IConfirmRegistrationRequest {
  otp: string;
  id: string;
}
