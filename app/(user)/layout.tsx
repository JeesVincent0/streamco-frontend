import ShInput from "@/components/atoms/ShInput";
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
      <div className="relative flex justify-between items-center w-full px-10 py-4 border-b">
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
      </div>
      {children}
    </div>
  );
};

export default layout;
