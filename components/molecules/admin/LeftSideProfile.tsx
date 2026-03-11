"use client";

import { SidebarHeader, useSidebar } from "@/components/atoms/sidebar";
import { RootState } from "@/lib/store";
import Image from "next/image";
import { useSelector } from "react-redux";

const LeftSideProfile = () => {
  const { state } = useSidebar();
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <SidebarHeader>
      <div className="flex flex-col items-center justify-center gap-8 h-50 border-b border-border">
        <div>
          <Image
            src={
              "https://lh3.googleusercontent.com/a/ACg8ocIYTPS-IYIT2lnyhhlTC4s2v4JZohI7iDwKCbhAuPhlEBtB-vk=s96-c"
            }
            className="rounded-full"
            alt="Logo"
            width={70}
            height={70}
          />
        </div>
        <div className="flex-col flex items-center justify-center">
          {state !== "collapsed" && (
            <>
              <div className="font-semibold">{user?.displayName}</div>
              <div className="">{user?.email}</div>
            </>
          )}
        </div>
      </div>
    </SidebarHeader>
  );
};

export default LeftSideProfile;
