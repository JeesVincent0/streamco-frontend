"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  PlusIcon,
  MoreVerticalIcon,
  BanIcon,
  VideoIcon,
  CalendarIcon,
  XCircleIcon,
} from "lucide-react";

import { TableRow, TableCell } from "@/components/atoms/table";
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
import ReusableTable from "@/components/molecules/table/ReusableTable";
import { TableColumn } from "@/components/molecules/table/types";
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

// ─── Main Component ───────────────────────────────────────────────────────────
const CategoriesTable = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [updateCategoryStatus, { isLoading: isStatusUpdating }] =
    useUpdateCategoryStatusMutation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
      role: "",
      isVerified: null,
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
  const totalPages = response?.data?.pagination?.totalPages || 0;

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === "" || val === null) {
        params.delete(key);
      } else {
        params.set(key, String(val));
      }
    });

    // Always reset to page 1 when changing filters/sorting
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

  const handleFilter = (key: string, value: string) => {
    updateParams({ [key]: value });
  };

  // 3. Handle Status Toggle logic
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";

    try {
      await updateCategoryStatus({
        id,
        status: newStatus,
        queryArgs,
      }).unwrap();

      toast.success("Status updated successfully");
    } catch (err: unknown) {
      const error = err as { data: { data: { message: string } } };
      toast.error(error?.data?.data?.message);
    }

    setOpenMenuId(null);
  };

  // Loading State
  if (isLoading || isFetching) return <TableLoadingSkelton />;
  if (isStatusUpdating) return <Loading message="Updating..." />;

  const columns: TableColumn[] = [
    {
      name: "Category Name",
      field: "name",
      sortable: true,
    },
    {
      name: "Status",
      field: "status",
      filterOptions: STATUS_OPTIONS.map((opt) => ({
        label: opt || "All Categories",
        value: opt,
        styleClass: STATUS_STYLES[opt] ?? "",
      })),
    },
    {
      name: "Scheduled",
      field: "scheduledLiveCount",
      sortable: true,
      align: "center",
      className: "justify-center",
    },
    {
      name: "Live Now",
      field: "liveCount",
      sortable: true,
      align: "center",
      className: "justify-center",
    },
    {
      name: "Actions",
      align: "right",
    },
  ];

  const renderRow = (cat: CategoriesType) => (
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
          <CalendarIcon className="size-3.5" /> {cat.scheduledLiveCount}
        </span>
      </TableCell>

      <TableCell className="text-center whitespace-nowrap">
        <span className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-red-500 w-full">
          <VideoIcon className="size-3.5 animate-pulse" /> {cat.liveCount}
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
            <DropdownMenuItem
              onClick={() => handleToggleStatus(cat.id, cat.status)}
              className={`cursor-pointer ${
                cat.status === "ACTIVE"
                  ? "text-destructive focus:text-destructive focus:bg-destructive/10"
                  : "text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10"
              }`}
            >
              <BanIcon className="size-4 mr-2" />
              {cat.status === "ACTIVE" ? "Block Category" : "Unblock Category"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="mx-auto w-full max-w-1150 space-y-6 px-4 py-8">
      {/* Top Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
        <Button asChild size="sm" className="h-9 gap-2 px-4">
          <Link href={`${ADMIN_ROUTES.CATEGORIES.CREATE}`}>
            <PlusIcon className="size-4" /> Create Category
          </Link>
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2 border border-border rounded-xl">
          <XCircleIcon className="size-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No categories found.</p>
        </div>
      ) : (
        <ReusableTable
          columns={columns}
          data={categories}
          renderRow={renderRow}
          queryArgs={queryArgs}
          onSort={handleSort}
          onFilter={handleFilter}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default CategoriesTable;
