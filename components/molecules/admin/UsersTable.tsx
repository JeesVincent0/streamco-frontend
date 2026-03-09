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
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const UsersTable = () => {
  const tableHeadings = ["Name", "Email", "Status", "isVerified", "Role"];

  const searchParams = useSearchParams();

  const queryArgs = useMemo(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      sortBy: searchParams.get("sortBy") || "displayName",
      order: searchParams.get("order") || "asc",
      role: searchParams.get("role") || "",
      status: searchParams.get("status") || "",
      search: searchParams.get("search") || "",
      isVerified: searchParams.get("isVerified"),
    };
  }, [searchParams]);

  const { data, isLoading, isFetching } = useGetUsersQuery(queryArgs);

  const users = data?.data?.users ?? [];

  if (isLoading || isFetching) {
    return <TableLoadingSkelton />;
  }

  return (
    <Table>
      <TableHeader className="dark:bg-white/12 bg-black/12">
        <TableRow>
          {tableHeadings.map((heading) => (
            <TableHead key={heading}>{heading}</TableHead>
          ))}
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
            verified: boolean;
            role: string;
          }) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.displayName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.verified ? "Yes" : "No"}</TableCell>
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
