import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover";

import NotificationButton from "@/components/molecules/NotificationButton";
import ProfileButton from "@/components/molecules/ProfileButton";
import SearchBar from "@/components/molecules/SearchBar";
import { ToggleTheme } from "@/components/molecules/ToggleTheme";
import { LogIn } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full border-b bg-background">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3">
          {/* Left Section - Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              className="hidden dark:block"
              src={`/streamco_dark_logo.png`}
              alt="Streamco logo"
              width={100}
              height={35}
              priority
            />
            <Image
              className="dark:hidden"
              src={`/streamco_light_logo.png`}
              alt="Streamco logo"
              width={100}
              height={35}
              priority
            />
            <span className="hidden sm:block text-xs sm:text-sm font-semibold text-foreground/70 tracking-wide">
              Admin
            </span>
          </div>

          {/* Center Section - Search (hidden on mobile) */}
          <div className="md:block w-64 lg:w-96">
            <SearchBar />
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ToggleTheme />
            <NotificationButton />

            <Popover>
              <PopoverTrigger asChild>
                <ProfileButton />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-52 flex flex-col gap-2">
                <Link
                  href={`/logout`}
                  className="flex items-center gap-3 h-9 rounded px-3 text-foreground/70 hover:text-foreground"
                >
                  <LogIn className="h-4 w-4" />
                  Logout
                </Link>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>

      {/* Push content below fixed navbar */}
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default layout;
