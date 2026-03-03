"use client";

import * as React from "react";
import { Film, House } from "lucide-react";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarHeader,
  SidebarRail,
} from "@/components/atoms/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="gap-2.5 flex flex-col w-[90%] mx-auto mt-5 h-20">
          <TeamSwitcher current={true} text={"Home"}>
            <House className="text-black dark:text-white" />
          </TeamSwitcher>
          <TeamSwitcher text={"Feed"}>
            <Film className="text-black dark:text-white" />
          </TeamSwitcher>
        </div>
      </SidebarHeader>

      <SidebarRail />
    </Sidebar>
  );
}
