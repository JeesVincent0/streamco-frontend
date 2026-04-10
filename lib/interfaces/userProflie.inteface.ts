import { UserContentType, UserGender } from "@/constants/enums";

export interface UserProfileInterface {
  data: {
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
  };
}
