"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import TableLoadingSkelton from "@/components/atoms/loading/TableLoadingSkelton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import { Button } from "@/components/ui/button";
import { ADMIN_ROUTES } from "@/constants/routers/admin/admin-routes.constants";
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from "@/lib/service/adminApi";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  MoreVerticalIcon,
  CheckIcon,
  BadgeCheckIcon,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import Loading from "../common/LoadingPage";

// ─── Filter options ───────────────────────────────────────────────────────────
const ROLE_OPTIONS = ["", "USER", "ADVERTISER"];
const STATUS_OPTIONS = ["", "ACTIVE", "SUSPENDED", "DELETED"];
const VERIFIED_OPTIONS = [
  { label: "All", value: "" },
  { label: "Verified", value: "true" },
  { label: "Unverified", value: "false" },
];

// ─── Design tokens — mirror UserDetails exactly ───────────────────────────────
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

// ─── Shared UI atoms ──────────────────────────────────────────────────────────

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
    <span className="inline-flex items-center gap-1 text-xs text-emerald-500">
      <BadgeCheckIcon className="size-3.5" /> Verified
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <XCircleIcon className="size-3.5" /> No
    </span>
  );
}

function SortIcon({
  field,
  currentSortBy,
  currentOrder,
}: {
  field: string;
  currentSortBy: string;
  currentOrder: string;
}) {
  if (currentSortBy !== field)
    return <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/60" />;
  return currentOrder === "asc" ? (
    <ArrowUpIcon className="size-3.5 text-primary" />
  ) : (
    <ArrowDownIcon className="size-3.5 text-primary" />
  );
}

