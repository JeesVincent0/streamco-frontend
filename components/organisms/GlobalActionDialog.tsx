"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/atoms/alert-dialog";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES, USER_ROUTES } from "@/constants/routers";
import { ErrorCode } from "@/constants/enums";
import { useLogoutUserMutation } from "@/lib/service";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/slice/authSlice";

interface Props {
  errorCode: ErrorCode;
  onLogout?: () => void;
}

const GlobalErrorDialog = ({ errorCode }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      dispatch(logout());
      router.replace(AUTH_ROUTES.LOGIN.ROOT);

      toast.success("successfully logged out...");
    } catch {
      dispatch(logout());
    }
  };

  type ErrorDialogConfig = {
    title: string;
    message: string;
    actionText: string;
    cancelText: string;
    onAction: () => void;
    onCancel: () => void;
  };

  const config: Record<ErrorCode, ErrorDialogConfig> = {
    [ErrorCode.USER_NOT_EXISTS]: {
      title: "User Not Found",
      message: "This account does not exist.",
      actionText: "Go Home",
      cancelText: "Close",
      onAction: () => router.replace(USER_ROUTES.HOME.ROOT),
      onCancel: () => router.back(),
    },

    [ErrorCode.USER_SUSPENDED]: {
      title: "Account Suspended",
      message: "Your account is suspended.",
      actionText: "Logout",
      cancelText: "Close",
      onAction: () => {
        handleLogout();
        router.replace(USER_ROUTES.HOME.ROOT);
      },
      onCancel: () => router.replace(USER_ROUTES.HOME.ROOT),
    },

    [ErrorCode.CHANNEL_BLOCKED]: {
      title: "Channel Blocked",
      message: "This channel is blocked.",
      actionText: "Go to Channels",
      cancelText: "Close",
      onAction: () => router.replace("/settings/channels"),
      onCancel: () => router.back(),
    },

    [ErrorCode.ACCESS_DENIED]: {
      title: "Access Denied",
      message: "You are not allowed to access this.",
      actionText: "Go Home",
      cancelText: "Close",
      onAction: () => router.replace(USER_ROUTES.HOME.ROOT),
      onCancel: () => router.back(),
    },
  };

  const current = config[errorCode];

  if (!current) return null; // safety

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{current.title}</AlertDialogTitle>
          <AlertDialogDescription>{current.message}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={current.onCancel}>
            {current.cancelText}
          </AlertDialogCancel>

          <AlertDialogAction onClick={current.onAction}>
            {current.actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GlobalErrorDialog;
