const CalendarSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-black rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm w-full">
      {/* Month Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-2">
          {/* Icon Skeleton */}
          <div className="w-5 h-5 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          {/* Title Skeleton */}
          <div className="w-24 h-6 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        </div>

        {/* Controls Skeleton */}
        <div className="h-[42px] w-full sm:w-[240px] rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      </div>

      {/* Days of Week (Static structure) */}
      <div className="grid grid-cols-7 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-bold uppercase tracking-wider text-neutral-300 dark:text-neutral-700 pb-2 border-b border-neutral-100 dark:border-neutral-800/50"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid Skeleton (35 blocks = standard 5 week month) */}
      <div className="grid grid-cols-7 gap-3 mt-4">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 animate-pulse"
          >
            {/* Number placeholder inside the block */}
            <div className="w-4 h-4 mt-3 ml-3 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarSkeleton;
