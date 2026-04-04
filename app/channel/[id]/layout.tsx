import {} from "@/components/atoms/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/atoms/sidebar";
import NavBar from "@/components/organisms/NavBar";
import SideBar from "@/components/organisms/AppSideBar";
import { ROLE } from "@/constants/role.enum";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar role={ROLE.USER} />
      <div className="pt-20">
        <SidebarProvider className={``}>
          <SideBar className={"top-16 h-[calc(100vh-4rem)] bg-background"} />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default layout;
