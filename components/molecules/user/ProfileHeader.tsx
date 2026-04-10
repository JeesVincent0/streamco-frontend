import ProfileCompletionBadge from "@/components/atoms/ProfileCompletionBadge";
import UserAvatar from "@/components/atoms/UserAvatar";
import VerifiedBadge from "@/components/atoms/VerifiedBadge";
import EditAvatarTrigger from "./EditAvatarTrigger"; // Path to your new component

const ProfileHeader = ({
  data,
}: {
  data: {
    displayName: string;
    avatarUrl: string;
    isVerified?: boolean;
    isProfileCompleted?: boolean;
  };
}) => {
  return (
    <section className="rounded-lg border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/5 p-6 transition-all">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Profile
        </h2>
        {data.isProfileCompleted !== undefined && (
          <ProfileCompletionBadge
            isProfileCompleted={data.isProfileCompleted}
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#C35B00]">
          <UserAvatar
            avatarUrl={data.avatarUrl}
            displayName={data.displayName}
            className="h-full w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              {data.displayName}
            </span>
            { data.isVerified !== undefined && (
              <VerifiedBadge value={data.isVerified} />
            )}
          </div>

          {/* Now passing current image and name for the preview */}
          <EditAvatarTrigger
            currentAvatar={data.avatarUrl}
            displayName={data.displayName}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
