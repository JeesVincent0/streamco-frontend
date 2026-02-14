import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";
import { Separator } from "@/components/atoms/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/atoms/sidebar";
import CreateChannelButton from "@/components/molecules/CreateChannelButton";
import NotificationButton from "@/components/molecules/NotificationButton";
import ProfileButton from "@/components/molecules/ProfileButton";
import SearchBar from "@/components/molecules/SearchBar";
import { ToggleTheme } from "@/components/molecules/ToggleTheme";

import Image from "next/image";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="z-50 top-0  bg-background fixed flex justify-between items-center w-full px-10 py-4 border-b">
        <div className="">
          <Image
            className="hidden dark:block"
            src={`/streamco_dark_logo.png`}
            alt="Next.js logo"
            width={120}
            height={40}
            priority
          />
          <Image
            className="dark:hidden"
            src={`/streamco_light_logo.png`}
            alt="Next.js logo"
            width={120}
            height={40}
            priority
          />
        </div>
        <div className=" xl:20 lg:w-150 w-40">
          <SearchBar />
        </div>
        <div className="flex gap-2.5">
          <div>
            <CreateChannelButton />
          </div>
          <div className="flex gap-2.5">
            <ToggleTheme />
            <NotificationButton />
            <ProfileButton />
          </div>
        </div>
      </nav>
      <div className="pt-20">
        <SidebarProvider className={``}>
          <AppSidebar className={'top-16 h-[calc(100vh-4rem)] bg-background'}/>
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Build Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
      {children}
    </div>
  );
};

export default layout;
