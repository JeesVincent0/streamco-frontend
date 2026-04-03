"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import TableLoadingSkelton from "@/components/atoms/loading/TableLoadingSkelton";
import { TableRow, TableCell } from "@/components/atoms/table";
import { Button } from "@/components/ui/button";
import { ADMIN_ROUTES } from "@/constants/routers/admin/admin-routes.constants";
import {
  useGetAllChannelsQuery,
  useUpdateChannelStatusMutation,
} from "@/lib/service/user-api/channelApi";
import { MoreVerticalIcon, VideoIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import Loading from "../common/LoadingPage";
import ReusableTable from "../table/ReusableTable";
import { TableColumn } from "../table/types";

// ─── Filter options ───────────────────────────────────────────────────────────
const STATUS_OPTIONS = ["", "ACTIVE", "BLOCKED"];
const LIVE_OPTIONS = [
  { label: "All", value: "" },
  { label: "Live Now", value: "true" },
  { label: "Offline", value: "false" },
];

// ─── Design tokens ────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  BLOCKED: "bg-red-500/10 text-red-500 border border-red-500/20",
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

function LiveStatusBadge({ isLive }: { isLive: boolean }) {
  return isLive ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-500">
      <VideoIcon className="size-4 animate-pulse fill-orange-500/20" />
      Live
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      Offline
    </span>
  );
}

// ─── Channel Type ─────────────────────────────────────────────────────────────
type ChannelData = {
  id: string;
  channelName: string;
  channelId: string;
  subscribersCount: number;
  isLive: boolean;
  status: "ACTIVE" | "BLOCKED";
};

// ─── Main component ───────────────────────────────────────────────────────────
const ChannelsTable = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [updateChannelStatus, { isLoading: isUpdating }] =
    useUpdateChannelStatusMutation();

  const queryArgs = useMemo(
    () => ({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      sortBy: searchParams.get("sortBy") || "createdAt",
      order: searchParams.get("order") || "desc",
      status: searchParams.get("status") || "",
      search: searchParams.get("search") || "",
      isLive: searchParams.get("isLive"),
    }),
    [searchParams],
  );

  const handleAction = async (
    channelId: string,
    status: "ACTIVE" | "BLOCKED",
    channelName: string,
  ) => {
    try {
      await updateChannelStatus({
        channelId,
        status,
        queryArgs,
      }).unwrap();

      toast.success(`Channel ${channelName} status updated to ${status}`);
    } catch {
      toast.error(`Failed to update status for ${channelName}`);
    }
  };

  const { data, isLoading, isFetching } = useGetAllChannelsQuery(queryArgs);
  const channels: ChannelData[] = data?.data?.channels ?? [];
  console.log(channels);
  const { totalPages } = data?.data?.pagination ?? { totalPages: 0 };

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === "" || val === null) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
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
  if (isUpdating) return <Loading message="Updating channel status..." />;
  if (channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-2">
        <XCircleIcon className="size-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">No channels found.</p>
      </div>
    );
  }

  // ─── Columns Configuration ────────────────────────────────────────────────
  const columns: TableColumn[] = [
    {
      name: "Channel Name",
      field: "channelName",
      sortable: true,
    },
    {
      name: "Channel ID",
      field: "channelId",
      sortable: true,
    },
    {
      name: "Subscribers",
      field: "subscribers",
      sortable: true,
    },
    {
      name: "Live Status",
      field: "isLive",
      filterOptions: LIVE_OPTIONS.map((opt) => ({
        label: opt.label,
        value: opt.value,
      })),
    },
    {
      name: "Status",
      field: "status",
      filterOptions: STATUS_OPTIONS.map((opt) => ({
        label: opt || "All",
        value: opt,
        styleClass: STATUS_STYLES[opt] ?? "",
      })),
    },
    {
      name: "Actions",
      align: "right",
      className: "w-[100px]",
    },
  ];

  const renderRow = (channel: ChannelData) => (
    <TableRow
      key={channel.id}
      className="border-b border-border hover:bg-muted/30 transition-colors"
    >
      {/* Channel Name */}
      <TableCell>
        <span className="text-sm font-medium text-foreground">
          {channel.channelName}
        </span>
      </TableCell>

      {/* Channel ID */}
      <TableCell>
        <span className="text-sm text-muted-foreground">
          @{channel.channelId}
        </span>
      </TableCell>

      {/* Subscribers */}
      <TableCell>
        <span className="text-sm text-foreground">
          {new Intl.NumberFormat("en-US", { notation: "compact" }).format(
            channel.subscribersCount,
          )}
        </span>
      </TableCell>

      {/* Live Status */}
      <TableCell>
        <LiveStatusBadge isLive={channel.isLive} />
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge
          label={channel.status}
          styleClass={
            STATUS_STYLES[channel.status] ??
            "bg-muted text-muted-foreground border border-border"
          }
        />
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        {/* ✅ FIX: Removed manual open/onOpenChange props here */}
        <DropdownMenu>
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
            <DropdownMenuItem asChild className="cursor-pointer text-sm">
              <Link href={`${ADMIN_ROUTES.CHANNELS.BYID(channel.channelId)}`}>
                View Channel
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Block / Unblock Actions */}
            {channel.status === "ACTIVE" ? (
              <DropdownMenuItem
                disabled={isUpdating}
                className="cursor-pointer text-sm text-destructive focus:text-destructive focus:bg-destructive/10"
                onClick={() =>
                  handleAction(channel.id, "BLOCKED", channel.channelName)
                }
              >
                {isUpdating ? "Updating..." : "Block Channel"}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                disabled={isUpdating}
                className="cursor-pointer text-sm text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10"
                onClick={() =>
                  handleAction(channel.id, "ACTIVE", channel.channelName)
                }
              >
                {isUpdating ? "Updating..." : "Unblock Channel"}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );

  return (
    <ReusableTable
      columns={columns}
      data={channels}
      renderRow={renderRow}
      queryArgs={queryArgs}
      onSort={handleSort}
      onFilter={handleFilter}
      totalPages={totalPages}
    />
  );
};

export default ChannelsTable;
