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

const LoginRedirectionDialog = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    router.replace(USER_ROUTES.HOME.ROOT);
  };

  const handleLogin = () => {
    router.replace(AUTH_ROUTES.LOGIN.ROOT);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Please Log In</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be logged in to access the page. Please log in to
            continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogin}>Login Now</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginRedirectionDialog;
