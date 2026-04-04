"use client";

import { Button } from "@/components/ui/button";
import { ADMIN_ROUTES } from "@/constants/routers/admin/admin-routes.constants";
import {
  CalendarIcon,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
  WalletIcon,
  CircleDollarSignIcon,
  VideoIcon,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetChannelByIdAdminQuery } from "@/lib/service/user-api/channelApi";
import Loading from "../common/LoadingPage";

// ─── Shared UI Atoms ──────────────────────────────────────────────────────────
function Badge({ label, styleClass }: { label: string; styleClass: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styleClass}`}
    >
      {label}
    </span>
  );
}

function LiveStatusBadge({ isLive }: { isLive: boolean }) {
  return isLive ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-500 border border-orange-500/20">
      <VideoIcon className="size-3.5 animate-pulse fill-orange-500/20" />
      Live Now
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground border border-border">
      Offline
    </span>
  );
}

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  BLOCKED: "bg-red-500/10 text-red-500 border border-red-500/20",
};

export default function ChannelDetailsPage() {
  const params = useParams();
  const channelId = params.id as string;

  const [bannerError, setBannerError] = useState(false);
  const [profileError, setProfileError] = useState(false);

  // 2. Added loading states for both images
  const [isBannerLoading, setIsBannerLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  // ─── Fetch Data ─────────────────────────────────────────────────────────────
  const { data, isLoading, error } = useGetChannelByIdAdminQuery(channelId);

  if (isLoading) return <Loading message="Loading channel details..." />;
  if (error || !data?.data) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Channel not found.
      </div>
    );
  }

  const channel = data.data;

  // Formatters
  const joinedDate = new Date(channel.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatCompact = (num: number) =>
    new Intl.NumberFormat("en-US", { notation: "compact" }).format(num);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* ─── Header Actions ─── */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground hover:text-foreground"
        ></Button>
      </div>

      {/* ─── Main Profile Card ─── */}
      <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
        {/* Banner Image */}
        <div className="h-48 md:h-64 w-full bg-muted relative">
          {/* 3. Banner Spinner Overlay */}
          {isBannerLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          )}
          <Image
            src={
              bannerError
                ? "https://placehold.co/1200x400/1f2937/4b5563.png?text=No+Banner"
                : channel.backgroundBannerUrl
            }
            alt={`${channel.channelName} banner`}
            fill
            className="object-cover"
            priority
            onLoad={() => setIsBannerLoading(false)}
            onError={() => {
              setBannerError(true);
              setIsBannerLoading(false);
            }}
          />
        </div>

        {/* Profile Info Section */}
        <div className="px-6 sm:px-8 pb-8 relative">
          {/* Avatar (Overlapping) */}
          <div className="absolute -top-16 sm:-top-20">
            <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-background bg-muted overflow-hidden relative">
              {/* 4. Profile Spinner Overlay */}
              {isProfileLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                  <Loader2 className="size-5 animate-spin text-muted-foreground" />
                </div>
              )}
              <Image
                src={
                  profileError
                    ? "https://placehold.co/400x400/1f2937/4b5563.png?text=No+Avatar"
                    : channel.profileImageUrl
                }
                alt={channel.channelName}
                fill
                className="object-cover"
                onLoad={() => setIsProfileLoading(false)}
                onError={() => {
                  setProfileError(true);
                  setIsProfileLoading(false);
                }}
              />
            </div>
          </div>

          <div className="h-20 sm:h-24" />

          {/* Name, Handle & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mt-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
                {channel.channelName}
                <LiveStatusBadge isLive={channel.isLive} />
              </h1>
              <p className="text-muted-foreground text-base mt-1 font-medium">
                @{channel.channelId}
              </p>

              {/* Quick Audience Stat */}
              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <UsersIcon className="size-4" />
                <strong className="text-foreground">
                  {formatCompact(channel.subscribersCount)}
                </strong>{" "}
                subscribers
              </div>
            </div>

            <div className="flex items-center">
              <Badge
                label={channel.status}
                styleClass={
                  STATUS_STYLES[channel.status] ??
                  "bg-muted text-muted-foreground border border-border"
                }
              />
            </div>
          </div>

          {/* Bio */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-foreground mb-2">
              About Channel
            </h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed max-w-3xl">
              {channel.bio || "No bio provided by the creator."}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Metadata Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Channel Information */}
        <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ShieldCheckIcon className="size-5 text-primary" />
              Channel Details
            </h3>
            {/* View Owner Button */}
            <Button variant="outline" size="sm" asChild>
              <Link
                href={`${ADMIN_ROUTES.USERS?.ROOT || "/admin/users"}/${
                  channel.userId
                }`}
              >
                <UserIcon className="size-4 mr-2" />
                View Owner Details
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">
                Public Handle
              </span>
              <span className="text-sm font-medium">@{channel.channelId}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">
                Total Subscribers
              </span>
              <span className="text-sm font-medium">
                {channel.subscribersCount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Created On</span>
              <span className="text-sm font-medium flex items-center gap-2">
                <CalendarIcon className="size-4 text-muted-foreground" />
                {joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="rounded-xl border border-border bg-background p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <WalletIcon className="size-5 text-emerald-500" />
            Financial Overview
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <CircleDollarSignIcon className="size-4" />
                Total Ad Earnings
              </span>
              <span className="text-sm font-bold text-foreground">
                {formatCurrency(
                  channel.totalEarnings ? channel.totalEarnings : "0",
                )}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <WalletIcon className="size-4" />
                Current Wallet Balance
              </span>
              <span className="text-lg font-bold text-emerald-500">
                {formatCurrency(channel.walletBalance ? channel.walletBalance: "0")}
              </span>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">
                * Earnings represent total historical revenue generated from
                platform advertisers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
