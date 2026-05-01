"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Loading from "../common/LoadingPage";
import { useGetAuctionOverviewQuery } from "@/lib/service/advertisre-api/auction.api";
import Image from "next/image";

export interface LiveOverviewData {
  id: string;
  channelName: string;
  profileImageUrl: string;
  category: string;
  date: string;
  thumbnailUrl: string;
  title: string;
  duration: string;
  avgBidPrice: number;
  liveSubscribedLive: number;
  subscribers: number;
  avgViewers: number;
  liveSubscribedChannel: number;
  lastSponsor: string;
}

// ==========================================
// DONUT CHART COMPONENT
// ==========================================

const DonutChart = ({
  segments,
  label,
}: {
  title: string;
  segments: { color: string; percent: number; label: string }[];
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          {/* Background Ring */}
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="transparent"
            stroke="#333"
            strokeWidth="4"
          />

          {/* Data Rings */}
          {segments.map((segment, index) => {
            // ✅ Calculate accumulated percent (no mutation)
            const accumulatedPercent = segments
              .slice(0, index)
              .reduce((sum, seg) => sum + seg.percent, 0);

            const strokeDasharray = `${segment.percent} ${100 - segment.percent}`;
            const strokeDashoffset = -accumulatedPercent;

            return (
              <circle
                key={index}
                cx="18"
                cy="18"
                r="15.9155"
                fill="transparent"
                stroke={segment.color}
                strokeWidth="5"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 ease-in-out"
              />
            );
          })}
        </svg>

        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] md:text-xs text-neutral-300 font-medium">
            {label}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-col gap-1 w-full px-2">
        {segments.map((seg, idx) => (
          <div
            key={idx}
            className="flex items-center text-[8px] md:text-[10px] text-neutral-400"
          >
            <span
              className="w-2 h-2 rounded-full mr-2 shrink-0"
              style={{ backgroundColor: seg.color }}
            ></span>
            <span className="truncate">
              {seg.label} - {seg.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function ScheduledLiveCard() {
  const id = useParams().id;
  const [isOpen, setIsOpen] = useState(true);

  const queryId = Array.isArray(id) ? id[0] : id;
  const { data: response, isLoading } = useGetAuctionOverviewQuery(queryId);

  if (isLoading || !response?.data) return <Loading />;

  const data = response.data;
  const scheduledAt = new Date(data.date).toLocaleDateString();
  const scheduledTime = new Date(data.date).toLocaleTimeString();

  return (
    <div className="w-full max-w-6xl mx-auto dark:bg-[#131313] border border-neutral-700 rounded-xl overflow-hidden font-sans text-white shadow-lg">
      {/* HEADER */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 cursor-pointer hover:bg-[#252525]"
      >
        <div className="flex items-center gap-4">
          <Image
            src={data.profileImageUrl}
            alt={data.channelName}
            width={40}
            height={40}
            className="rounded-full object-cover border border-neutral-600"
          />
          <h2 className="text-sm md:text-base font-semibold">
            {data.channelName}
          </h2>
        </div>

        <div className="flex gap-4 text-xs md:text-sm text-neutral-400">
          <p>
            Category: <span className="text-white">{data.category}</span>
          </p>
          <p>
            Date: <span className="text-white">{scheduledAt}</span>
          </p>
          <p>
            Time: <span className="text-white">{scheduledTime}</span>
          </p>
        </div>
      </div>

      {/* BODY */}
      {isOpen && (
        <div className="p-4 border-t border-neutral-700">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT */}
            <div className="flex-1 lg:max-w-[40%]">
              <Image
                src={data.thumbnailUrl}
                alt="Thumbnail"
                height={100}
                width={80}
                className="w-32 h-20 object-cover rounded-md"
              />
              <p className="text-sm mt-2">{data.title}</p>
            </div>

            {/* RIGHT */}
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-4">
                <DonutChart
                  title="Gender"
                  label="Gender"
                  segments={[
                    { color: "#b47b44", percent: 65, label: "Male" },
                    { color: "#5a4231", percent: 35, label: "Female" },
                  ]}
                />

                <DonutChart
                  title="Age"
                  label="Age"
                  segments={[
                    { color: "#4c4272", percent: 20, label: "15-23" },
                    { color: "#387c6d", percent: 40, label: "24-33" },
                    { color: "#828e3b", percent: 40, label: "40-60" },
                  ]}
                />

                <DonutChart
                  title="Country"
                  label="Country"
                  segments={[
                    { color: "#682a2a", percent: 35, label: "USA" },
                    { color: "#828e3b", percent: 55, label: "India" },
                    { color: "#4a5923", percent: 10, label: "Other" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
