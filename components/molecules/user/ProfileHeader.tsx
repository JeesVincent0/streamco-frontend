import ProfileCompletionBadge from "@/components/atoms/ProfileCompletionBadge";
import UserAvatar from "@/components/atoms/UserAvatar";
import VerifiedBadge from "@/components/atoms/VerifiedBadge";

const ProfileHeader = ({
  data,
}: {
  data: {
    displayName: string;
    avatarUrl: string;
    isVerified: boolean;
    isProfileCompleted: boolean;
  };
}) => {
  return (
    <section className="rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.05] p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Profile
        </h2>

        {/* Profile Completion Status Badge */}
        <ProfileCompletionBadge isProfileCompleted={data.isProfileCompleted} />
      </div>

      <div className="flex items-center gap-4">
        {/* Avatar with fixed border */}
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
            {/* Verified Badge next to name */}
            <VerifiedBadge value={data.isVerified} />
          </div>

          <button className="w-fit rounded bg-black/5 dark:bg-white/10 px-3 py-1 text-[10px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
            Edit avatar
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
