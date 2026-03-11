export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
  [key: string]: string | undefined;
}

export interface BaseUser {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  role: "USER" | "ADVERTISER" | "ADMIN" | "MODERATOR";
  status: "ACTIVE" | "SUSPENDED" | "DELETED";
  isVerified: boolean;
  isProfileCompleted: boolean;
  createdAt: string;
  avatarUrl?: string;
}

export interface ContentUser extends BaseUser {
  role: "USER";
  dob?: string;
  gender?: string;
  bio?: string;
  location?: string;
  socialLinks?: SocialLinks;
  contentType?: string;
}

export interface AdvertiserUser extends BaseUser {
  role: "ADVERTISER";
  companyName?: string;
}

export type User = ContentUser | AdvertiserUser;