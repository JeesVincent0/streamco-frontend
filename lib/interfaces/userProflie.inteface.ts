import { UserContentType, UserGender } from "@/constants/enums";
import { ROLE } from "@/constants/role.enum";

export interface UserProfileInterface {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  role: ROLE.USER;
  status: string;
  isVerified: boolean;
  isProfileCompleted: boolean;
  createdAt: Date;
  dob: Date | null;
  location: string | null;
  socialLinks: { type: string; url: string }[];
  avatarUrl: string | null;
  contentType: UserContentType;
  gender?: UserGender | null;
  bio?: string | null;
}
