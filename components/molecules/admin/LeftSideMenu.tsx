"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/atoms/sidebar";
import { ADMIN_ROUTES } from "@/constants/routers";
import { CHANNEL_ROUTES } from "@/constants/routers/channels";
import {
  CalendarCheck2,
  History,
  Landmark,
  LayoutDashboard,
  Newspaper,
  Settings,
  TableOfContents,
  Tv,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const LeftSideMenu = () => {
  const pathName = usePathname();
  const id = useParams().id as string;
  const currentPathName = pathName.split("/")[1];
  const sideButtonRootClass = "text-black dark:text-white";
  const isChannel = currentPathName === "channel";
  const isAdmin = currentPathName === "admin";

  let sideButtons;
  if (isAdmin) {
    sideButtons = [
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
      {
        name: "Test",
        path: ADMIN_ROUTES.TEST.ROOT,
        icon: <Landmark className={sideButtonRootClass} />,
      },
    ];
  } else if (isChannel) {
    sideButtons = [
      {
        name: "Dashboard",
        path: CHANNEL_ROUTES.DASHBOARD.ROOT(id),
        icon: <LayoutDashboard className={sideButtonRootClass} />,
      },
      {
        name: "Live History",
        path: CHANNEL_ROUTES.LIVE_HISTORY.ROOT(id),
        icon: <History className={sideButtonRootClass} />,
      },
      {
        name: "Scheduled Live",
        path: CHANNEL_ROUTES.SCHEDULED_LIVE.ROOT(id),
        icon: <CalendarCheck2 className={sideButtonRootClass} />,
      },
      {
        name: "Earnings",
        path: CHANNEL_ROUTES.EARNINGS.ROOT(id),
        icon: <Landmark className={sideButtonRootClass} />,
      },
      {
        name: "Posts",
        path: CHANNEL_ROUTES.POSTS.ROOT(id),
        icon: <Newspaper className={sideButtonRootClass} />,
      },
      {
        name: "Settings",
        path: CHANNEL_ROUTES.SETTINGS.ROOT(id),
        icon: <Settings className={sideButtonRootClass} />,
      },
    ];
  } else {
    sideButtons = [
      {
        name: "Test",
        path: ADMIN_ROUTES.TEST.ROOT,
        icon: <Landmark className={sideButtonRootClass} />,
      },
    ];
  }
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
