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
import { ADMIN_ROUTES, AUTH_ROUTES } from "@/constants/routers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Button } from "../ui/button";
import { useLogoutUserMutation } from "@/lib/service/authApi";
import { Spinner } from "../ui/spinner";
import { logout } from "@/lib/slice/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

const NavBarProfilePopover = ({ roleProps }: { roleProps: ROLE }) => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user, role } = useSelector(
    (state: RootState) => state.auth,
  );

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      if (role === ROLE.ADMIN) {
        dispatch(logout());
        router.replace(ADMIN_ROUTES.SIGNIN.ROOT);
      } else {
        dispatch(logout());
        router.replace(AUTH_ROUTES.LOGIN.ROOT);
      }
      toast.success("successfully logged out...");
    } catch {
      dispatch(logout());
    }
  };
  return (
    <>
      <PopoverContent align="end" className="p-5 gap-2.5 flex flex-col">
        {isAuthenticated && user ? (
          <>
            {/* Profile button */}
            <LinkButton
              path={AUTH_ROUTES.SIGNUP.ROOT}
              text={
                roleProps === ROLE.ADMIN
                  ? `${user && user.email}`
                  : `${user && user.email}`
              }
            >
              {user?.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt=""
                  width={30}
                  height={30}
                  className="rounded-2xl"
                />
              ) : (
                <CircleUserRound />
              )}
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
