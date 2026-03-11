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
import { useGetUsersQuery } from "@/lib/service/adminApi";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  MoreVerticalIcon,
  CheckIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

// ─── Filter options ───────────────────────────────────────────────────────────
const ROLE_OPTIONS = ["", "ADMIN", "USER", "MODERATOR"];
const STATUS_OPTIONS = ["", "ACTIVE", "SUSPENDED", "DELETED"];
const VERIFIED_OPTIONS = [
  { label: "All", value: "" },
  { label: "Verified", value: "true" },
  { label: "Unverified", value: "false" },
];

// ─── Helper: sort icon ────────────────────────────────────────────────────────
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

// ─── Helper: active filter dot ────────────────────────────────────────────────
function ActiveDot() {
  return (
    <span className="ml-1 inline-block size-1.5 rounded-full bg-primary align-middle" />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const UsersTable = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryArgs = useMemo(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      sortBy: searchParams.get("sortBy") || "createdAt",
      order: searchParams.get("order") || "desc",
      role: searchParams.get("role") || "",
      status: searchParams.get("status") || "",
      search: searchParams.get("search") || "",
      isVerified: searchParams.get("isVerified"),
    };
  }, [searchParams]);

  const { data, isLoading, isFetching } = useGetUsersQuery(queryArgs);
  const users = data?.data?.users ?? [];

  // ── URL param helpers ──────────────────────────────────────────────────────
  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === "" || val === null) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    // Reset to page 1 on filter/sort change
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

  const handleFilter = (key: string, value: string) => {
    updateParams({ [key]: value });
  };

  // ─────────────────────────────────────────────────────────────────────────
  if (isLoading || isFetching) return <TableLoadingSkelton />;

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-muted-foreground">No users found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader className="dark:bg-white/12 bg-black/12">
        <TableRow>
          {/* ── Name — sortable ── */}
          <TableHead>
            <button
              onClick={() => handleSort("displayName")}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              Name
              <SortIcon
                field="displayName"
                currentSortBy={queryArgs.sortBy}
                currentOrder={queryArgs.order}
              />
            </button>
          </TableHead>

          {/* ── Email — sortable ── */}
          <TableHead>
            <button
              onClick={() => handleSort("email")}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              Email
              <SortIcon
                field="email"
                currentSortBy={queryArgs.sortBy}
                currentOrder={queryArgs.order}
              />
            </button>
          </TableHead>

          {/* ── Status — filterable ── */}
          <TableHead>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  Status
                  {queryArgs.status && <ActiveDot />}
                  <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-36">
                {STATUS_OPTIONS.map((opt) => (
                  <DropdownMenuItem
                    key={opt || "all-status"}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => handleFilter("status", opt)}
                  >
                    {opt || "All"}
                    {queryArgs.status === opt && (
                      <CheckIcon className="size-3.5 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </TableHead>

          {/* ── isVerified — filterable ── */}
          <TableHead>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  isVerified
                  {queryArgs.isVerified != null &&
                    queryArgs.isVerified !== "" && <ActiveDot />}
                  <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-36">
                {VERIFIED_OPTIONS.map(({ label, value }) => (
                  <DropdownMenuItem
                    key={label}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => handleFilter("isVerified", value)}
                  >
                    {label}
                    {(queryArgs.isVerified ?? "") === value && (
                      <CheckIcon className="size-3.5 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </TableHead>

          {/* ── Role — filterable ── */}
          <TableHead>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  Role
                  {queryArgs.role && <ActiveDot />}
                  <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-36">
                {ROLE_OPTIONS.map((opt) => (
                  <DropdownMenuItem
                    key={opt || "all-roles"}
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => handleFilter("role", opt)}
                  >
                    {opt || "All"}
                    {queryArgs.role === opt && (
                      <CheckIcon className="size-3.5 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </TableHead>

          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="dark:bg-white/5 bg-black/5">
        {users.map(
          (user: {
            id: string;
            displayName: string;
            email: string;
            status: string;
            isVerified: boolean;
            role: string;
          }) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.displayName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.isVerified ? "Yes" : "No"}</TableCell>
              <TableCell>{user.role}</TableCell>

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreVerticalIcon />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <Link href={`${ADMIN_ROUTES.USERS.ROOT}/${user.id}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        View
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator />

                    {user.status === "DELETED" && (
                      <>
                        <DropdownMenuItem variant="destructive">
                          SUSPEND
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          ACTIVATE
                        </DropdownMenuItem>
                      </>
                    )}

                    {user.status === "ACTIVE" && (
                      <>
                        <DropdownMenuItem variant="destructive">
                          SUSPEND
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          DELETE
                        </DropdownMenuItem>
                      </>
                    )}

                    {user.status === "SUSPENDED" && (
                      <>
                        <DropdownMenuItem variant="destructive">
                          ACTIVATE
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          DELETE
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
  );
};

export default UsersTable;
