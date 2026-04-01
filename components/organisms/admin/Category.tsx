import CategoriesTable from "@/components/molecules/admin/CategoryTable";
import AdminHeaderTemplate from "@/components/templates/admin/AdminHeaderTemplate";
import { ADMIN_ROUTES } from "@/constants/routers";

const Category = () => {
  return (
    <AdminHeaderTemplate url={ADMIN_ROUTES.CATEGORIES.ROOT} text={`Categories`}>
      <CategoriesTable />
    </AdminHeaderTemplate>
  );
};

export default Category;
