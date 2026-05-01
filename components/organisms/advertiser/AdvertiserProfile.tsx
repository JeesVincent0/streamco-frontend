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
          displayName: data?.data.displayName || "",
          avatarUrl: data?.data.avatarUrl || "",
          isVerified: data?.data.isVerified || false,
          isProfileCompleted: data?.data.isProfileCompleted || false,
        }}
      />
      {/* 2. Basic Details Section */}
      <ProfileBasicDetailsAdvertiser
        data={{
          displayName: data?.data.displayName || "",
          email: data?.data.email || "",
          companyName: data?.data.companyName || "",
        }}
      />
    </div>
  );
};

export default AdvertiserProfile;
