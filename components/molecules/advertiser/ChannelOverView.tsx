"use client";

import React, { useState } from "react";

// ==========================================
// TYPES (Ready for RTK Query integration)
// ==========================================
export interface LiveOverviewData {
  id: string;
  channelName: string;
  avatarUrl: string;
  category: string;
  date: string;
  time: string;
  thumbnailUrl: string;
  title: string;
  duration: string;
  avgBidPrice: string;
  liveSubscribedLive: string;
  subscribers: string;
  avgViewers: string;
  liveSubscribedChannel: string;
  lastSponsor: string;
}

// ==========================================
// DUMMY DATA
// ==========================================
const dummyData: LiveOverviewData = {
  id: "1",
  channelName: "CallMeShazzam TECH",
  avatarUrl: "https://i.pravatar.cc/150?u=shazzam", // Placeholder avatar
  category: "Tech",
  date: "25-Jan-2026",
  time: "09:00am",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&q=80", // Placeholder thumbnail
  title: "Custom Duty In India | My Experience | be careful!! | Malayalam",
  duration: "1 Hour",
  avgBidPrice: "₹84,500/-",
  liveSubscribedLive: "3456",
  subscribers: "1.45m",
  avgViewers: "53485",
  liveSubscribedChannel: "3456",
  lastSponsor: "Kalyan Silks",
};

// ==========================================
// SUB-COMPONENTS
// ==========================================

// Custom SVG Donut Chart to avoid heavy third-party dependencies
const DonutChart = ({
  title,
  segments,
  label,
}: {
  title: string;
  segments: { color: string; percent: number; label: string }[];
  label: string;
}) => {
  let accumulatedPercent = 0;

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
            const strokeDasharray = `${segment.percent} ${100 - segment.percent}`;
            const strokeDashoffset = -accumulatedPercent;
            accumulatedPercent += segment.percent;

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
  const [isOpen, setIsOpen] = useState(true); // Default open for demonstration
  const data = dummyData; // Replace with RTK Query data e.g., const { data } = useGetScheduledLiveQuery(id);

  return (
    <div className="w-full max-w-6xl mx-auto dark:bg-[#131313] border border-neutral-700 rounded-xl overflow-hidden font-sans text-white shadow-lg">
      {/* HEADER ROW (Accordion Toggle) */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 cursor-pointer hover:bg-[#252525] transition-colors"
      >
        {/* Left Side: Avatar & Name */}
        <div className="flex items-center gap-4 mb-3 sm:mb-0">
          <img
            src={data.avatarUrl}
            alt={data.channelName}
            className="w-10 h-10 rounded-full object-cover border border-neutral-600"
          />
          <h2 className="text-sm md:text-base font-semibold">
            {data.channelName}
          </h2>
        </div>

        {/* Right Side: Meta Info & Toggle */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs md:text-sm text-neutral-400 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex gap-4">
            <p>
              Category:{" "}
              <span className="text-white font-medium">{data.category}</span>
            </p>
            <p>
              Date: <span className="text-white font-medium">{data.date}</span>
            </p>
            <p>
              Time: <span className="text-white font-medium">{data.time}</span>
            </p>
          </div>
          <button className="text-white focus:outline-none p-1">
            <svg
              className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* EXPANDABLE CONTENT */}
      <div
        className={`grid transition-all duration-300 ease-in-out border-t dark:bg-[black] border-neutral-700 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 p-4"
            : "grid-rows-[0fr] opacity-0 p-0 border-transparent"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT COLUMN: Live Overview */}
            <div className="flex-1 lg:max-w-[40%] flex flex-col gap-6 lg:border-r border-neutral-700 lg:pr-8">
              <h3 className="text-neutral-400 text-sm font-medium">
                Live Overview:
              </h3>

              <div className="flex gap-4">
                <img
                  src={data.thumbnailUrl}
                  alt="Thumbnail"
                  className="w-32 h-20 object-cover rounded-md border border-neutral-700"
                />
                <p className="text-xs md:text-sm font-medium leading-relaxed max-w-[200px]">
                  {data.title}
                </p>
              </div>

              <div className="grid grid-cols-[130px_1fr] gap-y-3 text-sm">
                <span className="text-neutral-400">Duration</span>
                <span className="font-medium">: {data.duration}</span>

                <span className="text-neutral-400">Avg. Bid price</span>
                <span className="font-medium">: {data.avgBidPrice}</span>

                <span className="text-neutral-400">Live Subscribed</span>
                <span className="font-medium">: {data.liveSubscribedLive}</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Channel Overview & Charts */}
            <div className="flex-[2] flex flex-col gap-6">
              <h3 className="text-neutral-400 text-sm font-medium">
                Channel Overview:
              </h3>

              <div className="flex flex-col xl:flex-row gap-8">
                {/* Stats List */}
                <div className="flex-1 grid grid-cols-[130px_1fr] content-start gap-y-4 text-sm mt-2">
                  <span className="text-neutral-400">Subscribers</span>
                  <span className="font-medium">: {data.subscribers}</span>

                  <span className="text-neutral-400">Avg. viewers</span>
                  <span className="font-medium">: {data.avgViewers}</span>

                  <span className="text-neutral-400">Live Subscribed</span>
                  <span className="font-medium">
                    : {data.liveSubscribedChannel}
                  </span>

                  <span className="text-neutral-400">Last Sponsor</span>
                  <span className="font-medium">: {data.lastSponsor}</span>
                </div>

                {/* Charts Area */}
                <div className="flex-[2] border border-neutral-700 rounded-lg p-4">
                  <h4 className="text-xs text-neutral-300 font-medium mb-6">
                    Viewers Type
                  </h4>

                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                    <DonutChart
                      title="Gender"
                      label="Gender"
                      segments={[
                        { color: "#b47b44", percent: 65, label: "Male" },
                        { color: "#5a4231", percent: 35, label: "Female" },
                      ]}
                    />
                    <DonutChart
                      title="Age Group"
                      label="Age Group"
                      segments={[
                        { color: "#4c4272", percent: 20, label: "15 to 23" },
                        { color: "#387c6d", percent: 40, label: "24 to 33" },
                        { color: "#828e3b", percent: 40, label: "40 to 60" },
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
          </div>
        </div>
      </div>
    </div>
  );
}
