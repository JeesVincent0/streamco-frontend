"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  PlusIcon,
  MoreVerticalIcon,
  ChevronsUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckIcon,
  BanIcon,
  VideoIcon,
  CalendarIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
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
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Button } from "@/components/ui/button";
import TableLoadingSkelton from "@/components/atoms/loading/TableLoadingSkelton";
import { ADMIN_ROUTES } from "@/constants/routers";
import {
  useGetCategoriesQuery,
  useUpdateCategoryStatusMutation,
} from "@/lib/service";
import Loading from "@/components/molecules/common/LoadingPage";
import { toast } from "sonner";

// ─── Types matching your Backend ──────────────────────────────────────────────
type CategoriesType = {
  id: string;
  name: string;
  status: string;
  scheduledLiveCount: number;
  liveCount: number;
};

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
  const [updateCategoryStatus, { isLoading: isStatusUpdating }] =
    useUpdateCategoryStatusMutation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Build Query Params matching GetCategoriesDto
  // 1. Build Query Params matching GetCategoriesDto
  const queryArgs = useMemo(
    () => ({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      sortBy:
        (searchParams.get("sortBy") as
          | "name"
          | "slug"
          | "liveCount"
          | "scheduledLiveCount") || "name",
      order: (searchParams.get("order") as "asc" | "desc") || "asc",
      status: searchParams.get("status") || "",

      search: searchParams.get("search") || "",
    }),
    [searchParams],
  );

  // 2. Fetch Data using RTK Query
  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetCategoriesQuery(queryArgs);

  // Extract data array safely
  const categories: CategoriesType[] = response?.data?.categories || [];

  // Extract pagination data safely
  const currentPage = response?.data?.pagination?.page || queryArgs.page;
  const totalPages = response?.data?.pagination?.totalPages || 1;

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      val === "" ? params.delete(key) : params.set(key, val);
    });

    // Always reset to page 1 when changing filters/sorting (but NOT when just changing the page)
    if (updates.sortBy || updates.status || updates.order) {
      params.set("page", "1");
    }

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

  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage.toString() });
  };

  // 3. Handle Status Toggle logic
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    try {
      await updateCategoryStatus({ id, status: newStatus });
    } catch (error) {
      toast.error(error.data.data.message || "Something went wrong");
    }

    setOpenMenuId(null);
  };

  // Loading State
  if (isLoading || isFetching) return <TableLoadingSkelton />;

  const headBtnCls =
    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors w-full";

  if (isStatusUpdating) return <Loading message="Updating..." />;
  return (
    <div className="mx-auto w-full `max-w-287.5space-y-6 px-4 py-8">
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

                {/* Scheduled Stats */}
                <TableHead>
                  <button
                    onClick={() => handleSort("scheduledLiveCount")}
                    className={`${headBtnCls} justify-center`}
                  >
                    Scheduled{" "}
                    <SortIcon
                      field="scheduledLiveCount"
                      currentSortBy={queryArgs.sortBy}
                      currentOrder={queryArgs.order}
                    />
                  </button>
                </TableHead>

                {/* Live Stats */}
                <TableHead>
                  <button
                    onClick={() => handleSort("liveCount")}
                    className={`${headBtnCls} justify-center`}
                  >
                    Live Now{" "}
                    <SortIcon
                      field="liveCount"
                      currentSortBy={queryArgs.sortBy}
                      currentOrder={queryArgs.order}
                    />
                  </button>
                </TableHead>

                {/* Actions */}
                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <XCircleIcon className="size-8 text-muted-foreground/40" />
                      <p>No categories found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((cat) => (
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
                      <span className="inline-flex items-center justify-center gap-1 text-sm text-muted-foreground w-full">
                        <CalendarIcon className="size-3.5" />{" "}
                        {cat.scheduledLiveCount}
                      </span>
                    </TableCell>

                    <TableCell className="text-center whitespace-nowrap">
                      <span className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-red-500 w-full">
                        <VideoIcon className="size-3.5 animate-pulse" />{" "}
                        {cat.liveCount}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu
                        open={openMenuId === cat.id}
                        onOpenChange={(val) =>
                          setOpenMenuId(val ? cat.id : null)
                        }
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
                          <DropdownMenuItem
                            onClick={() =>
                              handleToggleStatus(cat.id, cat.status)
                            }
                            className={`cursor-pointer ${
                              cat.status === "ACTIVE"
                                ? "text-destructive focus:text-destructive focus:bg-destructive/10"
                                : "text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10"
                            }`}
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
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* ─── Pagination Controls ─── */}
        {totalPages > 0 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing page{" "}
                  <span className="font-medium text-foreground">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {totalPages}
                  </span>
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <Button
                    variant="outline"
                    className="rounded-l-md rounded-r-none px-2 focus:z-20"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-l-none rounded-r-md px-2 focus:z-20"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesTable;
