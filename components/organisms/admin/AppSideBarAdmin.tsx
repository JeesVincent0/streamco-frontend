import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/atoms/sidebar";
import LeftSideMenu from "@/components/molecules/admin/LeftSideMenu";
import LeftSideProfile from "@/components/molecules/admin/LeftSideProfile";

const AppSideBarAdmin = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* sidebar trigger section */}
      <div className="flex items-center h-10 gap-2 p-3">
        <SidebarTrigger className="-ml-1" />
      </div>

      {/* left side bar profile section */}
      <LeftSideProfile />

      {/* left side bar menu section */}
      <SidebarHeader>
        <LeftSideMenu />
      </SidebarHeader>
    </Sidebar>
  );
};

export default AppSideBarAdmin;
