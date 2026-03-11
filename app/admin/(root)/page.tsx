"use client";

import { ADMIN_ROUTES } from "@/constants/routers";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return router.replace(ADMIN_ROUTES.DASHBOARD.ROOT);
};

export default Page;