function ActiveDot() {
  return (
    <span className="ml-1 inline-block size-1.5 rounded-full bg-primary align-middle" />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const UsersTable = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [updateUserStatus, { isLoading: isUpdating }] =
    useUpdateUserStatusMutation();

  const queryArgs = useMemo(
    () => ({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      sortBy: searchParams.get("sortBy") || "createdAt",
      order: searchParams.get("order") || "desc",
      role: searchParams.get("role") || "",
      status: searchParams.get("status") || "",
      search: searchParams.get("search") || "",
      isVerified: searchParams.get("isVerified"),
    }),
    [searchParams],
  );

  const handleAction = async (
    userId: string,
    status: "ACTIVE" | "SUSPENDED" | "DELETED",
    email: string,
  ) => {
    try {
      await updateUserStatus({
        userId,
        status,
        queryArgs,
      }).unwrap();

      toast.success(`User ${email} status updated to ${status}`);
      setOpenMenuId(null);
    } catch {
      toast.error(`Failed to update user ${email} status`);
    }
  };

  const { data, isLoading, isFetching } = useGetUsersQuery(queryArgs);
  const users = data?.data?.users ?? [];

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      val === "" || val === null ? params.delete(key) : params.set(key, val);
    });
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSort = (field: string) => {
    if (queryArgs.sortBy === field) {
      updateParams({
        sortBy: field,
        order: queryArgs.order === "asc" ? "desc" : "asc",
      });
    } else {
      updateParams({ sortBy: field, order: "asc" });
    }
  };

  const handleFilter = (key: string, value: string) =>
    updateParams({ [key]: value });

  // ── Guards ────────────────────────────────────────────────────────────────
  if (isLoading || isFetching) return <TableLoadingSkelton />;
  if (isUpdating) return <Loading message="Updating user status..." />;
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2">
        <XCircleIcon className="size-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">No users found.</p>
      </div>
    );
  }

  // ─── Shared column header button styles ───────────────────────────────────
  const headBtnCls =
    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors";

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        {/* ── Header ── */}
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border">
            {/* Name */}
            <TableHead>
              <button
                onClick={() => handleSort("displayName")}
                className={headBtnCls}
              >
                Name{" "}
                <SortIcon
                  field="displayName"
                  currentSortBy={queryArgs.sortBy}
                  currentOrder={queryArgs.order}
                />
              </button>
            </TableHead>

            {/* Email */}
            <TableHead>
              <button
                onClick={() => handleSort("email")}
                className={headBtnCls}
              >
                Email{" "}
                <SortIcon
                  field="email"
                  currentSortBy={queryArgs.sortBy}
                  currentOrder={queryArgs.order}
                />
              </button>
            </TableHead>

            {/* Status */}
            <TableHead>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={headBtnCls}>
                    Status
                    {queryArgs.status && <ActiveDot />}
                    <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/60" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-40">
                  {STATUS_OPTIONS.map((opt) => (
                    <DropdownMenuItem
                      key={opt || "all-status"}
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleFilter("status", opt)}
                    >
                      {opt ? (
                        <Badge
                          label={opt}
                          styleClass={STATUS_STYLES[opt] ?? ""}
                        />
                      ) : (
                        <span className="text-sm">All</span>
                      )}
                      {queryArgs.status === opt && (
                        <CheckIcon className="size-3.5 text-primary ml-2" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>

            {/* Verified */}
            <TableHead>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={headBtnCls}>
                    Verified
                    {queryArgs.isVerified != null &&
                      queryArgs.isVerified !== "" && <ActiveDot />}
                    <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/60" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-36">
                  {VERIFIED_OPTIONS.map(({ label, value }) => (
                    <DropdownMenuItem
                      key={label}
                      className="flex items-center justify-between cursor-pointer text-sm"
                      onClick={() => handleFilter("isVerified", value)}
                    >
                      {label}
                      {(queryArgs.isVerified ?? "") === value && (
                        <CheckIcon className="size-3.5 text-primary ml-2" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>

            {/* Role */}
            <TableHead>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={headBtnCls}>
                    Role
                    {queryArgs.role && <ActiveDot />}
                    <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/60" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-40">
                  {ROLE_OPTIONS.map((opt) => (
                    <DropdownMenuItem
                      key={opt || "all-roles"}
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleFilter("role", opt)}
                    >
                      {opt ? (
                        <Badge
                          label={opt}
                          styleClass={ROLE_STYLES[opt] ?? ""}
                        />
                      ) : (
                        <span className="text-sm">All</span>
                      )}
                      {queryArgs.role === opt && (
                        <CheckIcon className="size-3.5 text-primary ml-2" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>

            <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* ── Body ── */}
        <TableBody>
          {users.map(
            (user: {
              id: string;
              displayName: string;
              email: string;
              status: string;
              isVerified: boolean;
              role: string;
            }) => (
              <TableRow
                key={user.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                {/* Name */}
                <TableCell>
                  <span className="text-sm font-medium text-foreground">
                    {user.displayName}
                  </span>
                </TableCell>

                {/* Email */}
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                </TableCell>

                {/* Status — colored badge */}
                <TableCell>
                  <Badge
                    label={user.status}
                    styleClass={
                      STATUS_STYLES[user.status] ??
                      "bg-muted text-muted-foreground border border-border"
                    }
                  />
                </TableCell>

                {/* Verified */}
                <TableCell>
                  <VerifiedBadge value={user.isVerified} />
                </TableCell>

                {/* Role — colored badge */}
                <TableCell>
                  <Badge
                    label={user.role}
                    styleClass={
                      ROLE_STYLES[user.role] ??
                      "bg-muted text-muted-foreground border border-border"
                    }
                  />
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <DropdownMenu
                    open={openMenuId === user.id}
                    onOpenChange={(val) => setOpenMenuId(val ? user.id : null)}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-foreground"
                      >
                        <MoreVerticalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="min-w-40">
                      <Link href={`${ADMIN_ROUTES.USERS.ROOT}/${user.id}`}>
                        <DropdownMenuItem className="cursor-pointer text-sm">
                          View Details
                        </DropdownMenuItem>
                      </Link>

                      <DropdownMenuSeparator />

                      {user.status === "DELETED" && (
                        <>
                          <DropdownMenuItem
                            disabled={isUpdating}
                            className="cursor-pointer text-sm text-amber-500 focus:text-amber-500 focus:bg-amber-500/10"
                            onClick={() =>
                              handleAction(user.id, "SUSPENDED", user.email)
                            }
                          >
                            {isUpdating ? "Updating..." : "Suspend"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={isUpdating}
                            className="cursor-pointer text-sm text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10"
                            onClick={() =>
                              handleAction(user.id, "ACTIVE", user.email)
                            }
                          >
                            {isUpdating ? "Updating..." : "Activate"}
                          </DropdownMenuItem>
                        </>
                      )}

                      {user.status === "ACTIVE" && (
                        <>
                          <DropdownMenuItem
                            disabled={isUpdating}
                            className="cursor-pointer text-sm text-amber-500 focus:text-amber-500 focus:bg-amber-500/10"
                            onClick={() =>
                              handleAction(user.id, "SUSPENDED", user.email)
                            }
                          >
                            {isUpdating ? "Updating..." : "Suspend"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={isUpdating}
                            className="cursor-pointer text-sm text-destructive focus:text-destructive focus:bg-destructive/10"
                            onClick={() =>
                              handleAction(user.id, "DELETED", user.email)
                            }
                          >
                            {isUpdating ? "Updating..." : "Delete"}
                          </DropdownMenuItem>
                        </>
                      )}

                      {user.status === "SUSPENDED" && (
                        <>
                          <DropdownMenuItem
                            disabled={isUpdating}
                            className="cursor-pointer text-sm text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10"
                            onClick={() =>
                              handleAction(user.id, "ACTIVE", user.email)
                            }
                          >
                            {isUpdating ? "Updating..." : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={isUpdating}
                            className="cursor-pointer text-sm text-destructive focus:text-destructive focus:bg-destructive/10"
                            onClick={() =>
                              handleAction(user.id, "DELETED", user.email)
                            }
                          >
                            {isUpdating ? "Updating..." : "Delete"}
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
