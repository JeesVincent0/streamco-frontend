import ProfileBasicDetails from "@/components/molecules/user/ProfileBasicDetails";
import ProfileHeader from "@/components/molecules/user/ProfileHeader";
import ProfileSocialLinks from "@/components/molecules/user/ProfileSocialLinks";

const UserProfile = () => {
  return (
    <div className="flex flex-col gap-6 pb-10 w-full lg:w-[75%] transition-colors duration-300">
      {/* 1. Header Profile Section */}
      <ProfileHeader />
      {/* 2. Basic Details Section */}
      <ProfileBasicDetails />

      {/* 3. Social Links Section */}
      <ProfileSocialLinks />
    </div>
  );
};

export default UserProfile;
