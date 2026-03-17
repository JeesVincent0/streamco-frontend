import { SidebarInset, SidebarProvider } from "@/components/atoms/sidebar";
import AppSideBarAdvertiser from "@/components/organisms/advertiser/AppSideBarAdvertiser";
import NavBar from "@/components/organisms/NavBar";
import { ROLE } from "@/constants/role.enum";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar role={ROLE.ADVERTISER} />

      <div className="pt-20">
        <SidebarProvider className={``}>
          <AppSideBarAdvertiser
            className={"top-16 h-[calc(100vh-4rem)] bg-background"}
          />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default layout;
