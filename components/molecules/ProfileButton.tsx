import React, { forwardRef } from "react";
import { Button } from "../ui/button";
import { SquareUserRound } from "lucide-react";

const ProfileButton = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>((props, ref) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="hover:cursor-pointer"
      ref={ref}
      {...props}
    >
      <SquareUserRound className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
});

ProfileButton.displayName = "ProfileButton";

export default ProfileButton;
