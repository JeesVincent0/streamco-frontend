"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import { BadgeCheckIcon, MoreVerticalIcon, XCircleIcon } from "lucide-react";
import { ROLE_STYLES, STATUS_STYLES } from "@/constants/user.constants";
import { ADMIN_ROUTES } from "@/constants/routers/admin/admin-routes.constants";
import { Table, TableRow, TableCell } from "../atoms/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Button } from "@/components/ui/button";

import TableHeaderCustom from "../molecules/table/TableHeaderCustom";
import { TableColumn } from "../molecules/table/types";
import TableBodyCustom from "../molecules/table/TableBodyCustom";

// --- Assuming you have these from your API slice ---
// import { useGetUsersQuery } from "@/lib/service/adminApi";

// --- Local UI Helpers ---
function Badge({ label, styleClass }: { label: string; styleClass?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styleClass || "bg-muted text-muted-foreground"}`}
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

// --- Main Component ---
const TableList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Example API Fetch (Replace with your actual hook)
  // const { data: queryData, isLoading } = useGetUsersQuery(queryArgs);
  // const users = queryData?.data?.users ?? [];

  // Dummy data for example purposes
  const users = [
    {
      id: "1",
      displayName: "Jees Vincent",
      email: "jeesvincent0@gmail.com",
      status: "ACTIVE",
      isVerified: true,
      role: "ADMIN",
    },
  ];
  const isLoading = false;

  const queryArgs = useMemo(() => {
    const args: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      args[key] = value;
    });
    if (!args.sortBy) args.sortBy = "createdAt";
    if (!args.order) args.order = "desc";
    return args;
  }, [searchParams]);

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

  const handleFilter = (key: string, value: string) => {
    updateParams({ [key]: value });
  };

  const tableColumns: TableColumn[] = [
    { name: "Name", field: "displayName", sortable: true },

    { name: "Email", field: "email", sortable: true },

    {
      name: "Status",

      field: "status",

      filterOptions: [
        { label: "All", value: "" },

        {
          label: "ACTIVE",

          value: "ACTIVE",

          styleClass: STATUS_STYLES["ACTIVE"],
        },

        {
          label: "SUSPENDED",

          value: "SUSPENDED",

          styleClass: STATUS_STYLES["SUSPENDED"],
        },

        {
          label: "DELETED",

          value: "DELETED",

          styleClass: STATUS_STYLES["DELETED"],
        },
      ],
    },

    {
      name: "Verified",

      field: "isVerified",

      filterOptions: [
        { label: "All", value: "" },

        { label: "Verified", value: "true" },

        { label: "Unverified", value: "false" },
      ],
    },

    {
      name: "Role",

      field: "role",

      filterOptions: [
        { label: "All", value: "" },

        { label: "USER", value: "USER", styleClass: ROLE_STYLES["USER"] },

        {
          label: "ADVERTISER",

          value: "ADVERTISER",

          styleClass: ROLE_STYLES["ADVERTISER"],
        },
      ],
    },

    { name: "Actions", align: "right" },
  ];

  // --- THE MAGIC: Define how a single row should render ---
  // Using `any` for user here, but you should import your exact UserType from your API types
  const renderUserRow = (user: any) => (
    <TableRow
      key={user.id}
      className="border-b border-border hover:bg-muted/30 transition-colors"
    >
      <TableCell>
        <span className="text-sm font-medium text-foreground">
          {user.displayName}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-sm text-muted-foreground">{user.email}</span>
      </TableCell>
      <TableCell>
        <Badge label={user.status} styleClass={STATUS_STYLES[user.status]} />
      </TableCell>
      <TableCell>
        <VerifiedBadge value={user.isVerified} />
      </TableCell>
      <TableCell>
        <Badge label={user.role} styleClass={ROLE_STYLES[user.role]} />
      </TableCell>

      {/* Actions Cell */}
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
            <DropdownMenuItem className="cursor-pointer text-sm text-destructive focus:text-destructive focus:bg-destructive/10">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeaderCustom
          columns={tableColumns}
          queryArgs={queryArgs}
          onSort={handleSort}
          onFilter={handleFilter}
        />

        {/* Pass the data and the render function to the generic body */}
        <TableBodyCustom
          data={users}
          isLoading={isLoading}
          renderRow={renderUserRow}
          emptyMessage="No users found in the system."
        />
      </Table>
    </div>
  );
};

export default TableList;
