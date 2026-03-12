const ProfileCompletionBadge = ({
  isProfileCompleted,
}: {
  isProfileCompleted: boolean;
}) => {
  return (
    <div
      className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
        isProfileCompleted
          ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
          : "bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400"
      }`}
    >
      {isProfileCompleted ? "Profile Complete" : "Incomplete Profile"}
    </div>
  );
};

export default ProfileCompletionBadge;
