import { Button } from "../ui/button";
import { Bell } from "lucide-react";

const NotificationButton = () => {
  return (
    <Button variant={"outline"} size="icon" className="hover:cursor-pointer">
      <Bell className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};

export default NotificationButton;
