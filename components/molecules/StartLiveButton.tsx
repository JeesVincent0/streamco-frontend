import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const StartLiveButton = () => {
  return (
    <Button
      variant={"secondary"}
      className="bg-[#FF7701] hover:bg-[#d86500e6] dark:text-white/95"
    >
      <Plus />
      <span className=" hidden lg-block xl:block">Start Live</span>
    </Button>
  );
};

export default StartLiveButton;
