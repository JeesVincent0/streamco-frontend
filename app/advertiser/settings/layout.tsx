import React from "react";
import { ADVERTISER_ROUTES } from "@/constants/routers";
import SettingsPageTemplate from "@/components/templates/SettingsPageTemplate";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const buttons = [
    { name: "Profile", path: ADVERTISER_ROUTES.SETTINGS.PROFILE },
  ];

  return (
    <SettingsPageTemplate buttons={buttons}>{children}</SettingsPageTemplate>
  );
};

export default Layout;
