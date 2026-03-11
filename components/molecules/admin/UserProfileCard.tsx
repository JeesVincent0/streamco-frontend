import UserAvatar from "@/components/atoms/UserAvatar";
import Badge from "@/components/atoms/Badge";
import VerifiedBadge from "@/components/atoms/VerifiedBadge";
import { User } from "@/lib/types";
import { STATUS_STYLES, ROLE_STYLES } from "@/constants/user.constants";

interface UserProfileCardProps {
  user: User;
}

const UserProfileCard = ({ user }: UserProfileCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center text-center gap-4">
      <UserAvatar avatarUrl={user.avatarUrl} displayName={user.displayName} />

      <div className="w-full space-y-1 min-w-0">
        <h1 className="text-base font-semibold text-foreground truncate">
          {user.displayName}
        </h1>
        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Badge label={user.role} styleClass={ROLE_STYLES[user.role] ?? ""} />
        <Badge
          label={user.status}
          styleClass={STATUS_STYLES[user.status] ?? ""}
        />
      </div>

      <VerifiedBadge value={user.isVerified} />
    </div>
  );
};

export default UserProfileCard;
