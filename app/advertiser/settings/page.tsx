import { ADVERTISER_ROUTES } from "@/constants/routers";
import { redirect } from "next/navigation";

export default function Advertiser() {
  redirect(ADVERTISER_ROUTES.SETTINGS.PROFILE);
}
