import { ROLE } from "@/constants/role.enum";

export interface BaseUser {
  status: string;
  message: string;
  data: {
    user: {
      id: string;
      displayName: string;
      email: string;
      avatarUrl: string;
    };
    role: ROLE;
  };
}
