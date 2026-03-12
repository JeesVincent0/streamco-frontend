const ProfileHeader = () => {
  return (
    <section className="rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.05] p-6">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
        Profile
      </h2>
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-[#C35B00]">
          <img
            src="https://github.com/shadcn.png"
            alt="User Avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            jeesvincent
          </span>
          <button className="w-fit rounded bg-black/5 dark:bg-white/10 px-3 py-1 text-[10px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
            Edit avatar
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
