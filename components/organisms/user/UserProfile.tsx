"use client";

import Loading from "@/components/molecules/common/LoadingPage";
import ProfileBasicDetails from "@/components/molecules/user/ProfileBasicDetails";
import ProfileHeader from "@/components/molecules/user/ProfileHeader";
import ProfileSocialLinks from "@/components/molecules/user/ProfileSocialLinks";
import { useGetUserProfileQuery } from "@/lib/service/user-api/settingsApi";

const UserProfile = () => {
  const { data, isLoading, error } = useGetUserProfileQuery();
  console.log("fetched user profile data:", data);

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col gap-6 pb-10 w-full lg:w-[75%] transition-colors duration-300">
      {/* 1. Header Profile Section */}
      <ProfileHeader
        data={{
          displayName: data?.displayName || "",
          avatarUrl: data?.avatarUrl || "",
          isVerified: data?.isVerified || false,
          isProfileCompleted: data?.isProfileCompleted || false,
        }}
      />
      {/* 2. Basic Details Section */}
      <ProfileBasicDetails
        data={{
          displayName: data?.displayName || "",
          bio: data?.bio || "",
          dob: data?.dob,
          gender: data?.gender || "",
          email: data?.email || "",
        }}
      />

      {/* 3. Social Links Section */}
      <ProfileSocialLinks />
    </div>
  );
};

export default UserProfile;
