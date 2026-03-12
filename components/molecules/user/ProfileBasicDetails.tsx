import InputGroup from "../common/ProfileInputGroup";

const ProfileBasicDetails = () => {
  return (
    <section className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A1A] p-6 shadow-sm dark:shadow-none">
      <div className="mb-6 border-b border-black/5 dark:border-white/10 pb-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Basic details
        </h2>
      </div>

      <div className="space-y-4">
        <InputGroup label="Username" value="jeesvincent" readOnly />
        <InputGroup label="Email" value="jeesvincent@gmail.com" readOnly />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Bio
          </label>
          <textarea
            className="min-h-[100px] w-full rounded-md border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#0F0F0F] p-3 text-sm text-neutral-900 dark:text-white focus:ring-1 focus:ring-[#C35B00] focus:border-[#C35B00] focus:outline-none transition-all"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputGroup label="Date of birth" value="25/02/2002" readOnly />
          <InputGroup label="Gender" value="Male" readOnly />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="rounded bg-[#C35B00] px-6 py-2 text-xs font-semibold text-white shadow-lg shadow-orange-900/20 hover:bg-[#a64d00] active:scale-95 transition-all">
          Edit details
        </button>
      </div>
    </section>
  );
};

export default ProfileBasicDetails;
