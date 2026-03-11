import Image from "next/image";

interface UserAvatarProps {
  avatarUrl?: string;
  displayName: string;
}

const UserAvatar = ({ avatarUrl, displayName }: UserAvatarProps) => {
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt={displayName}
        width={96}
        height={96}
        className="size-24 rounded-full object-cover ring-2 ring-border"
      />
    );
  }

  return (
    <div className="size-24 rounded-full bg-primary/10 ring-2 ring-border flex items-center justify-center shrink-0">
      <span className="text-2xl font-semibold text-primary">{initials}</span>
    </div>
  );
};

export default UserAvatar;