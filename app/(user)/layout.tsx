import { AppSidebar } from "@/components/app-sidebar";
import {} from "@/components/atoms/breadcrumb";
import { Separator } from "@/components/atoms/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/atoms/sidebar";
import NavBar from "@/components/organisms/NavBar";
import { Button } from "@/components/ui/button";
import { ROLE } from "@/constants/role.enum";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const categories = [
    { name: "Sports" },
    { name: "Gaming" },
    { name: "IRL" },
    { name: "News" },
    { name: "AI" },
    { name: "New to you" },
    { name: "Tech" },
    { name: "Unboxing" },
    { name: "Politics" },
    { name: "Tech" },
    { name: "Unboxing" },
    { name: "Politics" },
    { name: "IRL" },
  ];
  return (
    <div>
      <NavBar role={ROLE.USER} />
      <div className="pt-20">
        <SidebarProvider className={``}>
          <AppSidebar className={"top-16 h-[calc(100vh-4rem)] bg-background"} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4 ">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Button className="w-10 h-6 rounded dark:text-white text-black">
                  All
                </Button>
                {categories.map((item, index) => (
                  <Button
                    key={index}
                    variant={"outline"}
                    className="h-6 rounded w-auto py-3 font-semibold dark:text-white/80 bg-[#e4e4e4] hover:bg-[#d4d4d4] dark:bg-white/13 dark:hover:bg-white/16 hover:cursor-pointer"
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl animate-pulse" />
                <div className="bg-muted/50 aspect-video rounded-xl animate-pulse" />
                <div className="bg-muted/50 aspect-video rounded-xl animate-pulse" />
              </div>{" "}
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl animate-pulse" />
                <div className="bg-muted/50 aspect-video rounded-xl animate-pulse" />
                <div className="bg-muted/50 aspect-video rounded-xl animate-pulse" />
              </div>{" "}
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl animate-pulse" />
                <div className="bg-muted/50 aspect-video rounded-xl animate-pulse" />
                <div className="bg-muted/50 aspect-video rounded-xl animate-pulse" />
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
      {children}
    </div>
  );
};

export default layout;
