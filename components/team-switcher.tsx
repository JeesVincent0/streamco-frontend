"use client";

import {} from "@/components/atoms/dropdown-menu";
import { SidebarMenuButton } from "@/components/atoms/sidebar";
import React from "react";

export function TeamSwitcher({
  current = false,
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
  current?: boolean;
}) {
  return (
    <SidebarMenuButton
      size="lg"
      className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ${current ? `bg-[#FF7701] hover:bg-[#d86500e6]` : ``}`}
    >
      <div className="pl-2 text-sidebar-primary-foreground flex aspect-square size-6 items-center justify-center rounded-lg">
        {children}
      </div>
      <div className="font-medium">{text}</div>
    </SidebarMenuButton>
  );
}
