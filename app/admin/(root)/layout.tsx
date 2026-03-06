import { SidebarInset, SidebarProvider } from "@/components/atoms/sidebar";
import AppSideBarAdmin from "@/components/organisms/admin/AppSideBarAdmin";
import NavBar from "@/components/organisms/NavBar";
import { ROLE } from "@/constants/role.enum";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Nav Bar */}
      <NavBar role={ROLE.ADMIN} />

      <div className="pt-20">
        <SidebarProvider className={``}>
          <AppSideBarAdmin
            className={"top-16 h-[calc(100vh-4rem)] bg-background"}
          />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </div>
    </>
  );
};

export default layout;
