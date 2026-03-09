"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/atoms/sidebar";
import { ADMIN_ROUTES } from "@/constants/routers";
import {
  BanknoteArrowUp,
  Landmark,
  LayoutDashboard,
  TableOfContents,
  Tv,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSideMenu = () => {
  const pathName = usePathname();
  const sideButtonRootClass = "text-black dark:text-white";
  const sideButtons = [
    {
      name: "Dashboard",
      path: ADMIN_ROUTES.DASHBOARD.ROOT,
      icon: <LayoutDashboard className={sideButtonRootClass} />,
    },
    {
      name: "Users",
      path: ADMIN_ROUTES.USERS.QUERY(),
      icon: <Users className={sideButtonRootClass} />,
    },
    {
      name: "Advertisers",
      path: ADMIN_ROUTES.ADVERTISERS.ROOT,
      icon: <BanknoteArrowUp className={sideButtonRootClass} />,
    },
    {
      name: "Channels",
      path: ADMIN_ROUTES.CHANNELS.ROOT,
      icon: <Tv className={sideButtonRootClass} />,
    },
    {
      name: "Categories",
      path: ADMIN_ROUTES.CATEGORIES.ROOT,
      icon: <TableOfContents className={sideButtonRootClass} />,
    },
    {
      name: "Earnings",
      path: ADMIN_ROUTES.EARNINGS.ROOT,
      icon: <Landmark className={sideButtonRootClass} />,
    },
  ];
  return (
    <SidebarMenu className="gap-2">
      {sideButtons.map((item) => (
        <SidebarMenuItem key={item.name}>
          <Link href={item.path}>
            <SidebarMenuButton
              className={`hover:cursor-pointer ${
                pathName.startsWith(item.path.split("?")[0])
                  ? `bg-[#FF7701] hover:bg-[#d86500e6]`
                  : `dark:bg-white/10 dark:hover:bg-white/5 bg-black/10 hover:bg-black/5`
              }`}
            >
              {item.icon} {item.name}
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default LeftSideMenu;
