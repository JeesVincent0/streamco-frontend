"use client";

import { USER_ROUTES } from "@/constants/routers";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const urlPath = usePathname();
  const subPath = urlPath.split("/settings/")[1];
  console.log(subPath);

  const buttons = [
    { name: "Profile", path: USER_ROUTES.SETTINGS.PROFILE },
    { name: "Content Mode", path: USER_ROUTES.SETTINGS.CONTENT_MODE },
    { name: "Security", path: USER_ROUTES.SETTINGS.SECURITY },
    { name: "Wallet", path: USER_ROUTES.SETTINGS.WALLET },
    { name: "Channels", path: USER_ROUTES.SETTINGS.CHANNELS },
  ];

  const buttonStyle = {
    BUTTON_CONTAINER: `h-10 px-4 border-b-2 }`,
    BUTTON: "mt-2",
  };
  return (
    <>
      <header className="h-10 w-full px-10 mb-5">
        <div className="flex h-10 w-full border-b-3 border-white/25">
          {buttons.map((button, index) => (
            <div
              key={index}
              className={`${buttonStyle.BUTTON_CONTAINER} ${subPath === button.path.split("/settings/")[1] ? "border-[#C35B00] text-[#C35B00] border-b-3" : "border-transparent"}`}
            >
              <button
                onClick={() => router.push(button.path)}
                className={buttonStyle.BUTTON}
              >
                {button.name}
              </button>
            </div>
          ))}
        </div>
      </header>
      {children}
    </>
  );
};

export default Layout;
