import { Sidebar, SidebarHeader } from "@/components/atoms/sidebar";
import LeftSideMenu from "@/components/molecules/admin/LeftSideMenu";
import LeftSideProfile from "@/components/molecules/admin/LeftSideProfile";

const AppSideBar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* left side bar profile section */}
      <LeftSideProfile />

      {/* left side bar menu section */}
      <SidebarHeader>
        <LeftSideMenu />
      </SidebarHeader>
    </Sidebar>
  );
};

export default AppSideBar;
