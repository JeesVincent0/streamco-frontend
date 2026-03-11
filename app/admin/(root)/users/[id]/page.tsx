"use client";

import {
  useGetUserByIdQuery,
  useUpdateUserStatusMutation,
} from "@/lib/service/adminApi";
import {
  ArrowLeftIcon,
  BadgeCheckIcon,
  XCircleIcon,
  ShieldIcon,
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  LinkIcon,
  BuildingIcon,
  ShieldOffIcon,
  ShieldCheckIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { ADMIN_ROUTES } from "@/constants/routers/admin/admin-routes.constants";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import Loading from "@/components/molecules/common/LoadingPage";
import { useParams } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SocialLinks {
  twitter?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
  [key: string]: string | undefined;
}

interface BaseUser {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  role: "USER" | "ADVERTISER" | "ADMIN" | "MODERATOR";
  status: "ACTIVE" | "SUSPENDED" | "DELETED";
  isVerified: boolean;
  isProfileCompleted: boolean;
  createdAt: string;
  avatarUrl?: string;
}

interface ContentUser extends BaseUser {
  role: "USER";
  dob?: string;
  gender?: string;
  bio?: string;
  location?: string;
  socialLinks?: SocialLinks;
  contentType?: string;
}

interface AdvertiserUser extends BaseUser {
  role: "ADVERTISER";
  companyName?: string;
}

type User = ContentUser | AdvertiserUser;

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  SUSPENDED: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
  DELETED: "bg-red-500/10 text-red-500 border border-red-500/20",
};

const ROLE_STYLES: Record<string, string> = {
  ADMIN: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
  MODERATOR: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
  USER: "bg-slate-500/10 text-slate-400 border border-slate-500/20",
  ADVERTISER: "bg-orange-500/10 text-orange-500 border border-orange-500/20",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Primitive UI helpers ─────────────────────────────────────────────────────

function Badge({ label, styleClass }: { label: string; styleClass: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styleClass}`}
    >
      {label}
    </span>
  );
}

function VerifiedBadge({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-flex items-center gap-1 text-sm text-emerald-500">
      <BadgeCheckIcon className="size-4" /> Verified
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
      <XCircleIcon className="size-4" /> Not verified
    </span>
  );
}

function BooleanBadge({ value }: { value: boolean }) {
  return (
    <span
      className={`text-sm font-medium ${value ? "text-emerald-500" : "text-muted-foreground"}`}
    >
      {value ? "Yes" : "No"}
    </span>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
  cols = 2,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  cols?: 2 | 3;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Icon className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${cols === 3 ? "xl:grid-cols-3" : ""} gap-x-8 gap-y-5`}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({
  avatarUrl,
  displayName,
}: {
  avatarUrl?: string;
  displayName: string;
}) {
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
}

// ─── Social Links ─────────────────────────────────────────────────────────────

function SocialLinksDisplay({ links }: { links: SocialLinks }) {
  const entries = Object.entries(links).filter(([, v]) => Boolean(v));
  if (entries.length === 0)
    return <span className="text-muted-foreground text-sm">—</span>;

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-primary hover:bg-muted transition-colors"
        >
          <LinkIcon className="size-3" />
          <span className="capitalize">{platform}</span>
        </a>
      ))}
    </div>
  );
}

// ─── Action Buttons ───────────────────────────────────────────────────────────

function ActionButtons({
  user,
  isUpdating,
  onAction,
}: {
  user: User;
  isUpdating: boolean;
  onAction: (status: "ACTIVE" | "SUSPENDED" | "DELETED") => void;
}) {
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
}

// ─── Role-specific panels ─────────────────────────────────────────────────────

