import { Button } from "@/components/ui/button";
import {
  ShieldIcon,
  ShieldOffIcon,
  ShieldCheckIcon,
  Trash2Icon,
} from "lucide-react";
import { User } from "@/lib/types";

interface ActionButtonsProps {
  user: User;
  isUpdating: boolean;
  onAction: (status: "ACTIVE" | "SUSPENDED" | "DELETED") => void;
}

const ActionButtons = ({ user, isUpdating, onAction }: ActionButtonsProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <ShieldIcon className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Actions</h3>
      </div>

      <div className="flex flex-col gap-2">
        {user.status !== "ACTIVE" && (
          <Button
            variant="outline"
            size="sm"
            disabled={isUpdating}
            onClick={() => onAction("ACTIVE")}
            className="w-full justify-start gap-2 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-500"
          >
            <ShieldCheckIcon className="size-4" />
            {isUpdating ? "Updating..." : "Activate User"}
          </Button>
        )}

        {user.status !== "SUSPENDED" && (
          <Button
            variant="outline"
            size="sm"
            disabled={isUpdating}
            onClick={() => onAction("SUSPENDED")}
            className="w-full justify-start gap-2 text-amber-500 border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-500"
          >
            <ShieldOffIcon className="size-4" />
            {isUpdating ? "Updating..." : "Suspend User"}
          </Button>
        )}

        {user.status !== "DELETED" && (
          <Button
            variant="outline"
            size="sm"
            disabled={isUpdating}
            onClick={() => onAction("DELETED")}
            className="w-full justify-start gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2Icon className="size-4" />
            {isUpdating ? "Updating..." : "Delete User"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
