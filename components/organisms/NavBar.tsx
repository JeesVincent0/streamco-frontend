import SearchBar from "../molecules/SearchBar";
import CreateChannelButton from "../molecules/CreateChannelButton";
import { ToggleTheme } from "../molecules/ToggleTheme";
import NotificationButton from "../molecules/NotificationButton";
import { Popover, PopoverTrigger } from "../atoms/popover";
import ProfileButton from "../molecules/ProfileButton";
import { ROLE } from "@/constants/role.enum";
import NavBarLogo from "../molecules/NavBarLogo";
import NavBarProfilePopover from "../molecules/NavBarProfilePopover";

const NavBar = ({ role = ROLE.USER }) => {
  return (
    <>
      <nav className="z-50 top-0  bg-background fixed flex justify-between items-center w-full px-10 py-4 border-b">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <NavBarLogo />
          {role !== ROLE.USER && (
            <span className="hidden sm:block text-xs sm:text-sm font-semibold text-foreground/70 tracking-wide">
              {role === ROLE.ADMIN ? `Admin` : `Advertiser`}
            </span>
          )}
        </div>

        {/* Center Section - Search (hidden on mobile) */}
        <div className="md:block w-64 lg:w-96">
          <SearchBar />
        </div>
        <div className="flex gap-2.5">
          {/* Create channel button  */}
          {role === ROLE.USER && (
            <div>
              <CreateChannelButton />
            </div>
          )}

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ToggleTheme />
            <NotificationButton />
            <Popover>
              <PopoverTrigger asChild>
                <ProfileButton />
              </PopoverTrigger>
              <NavBarProfilePopover roleProps={role} />
            </Popover>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
