"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { EyeIcon, XCircleIcon } from "lucide-react";
import { ADVERTISER_ROUTES } from "@/constants/routers";
import { TableRow, TableCell } from "@/components/atoms/table";
import { TableColumn } from "@/components/molecules/table/types";
import ReusableTable from "@/components/molecules/table/ReusableTable";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useGetScheduledLviesQuery } from "@/lib/service/advertisre-api";

// ─── Types ────────────────────────────────────────────────────────────────
type ScheduledLiveType = {
  id: string;
  title: string;
  category: string;
  scheduledAt: string;
  channelName: string;
};

type MappedScheduledLiveType = ScheduledLiveType & {
  date: string;
  time: string;
};

const ScheduledLivesTable = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ─── Query Args synced with searchParams ────────────────────────────────────
  const queryArgs = useMemo(
    () => ({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      sortBy: searchParams.get("sortBy") || "scheduledAt",
      order: searchParams.get("order") || "desc",
      search: searchParams.get("search") || "",
    }),
    [searchParams],
  );

  const { data: response, isLoading } = useGetScheduledLviesQuery({
    params: queryArgs,
  });

  // Extract data properly
  const responseData = response?.data;
  const scheduledLivesData = responseData?.scheduledLives;

  // ─── Formatting ─────────────────────────────────────────────────────────────
  const scheduledLives: MappedScheduledLiveType[] = useMemo(() => {
    if (!scheduledLivesData || !Array.isArray(scheduledLivesData)) return [];

    return scheduledLivesData.map((live: ScheduledLiveType) => {
      const dateObj = new Date(live.scheduledAt);

      const localDate = dateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const localTime = dateObj.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        ...live,
        date: localDate,
        time: localTime,
      };
    });
  }, [scheduledLivesData]);

  const totalPages = responseData?.pagination?.totalPages || 0;

  // ─── URL Param Handlers ───────────────────────────────────────────────────
  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === "" || val === null) {
        params.delete(key);
      } else {
        params.set(key, String(val));
      }
    });

    if (updates.sortBy || updates.order) {
      params.set("page", "1");
    }

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

  // ─── Columns Configuration ────────────────────────────────────────────────
  const columns: TableColumn[] = [
    {
      name: "Title",
      field: "title",
      sortable: true,
      className: "w-[250px]",
    },
    {
      name: "Category",
      field: "category",
      sortable: true,
    },
    {
      name: "Date",
      field: "scheduledAt",
      sortable: true,
    },
    {
      name: "Time",
      field: "time",
      sortable: false,
    },
    {
      name: "Channel Name",
      field: "channelName",
      sortable: true,
    },
    {
      name: "Action",
      align: "right",
    },
  ];

  // ─── Row Render ───────────────────────────────────────────────────────────
  const renderRow = (live: MappedScheduledLiveType) => (
    <TableRow
      key={live.id}
      className="border-b border-border hover:bg-muted/30 transition-colors"
    >
      <TableCell
        className="py-4 text-sm font-medium text-foreground max-w-64 truncate"
        title={live.title}
      >
        {live.title}
      </TableCell>

      <TableCell className="whitespace-nowrap">{live.category}</TableCell>
      <TableCell className="whitespace-nowrap">{live.date}</TableCell>

      <TableCell className="whitespace-nowrap text-muted-foreground">
        {live.time}
      </TableCell>

      <TableCell className="whitespace-nowrap">{live.channelName}</TableCell>

      <TableCell className="text-right">
        <Button asChild size="sm" className="gap-2 px-4">
          <Link href={ADVERTISER_ROUTES.HOME.SCHEDULED_LIVE.ACTION(live.id)}>
            <EyeIcon className="size-4" />
            View
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="mx-auto w-full max-w-300 space-y-6 px-4 py-8">
      {isLoading ? (
        <p className="text-center text-muted-foreground py-16">
          Loading schedules...
        </p>
      ) : scheduledLives.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2 border border-border rounded-xl">
          <XCircleIcon className="size-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            No scheduled lives found.
          </p>
        </div>
      ) : (
        <ReusableTable
          columns={columns}
          data={scheduledLives}
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

export default ScheduledLivesTable;
