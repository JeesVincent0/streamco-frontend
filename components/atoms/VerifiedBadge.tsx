import { BadgeCheckIcon, XCircleIcon } from "lucide-react";

interface VerifiedBadgeProps {
  value: boolean;
}

const VerifiedBadge = ({ value }: VerifiedBadgeProps) => {
  if (value) {
    return (
      <span className="inline-flex items-center gap-1 text-sm text-emerald-500">
        <BadgeCheckIcon className="size-4" /> Verified
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
      <XCircleIcon className="size-4" /> Not verified
    </span>
  );
};

export default VerifiedBadge;