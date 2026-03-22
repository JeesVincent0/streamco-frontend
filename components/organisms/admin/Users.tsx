import { SidebarTrigger } from "@/components/atoms/sidebar";
import UsersTable from "@/components/molecules/admin/UsersTable";
import PaginationMolecule from "@/components/molecules/table/PaginationMolecule";
import { ADMIN_ROUTES } from "@/constants/routers";
import Link from "next/link";

const UsersContent = () => {
  return (
    <div>
      <header className="sticky top-17 z-10 flex h-16 w-full items-center border-b bg-background/95 px-4 backdrop-blur md:px-10">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-1" />
          <div className="h-6 w-px bg-border mx-2" />{" "}
          {/* Small visual separator */}
          <nav className="text-xl font-semibold tracking-tight">
            <Link href={ADMIN_ROUTES.USERS.ROOT}>Users</Link>
          </nav>
        </div>
      </header>
      <main className="px-10 pt-5 pb-10">
        <UsersTable />
        <footer className="flex justify-end mt-3">
          <PaginationMolecule
            startingUrl={ADMIN_ROUTES.USERS.ROOT}
            limit={10}
          />
        </footer>
      </main>
    </div>
  );
};

export default UsersContent;
