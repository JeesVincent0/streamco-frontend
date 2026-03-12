import Image from "next/image";

interface UserAvatarProps {
  avatarUrl?: string;
  displayName: string;
  className?: string; // Add className prop for custom sizing
}

const UserAvatar = ({ avatarUrl, displayName, className }: UserAvatarProps) => {
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClass = className || "size-24";

  if (avatarUrl) {
    return (
      <div className={`relative overflow-hidden rounded-full ${sizeClass}`}>
        <Image
          src={avatarUrl}
          alt={displayName}
          fill // Uses absolute positioning to fill the parent container
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-primary/10 flex items-center justify-center shrink-0`}
    >
      <span className="text-xl font-semibold text-[#C35B00]">{initials}</span>
    </div>
  );
};

export default UserAvatar;
