"use client";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/atoms/sidebar";
import { USER_ROUTES } from "@/constants/routers";
import { Film, HelpCircle, House, Send, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const AppSideBarUser = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const urlPath = usePathname();
  const buttonClassName = {
    SELECTED: "text-white bg-[#C35B00] rounded-md hover:bg-[#C35B00]/90",
    DEFAULT: "",
  };
  const startingPath = `/${urlPath.split("/")[1]}`;
  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="gap-2.5 flex flex-col w-[90%] mx-auto mt-5 h-20">
          <SidebarMenuButton
            onClick={() => handleNavigation(USER_ROUTES.HOME.ROOT)}
            className={
              startingPath === USER_ROUTES.HOME.ROOT
                ? buttonClassName.SELECTED
                : buttonClassName.DEFAULT
            }
          >
            <House className="text-black dark:text-white" /> Home
          </SidebarMenuButton>
          <SidebarMenuButton
            onClick={() => handleNavigation(USER_ROUTES.FEED.ROOT)}
            className={
              startingPath === USER_ROUTES.FEED.ROOT
                ? buttonClassName.SELECTED
                : buttonClassName.DEFAULT
            }
          >
            <Film className="text-black dark:text-white" /> Feed
          </SidebarMenuButton>
        </div>
      </SidebarHeader>

      <footer className="mt-auto pb-3">
        <div className="mt-auto border-t">
          <SidebarFooter className="flex flex-col items-center gap-3 mt-auto">
            <div className="gap-2.5 flex flex-col w-[90%] mx-auto mt-5 mb-5">
              <SidebarMenuButton
                onClick={() => handleNavigation(USER_ROUTES.SETTINGS.ROOT)}
                className={
                  startingPath === USER_ROUTES.SETTINGS.ROOT
                    ? buttonClassName.SELECTED
                    : buttonClassName.DEFAULT
                }
              >
                <Settings className="text-black dark:text-white" /> Settings
              </SidebarMenuButton>
              <SidebarMenuButton
                onClick={() => handleNavigation(USER_ROUTES.HELP.ROOT)}
                className={
                  startingPath === USER_ROUTES.HELP.ROOT
                    ? buttonClassName.SELECTED
                    : buttonClassName.DEFAULT
                }
              >
                <HelpCircle className="text-black dark:text-white" /> Help
              </SidebarMenuButton>
              <SidebarMenuButton
                onClick={() => handleNavigation(USER_ROUTES.FEEDBACK.ROOT)}
                className={
                  startingPath === USER_ROUTES.FEEDBACK.ROOT
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

export default AppSideBarUser;
