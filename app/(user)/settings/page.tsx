import { USER_ROUTES } from "@/constants/routers";
import { redirect } from "next/navigation";

const Settings = () => {
  redirect(USER_ROUTES.SETTINGS.PROFILE);
};

export default Settings;
