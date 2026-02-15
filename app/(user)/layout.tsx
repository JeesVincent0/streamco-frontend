import { AppSidebar } from "@/components/app-sidebar";
import {} from "@/components/atoms/breadcrumb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover";
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
import { Button } from "@/components/ui/button";
import { BanknoteArrowUp, LogIn, SquarePlus } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
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
            <Popover>
              <PopoverTrigger asChild>
                <ProfileButton />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-55 gap-2.5 flex flex-col">
                <Link href={`/signup`} className="flex gap-4 pl-3 text-foreground/70 hover:text-foreground/95  rounded h-8 items-center ">
                  <SquarePlus />
                  Signup
                </Link>
                <Link href={`/login`} className="flex gap-4 pl-3 text-foreground/70 hover:text-foreground/95 rounded h-8 items-center ">
                  <LogIn className="h-5"/>
                  Login
                </Link>
                <div className="border"></div>
                <Link href={`/advertiser/signup`} className="flex gap-4 pl-3 text-foreground/70 hover:text-foreground/95 rounded h-8 items-center ">
                  <BanknoteArrowUp strokeWidth={1.75} className="h-5"/>
                  Post your Ads
                </Link>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
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
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
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
