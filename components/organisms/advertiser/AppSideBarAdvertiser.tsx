"use client";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/atoms/sidebar";
import LeftSideProfile from "@/components/molecules/admin/LeftSideProfile";
import { ADVERTISER_ROUTES, USER_ROUTES } from "@/constants/routers";
import {
  HelpCircle,
  LayoutDashboard,
  Send,
  Settings,
  SquareArrowUpRight,
  Table2,
  TvMinimalPlay,
  Wallet,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const AppSideBarAdvertiser = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const urlPath = usePathname();
  const buttonClassName = {
    SELECTED: "text-white bg-[#C35B00] rounded-md hover:bg-[#C35B00]/90",
    DEFAULT: "",
  };
  const startingPath = `/advertiser/${urlPath.split("/")[2]}`;
  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <LeftSideProfile />
      <SidebarHeader>
        <div className="gap-2.5 flex flex-col w-[90%] mx-auto h-50">
          <SidebarMenuButton
            onClick={() => handleNavigation(ADVERTISER_ROUTES.HOME.ROOT)}
            className={
              startingPath === ADVERTISER_ROUTES.HOME.ROOT
                ? buttonClassName.SELECTED
                : buttonClassName.DEFAULT
            }
          >
            <LayoutDashboard className="text-black dark:text-white" /> Dashboard
          </SidebarMenuButton>
          <SidebarMenuButton
            onClick={() =>
              handleNavigation(ADVERTISER_ROUTES.HOME.SHEDULED_LIVE)
            }
            className={
              startingPath === ADVERTISER_ROUTES.HOME.SHEDULED_LIVE
                ? buttonClassName.SELECTED
                : buttonClassName.DEFAULT
            }
          >
            <TvMinimalPlay className="text-black dark:text-white" /> Scheduled
            Live
          </SidebarMenuButton>
          <SidebarMenuButton
            onClick={() => handleNavigation(ADVERTISER_ROUTES.HOME.SPONSORED)}
            className={
              startingPath === ADVERTISER_ROUTES.HOME.SPONSORED
                ? buttonClassName.SELECTED
                : buttonClassName.DEFAULT
            }
          >
            <SquareArrowUpRight className="text-black dark:text-white" />{" "}
            Sponsored
          </SidebarMenuButton>
          <SidebarMenuButton
            onClick={() => handleNavigation(ADVERTISER_ROUTES.HOME.BANNERS)}
            className={
              startingPath === ADVERTISER_ROUTES.HOME.BANNERS
                ? buttonClassName.SELECTED
                : buttonClassName.DEFAULT
            }
          >
            <Table2 className="text-black dark:text-white" /> Banners
          </SidebarMenuButton>
          <SidebarMenuButton
            onClick={() => handleNavigation(ADVERTISER_ROUTES.HOME.WALLET)}
            className={
              startingPath === ADVERTISER_ROUTES.HOME.WALLET
                ? buttonClassName.SELECTED
                : buttonClassName.DEFAULT
            }
          >
            <Wallet className="text-black dark:text-white" /> Wallet
          </SidebarMenuButton>
        </div>
      </SidebarHeader>

      <footer className="mt-auto pb-2">
        <div className="mt-auto border-t">
          <SidebarFooter className="flex flex-col items-center gap-3 mt-auto">
            <div className="gap-2.5 flex flex-col w-[90%] mx-auto mt-5 mb-5">
              <SidebarMenuButton
                onClick={() =>
                  handleNavigation(ADVERTISER_ROUTES.SETTINGS.ROOT)
                }
                className={
                  startingPath === ADVERTISER_ROUTES.SETTINGS.ROOT
                    ? buttonClassName.SELECTED
                    : buttonClassName.DEFAULT
                }
              >
                <Settings className="text-black dark:text-white" /> Settings
              </SidebarMenuButton>
              <SidebarMenuButton
                onClick={() => handleNavigation(ADVERTISER_ROUTES.HELP.ROOT)}
                className={
                  startingPath === ADVERTISER_ROUTES.HELP.ROOT
                    ? buttonClassName.SELECTED
                    : buttonClassName.DEFAULT
                }
              >
                <HelpCircle className="text-black dark:text-white" /> Help
              </SidebarMenuButton>
              <SidebarMenuButton
                onClick={() =>
                  handleNavigation(ADVERTISER_ROUTES.FEEDBACK.ROOT)
                }
                className={
                  startingPath === ADVERTISER_ROUTES.FEEDBACK.ROOT
                    ? buttonClassName.SELECTED
                    : buttonClassName.DEFAULT
                }
              >
                <Send className="text-black dark:text-white" /> Feedback
              </SidebarMenuButton>
            </div>
          </SidebarFooter>
        </div>
        <p className="text-center text-xs text-black/20 dark:text-white/25">
          Copy right © 2024 StreamCo. All rights reserved.
        </p>
      </footer>
    </Sidebar>
  );
};

export default AppSideBarAdvertiser;
