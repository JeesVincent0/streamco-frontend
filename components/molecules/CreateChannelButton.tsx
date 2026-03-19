"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { USER_ROUTES } from "@/constants/routers";

const CreateChannelButton = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push(`${USER_ROUTES.CHANNEL.CREATE}`);
  };
  return (
    <Button
      onClick={handleOnClick}
      variant={"secondary"}
      className="bg-[#FF7701] hover:bg-[#d86500e6] dark:text-white/95"
    >
      <Plus />
      <span className=" hidden lg-block xl:block">Create Channel</span>
    </Button>
  );
};

export default CreateChannelButton;
