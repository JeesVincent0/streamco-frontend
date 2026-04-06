"use client";

import { ReactNode } from "react";
import { CHANNEL_ROUTES } from "@/constants/routers/channels";
import SettingsPageTemplate from "@/components/templates/SettingsPageTemplate";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
  const url = usePathname();
  const channelId = url.split("/")[2];
  const buttons = [
    { name: "Channel Profile", path: CHANNEL_ROUTES.SETTINGS.ROOT(channelId) },
  ];
  return (
    <SettingsPageTemplate buttons={buttons}>{children}</SettingsPageTemplate>
  );
};

export default Layout;
