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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Button } from "../ui/button";
import { useLogoutUserMutation } from "@/lib/service/authApi";
import { Spinner } from "../ui/spinner";
import { logout } from "@/lib/slice/authSlice";
import { useRouter } from "next/navigation";

const NavBarProfilePopover = ({ roleProps }: { roleProps: ROLE }) => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      localStorage.clear();
      dispatch(logout());
      router.replace(AUTH_ROUTES.LOGIN.ROOT);
    } catch {}
  };
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
            <Button onClick={handleLogout}>
              {isLoading ? (
                <>
                  <Spinner data-icon="inline-start" />
                  Logout...
                </>
              ) : (
                <>
                  <LogIn className="h-5" />
                  Logout
                </>
              )}
            </Button>
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