function ContentUserDetails({ user }: { user: ContentUser }) {
  return (
    <>
      <Section title="Personal Info" icon={UserIcon} cols={3}>
        <Field label="Date of Birth">
          {user.dob ? formatDate(user.dob) : "—"}
        </Field>
        <Field label="Gender">{user.gender ?? "—"}</Field>
        <Field label="Location">
          <span className="flex items-center gap-1.5">
            <MapPinIcon className="size-3.5 text-muted-foreground" />
            {user.location ?? "—"}
          </span>
        </Field>
        <Field label="Content Type">
          {user.contentType === "SAFE_MODE" ? "Safe Mode" : "Unrestricted"}
        </Field>
      </Section>

      {user.bio && (
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <UserIcon className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Bio</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {user.bio}
          </p>
        </div>
      )}

      <Section title="Social Links" icon={LinkIcon}>
        <div className="col-span-full">
          <SocialLinksDisplay links={user.socialLinks ?? {}} />
        </div>
      </Section>
    </>
  );
}

function AdvertiserDetails({ user }: { user: AdvertiserUser }) {
  return (
    <Section title="Company Info" icon={BuildingIcon}>
      <Field label="Company Name">{user.companyName ?? "—"}</Field>
    </Section>
  );
}

const UserDetails = () => {
  const userId = useParams().id as string;
  const { data, isLoading, isError } = useGetUserByIdQuery(userId);
  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();

  const user = data;
  console.log("Fetched user details:", user);

  const handleAction = async (status: "ACTIVE" | "SUSPENDED" | "DELETED") => {
    if (!user) return;
    try {
      await updateUserStatus({ userId: user.id, status }).unwrap();
      toast.success(`User status updated to ${status}`);
    } catch {
      toast.error("Failed to update user status");
    }
  };

  if (isLoading) return <Loading message="Fetching user details..." />;

  if (isError || !user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <XCircleIcon className="size-10 text-destructive" />
        <p className="text-muted-foreground text-sm">
          Failed to load user details.
        </p>
        <Link
          href={ADMIN_ROUTES.USERS.ROOT}
          className="text-sm text-primary hover:underline"
        >
          Go back to users
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5 py-6 px-2 sm:px-4 lg:px-6">
      {/* Back link */}
      <Link
        href={ADMIN_ROUTES.USERS.ROOT}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeftIcon className="size-4" />
        Back to Users
      </Link>

      {/* ── Two-column layout on lg+: sidebar left, main content right ── */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* ── LEFT SIDEBAR ── */}
        <div className="w-full lg:w-64 xl:w-72 shrink-0 space-y-4">
          {/* Profile card */}
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center text-center gap-4">
            <Avatar avatarUrl={user.avatarUrl} displayName={user.displayName} />
            <div className="w-full space-y-1 min-w-0">
              <h1 className="text-base font-semibold text-foreground truncate">
                {user.displayName}
              </h1>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge
                label={user.role}
                styleClass={ROLE_STYLES[user.role] ?? ""}
              />
              <Badge
                label={user.status}
                styleClass={STATUS_STYLES[user.status] ?? ""}
              />
            </div>
            <VerifiedBadge value={user.isVerified} />
          </div>

          {/* Actions */}
          <ActionButtons
            user={user}
            isUpdating={isUpdating}
            onAction={handleAction}
          />
        </div>

        {/* ── RIGHT MAIN CONTENT ── */}
        <div className="flex-1 min-w-0 space-y-5">
          <Section title="Account Info" icon={ShieldIcon} cols={3}>
            <Field label="First Name">{user.firstName || "—"}</Field>
            <Field label="Last Name">{user.lastName || "—"}</Field>
            <Field label="Display Name">{user.displayName}</Field>
            <Field label="Email">{user.email}</Field>
            <Field label="Role">
              <Badge
                label={user.role}
                styleClass={ROLE_STYLES[user.role] ?? ""}
              />
            </Field>
            <Field label="Status">
              <Badge
                label={user.status}
                styleClass={STATUS_STYLES[user.status] ?? ""}
              />
            </Field>
            <Field label="Verified">
              <VerifiedBadge value={user.isVerified} />
            </Field>
            <Field label="Profile Completed">
              <BooleanBadge value={user.isProfileCompleted} />
            </Field>
            <Field label="Joined">
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="size-3.5 text-muted-foreground" />
                {formatDate(user.createdAt)}
              </span>
            </Field>
          </Section>

          {user.role === "USER" && (
            <ContentUserDetails user={user as ContentUser} />
          )}
          {user.role === "ADVERTISER" && (
            <AdvertiserDetails user={user as AdvertiserUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
