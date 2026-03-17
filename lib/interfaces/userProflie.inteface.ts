import { UserContentType, UserGender } from "@/constants/enums";
import { ROLE } from "@/constants/role.enum";

export interface UserProfileInterface {
  id: string;
  displayName: string;
  email: string;
  isVerified: boolean;
  isProfileCompleted: boolean;
  dob?: Date | null;
  location?: string | null;
  socialLinks?: { type: string; url: string }[];
  avatarUrl: string | null;
  contentType?: UserContentType;
  gender?: UserGender | null;
  bio?: string | null;
  companyName?: string;
}
