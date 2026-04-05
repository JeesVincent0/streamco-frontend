"use client";

import { SidebarHeader, useSidebar } from "@/components/atoms/sidebar";
import { RootState } from "@/lib/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname, useParams } from "next/navigation";
import { useGetChannelDetailsQuery } from "@/lib/service/user-api/channelApi";

const LeftSideProfile = () => {
  const { state } = useSidebar();
  const { user } = useSelector((state: RootState) => state.auth);

  const pathname = usePathname();
  const params = useParams();

  const isChannelRoute = pathname?.split("/")[1] === "channel";
  const channelId = params?.id as string;

  const { data: channelData, isLoading } = useGetChannelDetailsQuery(
    channelId,
    { skip: !isChannelRoute || !channelId },
  );

  const isCollapsed = state === "collapsed";

  const displayAvatar = isChannelRoute
    ? channelData?.data.profileImageUrl
    : user?.avatarUrl;

  const displayName = isChannelRoute
    ? isLoading
      ? "Loading..."
      : channelData?.data.channelName || "Unknown Channel"
    : user?.displayName || "Guest User";

  const displaySubtext = isChannelRoute ? channelData?.handle : user?.email;

  return (
    <SidebarHeader className="p-0">
      <div
        className={`
          flex flex-col items-center justify-center 
          w-full transition-all duration-300 ease-in-out
          border-b border-border/50 bg-secondary/5
          ${isCollapsed ? "py-4" : "py-8 px-4"}
        `}
      >
        {/* Avatar Container - Scales with parent padding */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-30 transition duration-500" />
          <Image
            src={
              displayAvatar ||
              "https://ui-avatars.com/api/?name=" + (displayName || "User")
            }
            className="relative rounded-full border-2 border-background object-cover shadow-sm"
            alt="Profile Picture"
            width={isCollapsed ? 40 : 80}
            height={isCollapsed ? 40 : 80}
            priority
          />
        </div>

        {/* Text Details - Collapses smoothly */}
        <div
          className={`
            mt-4 flex flex-col items-center text-center overflow-hidden transition-all duration-300
            ${isCollapsed ? "max-h-0 opacity-0" : "max-h-20 opacity-100"}
          `}
        >
          <h2 className="text-sm font-bold text-foreground truncate w-full px-2">
            {displayName}
          </h2>
          <p className="text-xs text-muted-foreground truncate w-full px-2">
            {displaySubtext}
          </p>
        </div>
      </div>
    </SidebarHeader>
  );
};

export default LeftSideProfile;
