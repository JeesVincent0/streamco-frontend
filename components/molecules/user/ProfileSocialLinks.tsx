import InputGroup from "../common/ProfileInputGroup";

const ProfileSocialLinks = () => {
  return (
    <section className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1A1A1A] p-6 shadow-sm dark:shadow-none">
      <div className="mb-6 border-b border-black/5 dark:border-white/10 pb-2">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Social links
        </h2>
      </div>

      <div className="space-y-4">
        <InputGroup label="Instagram" placeholder="Enter social link" />
        <InputGroup label="X" placeholder="Enter social link" />
        <InputGroup label="Facebook" placeholder="Enter social link" />
        <InputGroup label="YouTube" placeholder="Enter social link" />
      </div>

      <div className="mt-8 flex justify-end gap-4 items-center">
        <button className="text-xs font-medium text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors">
          Cancel
        </button>
        <button className="rounded bg-neutral-100 dark:bg-white/5 px-6 py-2 text-xs font-semibold text-neutral-400 dark:text-neutral-500 cursor-not-allowed">
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default ProfileSocialLinks;
