import React from "react";
import { USER_ROUTES } from "@/constants/routers";
import SettingsPageTemplate from "@/components/templates/SettingsPageTemplate";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const buttons = [
    { name: "Profile", path: USER_ROUTES.SETTINGS.PROFILE },
    { name: "Content Mode", path: USER_ROUTES.SETTINGS.CONTENT_MODE },
    { name: "Security", path: USER_ROUTES.SETTINGS.SECURITY },
    { name: "Wallet", path: USER_ROUTES.SETTINGS.WALLET },
    { name: "Channels", path: USER_ROUTES.SETTINGS.CHANNELS },
  ];

  return (
    <SettingsPageTemplate buttons={buttons}>{children}</SettingsPageTemplate>
  );
};

export default Layout;
