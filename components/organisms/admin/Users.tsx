import UsersTable from "@/components/molecules/admin/UsersTable";
import AdminHeaderTemplate from "@/components/templates/admin/AdminHeaderTemplate";
import { ADMIN_ROUTES } from "@/constants/routers";

const UsersContent = () => {
  return (
    <AdminHeaderTemplate url={ADMIN_ROUTES.USERS.ROOT} text={`Users`}>
      <UsersTable />
    </AdminHeaderTemplate>
  );
};

export default UsersContent;
