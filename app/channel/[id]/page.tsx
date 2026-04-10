"use client";

import { CHANNEL_ROUTES } from "@/constants/routers/channels";
import { redirect, useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = params.id as string;

  redirect(CHANNEL_ROUTES.DASHBOARD.ROOT(id));
};

export default Page;
