"use client";

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

import {
  useGetDayLivesQuery,
  useGetMonthLivesQuery,
} from "@/lib/service/user-api/liveApi";

import { useState, useMemo } from "react";
import CalendarSkeleton from "../CalendarSkelton";

type LiveItem = {
  id: string;
  title: string;
  scheduleAt: string;
  expectedEndAt: string;
};

type ProcessedLiveItem = LiveItem & {
  colIndex: number;
  numCols: number;
};

export default function ScheduleCalendar({ channelId }: { channelId: string }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const { data, isLoading: isMonthLoading } =
    useGetMonthLivesQuery({
      channelId,
      year,
      month,
    }) || {};

  const monthData = data?.data;

  const formattedSelectedDay = selectedDay
    ? `${selectedDay.getFullYear()}-${String(selectedDay.getMonth() + 1).padStart(2, "0")}-${String(selectedDay.getDate()).padStart(2, "0")}`
    : null;

  const { data: dayDataResponse, isLoading: isDayLoading } =
    useGetDayLivesQuery(
      { channelId, date: formattedSelectedDay },
      { skip: !selectedDay },
    ) || {};

  const dayData = dayDataResponse?.data;

  const monthDataMap = useMemo(() => {
    const map: Record<number, number> = {};
    if (monthData && Array.isArray(monthData)) {
      monthData.forEach((item: { date: string; count: number }) => {
        const itemDate = new Date(item.date);
        if (!isNaN(itemDate.getTime())) {
          map[itemDate.getDate()] = item.count;
        }
      });
    }
    return map;
  }, [monthData]);

  const processedDayData = useMemo(() => {
    if (!dayData) return [];
    
    const sorted = [...dayData].sort(
      (a, b) => new Date(a.scheduleAt).getTime() - new Date(b.scheduleAt).getTime()
    );

    const groups: LiveItem[][] = [];
    let currentGroup: LiveItem[] = [];
    let groupEnd = 0;

    sorted.forEach((event) => {
      const start = new Date(event.scheduleAt).getTime();
      const end = new Date(event.expectedEndAt).getTime();

      if (currentGroup.length === 0) {
        currentGroup.push(event);
        groupEnd = end;
      } else if (start < groupEnd) {
        currentGroup.push(event);
        groupEnd = Math.max(groupEnd, end);
      } else {
        groups.push(currentGroup);
        currentGroup = [event];
        groupEnd = end;
      }
    });
    
    if (currentGroup.length > 0) groups.push(currentGroup);

    const processed: ProcessedLiveItem[] = [];

    groups.forEach((group) => {
      const columns: LiveItem[][] = [];
      
      group.forEach((event) => {
        let placed = false;
        for (let i = 0; i < columns.length; i++) {
          const lastEvent = columns[i][columns[i].length - 1];
          if (
            new Date(event.scheduleAt).getTime() >=
            new Date(lastEvent.expectedEndAt).getTime()
          ) {
            columns[i].push(event);
            placed = true;
            break;
          }
        }
        if (!placed) columns.push([event]);
      });

      const numCols = columns.length;
      columns.forEach((col, colIndex) => {
        col.forEach((event) => {
          processed.push({
            ...event,
            colIndex,
            numCols,
          });
        });
      });
    });

    return processed;
  }, [dayData]);

  if (isMonthLoading || !monthData) {
    return <CalendarSkeleton />;
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 2, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month, 1));

  const handlePrevDay = () => {
    if (selectedDay) {
      const prev = new Date(selectedDay);
      prev.setDate(prev.getDate() - 1);
      setSelectedDay(prev);
    }
  };

  const handleNextDay = () => {
    if (selectedDay) {
      const next = new Date(selectedDay);
      next.setDate(next.getDate() + 1);
      setSelectedDay(next);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(year, parseInt(e.target.value), 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(parseInt(e.target.value), month - 1, 1));
  };

  if (selectedDay) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-black text-black dark:text-white rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedDay(null)}
            className="flex items-center text-sm text-neutral-500 hover:text-[#C35B00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevDay}
              className="p-2 hover:text-[#C35B00] hover:bg-[#C35B00]/10 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold w-48 text-center tracking-tight">
              {selectedDay.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </h2>
            <button
              onClick={handleNextDay}
              className="p-2 hover:text-[#C35B00] hover:bg-[#C35B00]/10 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative h-[600px] overflow-y-auto border-t border-neutral-200 dark:border-neutral-800 pt-4 custom-scrollbar">
          {isDayLoading ? (
            <div className="flex justify-center mt-10 text-neutral-500">
              Loading schedule...
            </div>
          ) : (
            <div className="relative min-h-[1440px]">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full flex items-start"
                  style={{ top: `${(i / 24) * 100}%` }}
                >
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 w-12 text-right pr-4 -mt-2 font-medium">
                    {i === 0
                      ? "12 AM"
                      : i < 12
                        ? `${i} AM`
                        : i === 12
                          ? "12 PM"
                          : `${i - 12} PM`}
                  </span>
                  <div className="flex-1 border-t border-neutral-200 dark:border-neutral-800"></div>
                </div>
              ))}

              {processedDayData?.map((live: ProcessedLiveItem) => {
                const start = new Date(live.scheduleAt);
                const end = new Date(live.expectedEndAt);
                const startHour = start.getHours() + start.getMinutes() / 60;
                const durationHours =
                  (end.getTime() - start.getTime()) / (1000 * 60 * 60);

                const topPos = (startHour / 24) * 100;
                const heightPct = (durationHours / 24) * 100;

                const leftOffset = `calc(3.5rem + ((100% - 4.5rem) / ${live.numCols}) * ${live.colIndex})`;
                const widthStr = `calc(((100% - 4.5rem) / ${live.numCols}) - ${live.numCols > 1 ? 4 : 0}px)`;

                return (
                  <div
                    key={live.id}
                    className="absolute bg-[#C35B00]/10 dark:bg-[#C35B00]/20 border-l-4 border-[#C35B00] rounded-r-md p-3 shadow-sm overflow-hidden transition-all hover:bg-[#C35B00]/20 dark:hover:bg-[#C35B00]/30 cursor-default"
                    style={{
                      top: `${topPos}%`,
                      height: `${heightPct}%`,
                      minHeight: "24px",
                      left: leftOffset,
                      width: widthStr,
                    }}
                  >
                    <div className="text-sm font-bold text-[#C35B00] truncate tracking-tight">
                      {live.title}
                    </div>
                    <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">
                      {start.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {end.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-black text-black dark:text-white rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-[#C35B00]" />
          <h2 className="text-xl font-bold tracking-tight">Schedule</h2>
        </div>

        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 hover:text-[#C35B00] hover:bg-white dark:hover:bg-black rounded-md transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <select
            value={month - 1}
            onChange={handleMonthChange}
            className="bg-transparent font-semibold text-black dark:text-white cursor-pointer focus:outline-none px-2 appearance-none text-center hover:text-[#C35B00] transition-colors"
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m, i) => (
              <option key={m} value={i} className="text-black bg-white">
                {m}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={handleYearChange}
            className="bg-transparent font-semibold text-black dark:text-white cursor-pointer focus:outline-none px-2 appearance-none text-center hover:text-[#C35B00] transition-colors"
          >
            {[2025, 2026, 2027, 2028].map((y) => (
              <option key={y} value={y} className="text-black bg-white">
                {y}
              </option>
            ))}
          </select>

          <button
            onClick={handleNextMonth}
            className="p-1.5 hover:text-[#C35B00] hover:bg-white dark:hover:bg-black rounded-md transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 pb-2 border-b border-neutral-200 dark:border-neutral-800"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3 mt-4">
        {[...Array(firstDayOfMonth)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className="h-24 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/30"
          />
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const count = monthDataMap[day];

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(new Date(year, month - 1, day))}
              className="relative h-24 flex flex-col items-start justify-start p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[#C35B00] hover:bg-[#C35B00]/5 dark:hover:bg-[#C35B00]/10 transition-all group"
            >
              <span className="text-sm font-semibold text-black dark:text-white group-hover:text-[#C35B00] group-hover:scale-110 transition-all origin-left">
                {day}
              </span>

              {count > 0 && (
                <div className="mt-auto w-full">
                  <div className="bg-[#C35B00] text-white text-[10px] font-bold px-2 py-1 rounded-md text-center shadow-sm w-full truncate">
                    {count} {count === 1 ? "Slot" : "Slots"}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}