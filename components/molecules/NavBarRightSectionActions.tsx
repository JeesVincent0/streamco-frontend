import { ToggleTheme } from "./ToggleTheme";
import NotificationButton from "./NotificationButton";
import { Popover, PopoverTrigger } from "../atoms/popover";
import ProfileButton from "./ProfileButton";
import NavBarProfilePopover from "./NavBarProfilePopover";
import { ROLE } from "@/constants/role.enum";

const NavBarRightSectionActions = ({ role }: { role: ROLE }) => {
  return (
    <>
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
    </>
  );
};

export default NavBarRightSectionActions;
