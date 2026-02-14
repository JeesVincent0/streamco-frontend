import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const CreateChannelButton = () => {
  return (
    <Button
      variant={"secondary"}
      className="bg-[#FF7701] hover:bg-[#d86500e6] dark:text-white/95"
    >
      <Plus />
      <span className=" hidden lg-block xl:block">Create Channel</span>
    </Button>
  );
};

export default CreateChannelButton;
