import { Button } from "../ui/button";
import { Bell } from "lucide-react";

const NotificationButton = () => {
  return (
    <Button variant={"outline"} size="icon">
      <Bell className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};

export default NotificationButton;
