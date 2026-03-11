import UsersTable from "@/components/molecules/admin/UsersTable";
import PaginationMolecule from "@/components/molecules/common/PaginationMolecule";
import { ADMIN_ROUTES } from "@/constants/routers";
import Link from "next/link";

const UsersContent = () => {
  return (
    <div>
      <header className="font-bold text-2xl px-10 py-4">
        <Link href={ADMIN_ROUTES.USERS.ROOT}>Users</Link>
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
