import React from "react";
import { Button } from "../ui/button";
import { SquareUserRound } from "lucide-react";

const ProfileButton = () => {
  return (
    <Button variant={"outline"} size="icon" className="hover:cursor-pointer">
      <SquareUserRound className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};

export default ProfileButton;
