"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  EyeIcon,
  XCircleIcon,
  CalendarX2Icon,
  MoreVerticalIcon,
  PlusIcon,
  Calendar,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";

import {
  useGetScheduledLivesQuery,
  useCancelScheduledLiveMutation,
} from "@/lib/service/user-api/liveApi";

import Link from "next/link";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CHANNEL_ROUTES } from "@/constants/routers/channels";
import { TableRow, TableCell } from "@/components/atoms/table";
import { TableColumn } from "@/components/molecules/table/types";
import PopupModal from "@/components/molecules/common/PopupModal";
import ReusableTable from "@/components/molecules/table/ReusableTable";
import TableLoadingSkelton from "@/components/atoms/loading/TableLoadingSkelton";

type ScheduledLiveType = {
  id: string;
  title: string;
  date: string;
  time: string;
  status: string;
};

const ScheduledLivesTable = () => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [cancelLive, { isLoading: isCanceling }] =
    useCancelScheduledLiveMutation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    liveId: string;
    liveTitle: string;
  }>({
    isOpen: false,
    liveId: "",
    liveTitle: "",
  });

  const channelId = useParams().id as string;

  const queryArgs = useMemo(
    () => ({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      sortBy:
        (searchParams.get("sortBy") as "createdAt" | "title" | "date") ||
        "createdAt",
      order: (searchParams.get("order") as "asc" | "desc") || "desc",
      search: searchParams.get("search") || "",
    }),
    [searchParams],
  );

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetScheduledLivesQuery({ channelId, params: queryArgs });

  const scheduledLives: ScheduledLiveType[] =
    response?.data?.scheduledLives || [];

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

  const executeAction = async () => {
    if (!modalState.liveId) return;

    try {
      await cancelLive({
        id: modalState.liveId,
        queryArgs,
      }).unwrap();

      toast.success(
        `Scheduled live "${modalState.liveTitle}" was canceled successfully.`,
      );

      // Close modal and menu
      setModalState((prev) => ({ ...prev, isOpen: false }));
      setOpenMenuId(null);
    } catch (err: unknown) {
      const error = err as { data: { data: { message: string } } };
      toast.error(
        error?.data?.data?.message || "Failed to cancel scheduled live",
      );
    }
  };

  // Loading State
  if (isLoading || isFetching) return <TableLoadingSkelton />;

  const columns: TableColumn[] = [
    {
      name: "Title",
      field: "title",
      sortable: true,
      className: "w-[300px]",
    },
    {
      name: "Date",
      field: "date",
      sortable: true,
    },
    {
      name: "Time",
      field: "time",
      sortable: false,
    },
    {
      name: "Status",
      field: "status",
      sortable: true,
    },
    {
      name: "Actions",
      align: "right",
    },
  ];

  const renderRow = (live: ScheduledLiveType) => (
    <TableRow
      key={live.id}
      className="border-b border-border hover:bg-muted/30 transition-colors"
    >
      <TableCell
        className="py-4 text-sm font-medium text-foreground max-w-75 truncate"
        title={live.title}
      >
        {live.title}
      </TableCell>

      <TableCell className="whitespace-nowrap">{live.date}</TableCell>

      <TableCell className="whitespace-nowrap text-muted-foreground">
        {live.time}
      </TableCell>

      {/* Status Cell */}
      <TableCell>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            live.status === "CANCELED"
              ? "bg-destructive/10 text-destructive"
              : "bg-emerald-500/10 text-emerald-600"
          }`}
        >
          {live.status === "CANCELED" ? "Canceled" : "Active"}
        </span>
      </TableCell>

      <TableCell className="text-right">
        <DropdownMenu
          open={openMenuId === live.id}
          onOpenChange={(val) => setOpenMenuId(val ? live.id : null)}
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
            <DropdownMenuItem asChild>
              <Link
                href={CHANNEL_ROUTES.SCHEDULED_LIVE.VIEW(channelId, live.id)}
                className="cursor-pointer flex items-center"
              >
                <EyeIcon className="size-4 mr-2" />
                View Details
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                setModalState({
                  isOpen: true,
                  liveId: live.id,
                  liveTitle: live.title,
                })
              }
              className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
              disabled={live.status === "CANCELED"}
            >
              <CalendarX2Icon className="size-4 mr-2" />
              Cancel Schedule
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
          <Link href={`${CHANNEL_ROUTES.SCHEDULED_LIVE.CALENDAR(channelId)}`}>
            <Calendar className="size-4" /> Calendar
          </Link>
        </Button>
        <Button asChild size="sm" className="h-9 gap-2 px-4">
          <Link href={`${CHANNEL_ROUTES.SCHEDULED_LIVE.CREATE(channelId)}`}>
            <PlusIcon className="size-4" /> Schedule Live
          </Link>
        </Button>
      </div>
      {scheduledLives.length === 0 ? (
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

      {/* Reusable Confirmation Modal */}
      <PopupModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={executeAction}
        isLoading={isCanceling}
        heading="Cancel Scheduled Live?"
        description={`Are you sure you want to cancel "${modalState.liveTitle}"? This action cannot be undone and attendees will be notified.`}
        confirmButtonText="Yes, Cancel"
      />
    </div>
  );
};

export default ScheduledLivesTable;
