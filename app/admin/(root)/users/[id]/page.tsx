"use client";

import { XCircleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  useGetUserByIdQuery,
  useUpdateUserStatusMutation,
} from "@/lib/service/adminApi";
import Loading from "@/components/molecules/common/LoadingPage";

// ── Molecules ──────────────────────────────────────────────────────────────────
import UserProfileCard from "@/components/molecules/admin/UserProfileCard";
import ActionButtons from "@/components/molecules/admin/ActionButtons";

// ── Organisms ─────────────────────────────────────────────────────────────────
import AccountInfoSection from "@/components/organisms/admin/AccountInforSection";
import ContentUserSection from "@/components/organisms/admin/ContentUserSection";
import AdvertiserSection from "@/components/organisms/admin/AdvertiserSection";

// ── Types ─────────────────────────────────────────────────────────────────────
import { AdvertiserUser, ContentUser } from "@/lib/types";
import DetailedPageTemplate from "@/components/templates/admin/DetailedPageTemplate";

// ─────────────────────────────────────────────────────────────────────────────

const UserDetails = () => {
  const userId = useParams().id as string;
  const router = useRouter();

  const { data: response, isLoading, isError } = useGetUserByIdQuery(userId);
  console.log("this is admin user view data: ", response);
  const user = response?.data;

  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();

  const handleAction = async (status: "ACTIVE" | "SUSPENDED" | "DELETED") => {
    if (!user) return;
    try {
      await updateUserStatus({ userId: user.id, status }).unwrap();
      toast.success(`User status updated to ${status}`);
    } catch {
      toast.error("Failed to update user status");
    }
  };

  // ── Guards ──────────────────────────────────────────────────────────────────
  if (isLoading) return <Loading message="Fetching user details..." />;

  if (isError || !response?.data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <XCircleIcon className="size-10 text-destructive" />
        <p className="text-muted-foreground text-sm">
          Failed to load user details.
        </p>
        <button
          onClick={() => router.back()}
          className="text-sm text-primary hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <DetailedPageTemplate>
      {/* Two-column layout: sidebar | main */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* ── LEFT SIDEBAR ── */}
        <div className="w-full lg:w-64 xl:w-72 shrink-0 space-y-4">
          <UserProfileCard user={user} />
          <ActionButtons
            user={user}
            isUpdating={isUpdating}
            onAction={handleAction}
          />
        </div>

        {/* ── RIGHT MAIN CONTENT ── */}
        <div className="flex-1 min-w-0 space-y-5">
          <AccountInfoSection user={user} />

          {user.role === "USER" && (
            <ContentUserSection user={user as ContentUser} />
          )}

          {user.role === "ADVERTISER" && (
            <AdvertiserSection user={user as AdvertiserUser} />
          )}
        </div>
      </div>
    </DetailedPageTemplate>
  );
};

export default UserDetails;
