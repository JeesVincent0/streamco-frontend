"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  PlusIcon,
  MoreVerticalIcon,
  EyeIcon,
  ChevronsUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckIcon,
  BanIcon,
  VideoIcon,
  CalendarIcon,
  SearchIcon,
  EditIcon,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TableLoadingSkelton from "@/components/atoms/loading/TableLoadingSkelton";
import { ADMIN_ROUTES } from "@/constants/routers";

// ─── Design Tokens ───────────────────────────────────────────────────────────
const STATUS_OPTIONS = ["", "ACTIVE", "BLOCKED"];

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  BLOCKED: "bg-red-500/10 text-red-500 border border-red-500/20",
};

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

// ─── Main Component ───────────────────────────────────────────────────────────
const CategoriesTable = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Loading state (Connect to your RTK Query hook later)
  const isLoading = false;

  const queryArgs = useMemo(
    () => ({
      sortBy: searchParams.get("sortBy") || "name",
      order: searchParams.get("order") || "asc",
      status: searchParams.get("status") || "",
      search: searchParams.get("search") || "",
    }),
    [searchParams],
  );

  // Mock Data
  const categories = [
    { id: "1", name: "Gaming", status: "ACTIVE", scheduled: 12, lives: 45 },
    {
      id: "2",
      name: "Just Chatting",
      status: "ACTIVE",
      scheduled: 5,
      lives: 128,
    },
    { id: "3", name: "Politics", status: "BLOCKED", scheduled: 0, lives: 0 },
  ];

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      val === "" ? params.delete(key) : params.set(key, val);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSort = (field: string) => {
    updateParams({
      sortBy: field,
      order:
        queryArgs.sortBy === field && queryArgs.order === "asc"
          ? "desc"
          : "asc",
    });
  };

  if (isLoading) return <TableLoadingSkelton />;

  const headBtnCls =
    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors";

  return (
    <div className="mx-auto w-full max-w-287.5 space-y-6 px-4 py-8">
      {/* Top Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
        <Button asChild size="sm" className="h-9 gap-2 px-4">
          <Link href={`${ADMIN_ROUTES.CATEGORIES.CREATE}`}>
            <PlusIcon className="size-4" /> Create Category
          </Link>
        </Button>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-border bg-background shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border">
                {/* Name */}
                <TableHead className="py-4">
                  <button
                    onClick={() => handleSort("name")}
                    className={headBtnCls}
                  >
                    Category Name{" "}
                    <SortIcon
                      field="name"
                      currentSortBy={queryArgs.sortBy}
                      currentOrder={queryArgs.order}
                    />
                  </button>
                </TableHead>

                {/* Status Filter */}
                <TableHead>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className={headBtnCls}>
                        Status {queryArgs.status && <ActiveDot />}
                        <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/60" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-40">
                      {STATUS_OPTIONS.map((opt) => (
                        <DropdownMenuItem
                          key={opt || "all"}
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => updateParams({ status: opt })}
                        >
                          {opt ? (
                            <Badge
                              label={opt}
                              styleClass={STATUS_STYLES[opt]}
                            />
                          ) : (
                            <span className="text-sm font-medium">
                              All Categories
                            </span>
                          )}
                          {queryArgs.status === opt && (
                            <CheckIcon className="size-3.5 text-primary" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>

                {/* Stats */}
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Scheduled
                </TableHead>
                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Live Now
                </TableHead>

                {/* Actions */}
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.map((cat) => (
                <TableRow
                  key={cat.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="py-4 text-sm font-medium text-foreground whitespace-nowrap">
                    {cat.name}
                  </TableCell>

                  <TableCell>
                    <Badge
                      label={cat.status}
                      styleClass={
                        STATUS_STYLES[cat.status] ??
                        "bg-muted text-muted-foreground border border-border"
                      }
                    />
                  </TableCell>

                  <TableCell className="text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <CalendarIcon className="size-3.5" /> {cat.scheduled}
                    </span>
                  </TableCell>

                  <TableCell className="text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-red-500">
                      <VideoIcon className="size-3.5 animate-pulse" />{" "}
                      {cat.lives}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu
                      open={openMenuId === cat.id}
                      onOpenChange={(val) => setOpenMenuId(val ? cat.id : null)}
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
                      <DropdownMenuContent align="end" className="min-w-44">
                        <DropdownMenuItem className="cursor-pointer gap-2">
                          <EyeIcon className="size-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer gap-2">
                          <EditIcon className="size-4" /> Edit Category
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className={
                            cat.status === "ACTIVE"
                              ? "text-destructive focus:text-destructive focus:bg-destructive/10"
                              : "text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10"
                          }
                        >
                          <BanIcon className="size-4 mr-2" />
                          {cat.status === "ACTIVE"
                            ? "Block Category"
                            : "Unblock Category"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesTable;
