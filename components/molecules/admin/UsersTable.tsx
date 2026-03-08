import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
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
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";

const UsersTable = () => {
  const tableHeadings = ["Name", "Email", "Status", "isVerified", "Role"];
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "ACTIVE",
      verified: true,
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "SUSPENDED",
      verified: false,
      role: "User",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      status: "DELETED",
      verified: true,
      role: "User",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      status: "ACTIVE",
      verified: true,
      role: "User",
    },
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "ACTIVE",
      verified: true,
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "SUSPENDED",
      verified: false,
      role: "User",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      status: "DELETED",
      verified: true,
      role: "User",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      status: "ACTIVE",
      verified: true,
      role: "User",
    },
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "ACTIVE",
      verified: true,
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "SUSPENDED",
      verified: false,
      role: "User",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      status: "DELETED",
      verified: true,
      role: "User",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      status: "ACTIVE",
      verified: true,
      role: "User",
    },
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "ACTIVE",
      verified: true,
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "SUSPENDED",
      verified: false,
      role: "User",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      status: "DELETED",
      verified: true,
      role: "User",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      status: "ACTIVE",
      verified: true,
      role: "User",
    },
  ];
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
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>{user.verified ? "Yes" : "No"}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreVerticalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href={`${ADMIN_ROUTES.USERS.ROOT}/${user.id}`}>
                    <DropdownMenuItem className="hover:cursor-pointer">
                      View
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  {user.status === "DELETED" && (
                    <>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        variant="destructive"
                      >
                        SUSPEND
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        variant="destructive"
                      >
                        ACTIVATE
                      </DropdownMenuItem>
                    </>
                  )}
                  {user.status === "ACTIVE" && (
                    <>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        variant="destructive"
                      >
                        SUSPEND
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        variant="destructive"
                      >
                        DELETE
                      </DropdownMenuItem>
                    </>
                  )}
                  {user.status === "SUSPENDED" && (
                    <>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        variant="destructive"
                      >
                        ACTIVATE
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        variant="destructive"
                      >
                        DELETE
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
