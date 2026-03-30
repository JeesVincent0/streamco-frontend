"use client";

import { SidebarTrigger } from "@/components/atoms/sidebar";
import { ADVERTISER_ROUTES } from "@/constants/routers";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const urlPath = usePathname();

  // Extracting subpath safely
  const subPath = urlPath.split("/settings/")[1] || "";

  const buttons = [
    { name: "Profile", path: ADVERTISER_ROUTES.SETTINGS.PROFILE },
  ];

  return (
    <>
      <header className="fixed top-17 z-10 mb-5 flex w-full items-center bg-background pr-4 md:pr-10">
        {/* Sidebar Trigger fixed to the left */}
        <div className="flex h-12 w-12 items-center justify-center shrink-0">
          <SidebarTrigger className="-ml-1" />
        </div>

        {/* Scrollable Navigation Container */}
        <nav className="flex w-full border-b border-white/10 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex min-w-max">
            {buttons.map((button) => {
              const isActive = subPath === button.path.split("/settings/")[1];

              return (
                <button
                  key={button.path}
                  onClick={() => router.push(button.path)}
                  className={`
                    relative h-12 px-4 text-sm font-medium transition-all duration-200 whitespace-nowrap hover:cursor-pointer
                    ${isActive ? "text-[#C35B00]" : "dark:text-white/70 dark:hover:text-white"}
                  `}
                >
                  {button.name}
                  {/* Animated Active Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#C35B00]" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="px-4 md:px-10 mt-12 flex items-center justify-center">
        {children}
      </main>
    </>
  );
};

export default Layout;
