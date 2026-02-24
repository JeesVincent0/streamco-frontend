"use client";

import {
  BanknoteArrowUp,
  CircleUserRound,
  LogIn,
  SquarePlus,
} from "lucide-react";
import { PopoverContent } from "../atoms/popover";
import { ROLE } from "@/constants/role.enum";
import LinkButton from "../atoms/LinkButton";
import { AUTH_ROUTES } from "@/constants/routers";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const NavBarProfilePopover = ({ roleProps }: { roleProps: ROLE }) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  return (
    <>
      <PopoverContent align="end" className="w-55 gap-2.5 flex flex-col">
        {isAuthenticated ? (
          <>
            {/* Profile button */}
            <LinkButton
              path={AUTH_ROUTES.SIGNUP.ROOT}
              text={
                roleProps === ROLE.ADMIN ? `Admin` : `${user && user.email}`
              }
            >
              <CircleUserRound />
            </LinkButton>
            {/* Logout button */}
            <LinkButton path={AUTH_ROUTES.LOGIN.ROOT} text={`logout`}>
              <LogIn className="h-5" />
            </LinkButton>
          </>
        ) : (
          <>
            {/* Signup button */}
            <LinkButton path={AUTH_ROUTES.SIGNUP.ROOT} text={`Signup`}>
              <SquarePlus />
            </LinkButton>

            {/* Login button */}
            <LinkButton path={AUTH_ROUTES.LOGIN.ROOT} text={`Login`}>
              <LogIn className="h-5" />
            </LinkButton>
          </>
        )}

        {roleProps === ROLE.USER && (
          <>
            <div className="border"></div>

            {/* Post your ads button */}
            <LinkButton
              path={AUTH_ROUTES.ADVERTISER_SIGNUP.ROOT}
              text={`Post your ads`}
            >
              <BanknoteArrowUp strokeWidth={1.75} className="h-5" />
            </LinkButton>
          </>
        )}
      </PopoverContent>
    </>
  );
};

export default NavBarProfilePopover;
