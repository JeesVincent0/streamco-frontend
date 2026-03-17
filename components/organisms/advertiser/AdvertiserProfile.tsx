"use client";

import ProfileBasicDetailsAdvertiser from "@/components/molecules/advertiser/ProfileBasicDetailsAdvertiser";
import Loading from "@/components/molecules/common/LoadingPage";
import ProfileHeader from "@/components/molecules/user/ProfileHeader";
import { useGetUserProfileQuery } from "@/lib/service/user-api/settingsApi";

const AdvertiserProfile = () => {
  const { data, isLoading } = useGetUserProfileQuery();

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
      <ProfileBasicDetailsAdvertiser
        data={{
          displayName: data?.displayName || "",
          email: data?.email || "",
          companyName: data?.companyName || "",
        }}
      />
    </div>
  );
};

export default AdvertiserProfile;
