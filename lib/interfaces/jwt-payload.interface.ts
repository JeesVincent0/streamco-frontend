import { ROLE } from "@/constants/role.enum";

export interface IJwtPayload {
  sub: string;
  iss: string;
  aud: string;
  jti: string;
  iat: number;
  scope: string;
  role: ROLE;
  exp: number;
}
