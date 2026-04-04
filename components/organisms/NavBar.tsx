"use client";

import SearchBar from "../molecules/SearchBar";
import CreateChannelButton from "../molecules/CreateChannelButton";
import { ROLE } from "@/constants/role.enum";
import NavBarLogo from "../molecules/NavBarLogo";
import NavBarRightSectionActions from "../molecules/NavBarRightSectionActions";
import GetBaseUser from "./auth/GetBaseUser";
import { usePathname } from "next/navigation";
import StartLiveButton from "../molecules/StartLiveButton";

const NavBar = ({ role = ROLE.USER }) => {
  const url = usePathname();
  const currentPath = url.split("/")[1];

  const isChannel = currentPath === "channel";

  return (
    <>
      <nav className="z-50 top-0  bg-background fixed flex justify-between items-center w-full px-10 py-4 border-b">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <NavBarLogo />
          {role !== ROLE.USER && !isChannel && (
            <span className="hidden sm:block text-xs sm:text-sm font-semibold text-foreground/70 tracking-wide">
              {role === ROLE.ADMIN ? `Admin` : `Advertiser`}
            </span>
          )}
          {isChannel && (
            <span className="hidden sm:block text-xs sm:text-sm font-semibold text-foreground/70 tracking-wide">
              Channel
            </span>
          )}
        </div>

        {/* Center Section - Search (hidden on mobile) */}
        <div className="md:block w-64 lg:w-96">
          <SearchBar />
        </div>
        <div className="flex gap-2.5">
          {/* Create channel button  */}
          {role === ROLE.USER && !isChannel && (
            <div>
              <CreateChannelButton />
            </div>
          )}

          {isChannel && (
            <div>
              <StartLiveButton />
            </div>
          )}

          {/* Right Section - Actions */}
          <NavBarRightSectionActions role={role} />
        </div>
        <GetBaseUser />
      </nav>
    </>
  );
};

export default NavBar;
