"use client";

import { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { useGetChannelsQuery } from "@/lib/service/user-api/channelApi";
import UserAvatar from "@/components/atoms/UserAvatar";

const formatSubscribers = (count: number | undefined) => {
  if (!count) return "0";
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
};

const ChannelList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isFetching } = useGetChannelsQuery({
    page,
    limit,
    search: debouncedSearch,
  });

  const channels = data?.data?.channels || [];
  const totalPages = data?.data?.totalPages || 1;
  console.log("This is channes: ", channels);

  return (
    <div className="w-full max-w-4xl mx-auto py-6 font-sans">
      {/* ─── HEADER & SEARCH ─── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Channels
        </h2>

        <div className="relative w-full sm:w-72">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-black/3 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF7701] text-neutral-900 dark:text-white placeholder:text-neutral-500 transition-colors"
          />
        </div>
      </div>

      {/* ─── CHANNEL LIST ─── */}
      <div className="flex flex-col gap-3 min-h-100">
        {isLoading || isFetching ? (
          // Loading Skeleton State
          <div className="p-8 text-center text-neutral-500 border border-black/10 dark:border-white/10 rounded-md bg-black/3 dark:bg-white/5 animate-pulse">
            Loading channels...
          </div>
        ) : channels.length === 0 ? (
          // Empty State
          <div className="p-8 text-center text-neutral-500 border border-black/10 dark:border-white/10 rounded-md bg-black/3 dark:bg-white/5">
            No channels found.
          </div>
        ) : (
          // Actual Data Render
          channels.map(
            (channel: {
              id: string;
              profileImageUrl: string;
              channelName: string;
              channelId: string;
              isLive: boolean;
              subscribersCount: number;
            }) => (
              <div
                key={channel.id}
                className="flex items-center justify-between p-4 rounded-md border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition-colors group cursor-pointer"
              >
                {/* Left Side: Avatar, Name & Handle */}
                <div className="flex items-center gap-4">
                  <div className="relative size-10 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shrink-0">
                    <UserAvatar
                      avatarUrl={channel.profileImageUrl}
                      displayName={channel.channelName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-neutral-900 dark:text-white tracking-wide text-sm sm:text-base leading-tight">
                      {channel.channelName}
                    </span>
                    <span className="text-xs text-neutral-500">
                      @{channel.channelId}
                    </span>
                  </div>
                </div>

                {/* Right Side: Subs & Status */}
                <div className="flex items-center gap-6 sm:gap-12">
                  {/* Subscribers count coming from DB */}
                  <div className="text-sm">
                    <span className="text-neutral-800 dark:text-neutral-200 font-medium uppercase">
                      {formatSubscribers(channel.subscribersCount)}
                    </span>{" "}
                    <span className="text-neutral-500 hidden sm:inline-block">
                      Subscribers
                    </span>
                  </div>

                  {/* Status Indicator checking the new isLive boolean */}
                  <div className="w-16 flex justify-end">
                    {channel.isLive ? (
                      <div className="flex items-center gap-2 text-[#FF7701] font-medium text-sm">
                        <span className="relative flex size-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7701] opacity-75"></span>
                          <span className="relative inline-flex rounded-full size-2 bg-[#FF7701]"></span>
                        </span>
                        Live
                      </div>
                    ) : (
                      <span className="text-neutral-500 font-medium text-sm">
                        Offline
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ),
          )
        )}
      </div>

      {/* ─── PAGINATION ─── */}
      {totalPages > 0 && (
        <div className="mt-8 flex justify-end">
          <div className="flex items-center rounded-md border border-black/10 dark:border-white/10 overflow-hidden text-sm font-medium">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1 || isLoading || isFetching}
              className="px-4 py-2 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors border-r border-black/10 dark:border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  disabled={isLoading || isFetching}
                  className={`px-4 py-2 border-r border-black/10 dark:border-white/10 transition-colors ${
                    page === pageNum
                      ? "bg-black/5 dark:bg-white/10 text-neutral-900 dark:text-white"
                      : "bg-transparent text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages || isLoading || isFetching}
              className="px-4 py-2 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelList;
