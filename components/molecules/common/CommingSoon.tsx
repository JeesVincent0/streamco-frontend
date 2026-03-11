"use client";

import { useRouter } from "next/navigation";

const ComingSoon = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-10 rounded-2xl shadow-xl">
        <h1 className="text-xl font-bold text-white mb-4">🚧 Coming Soon</h1>

        <p className="text-gray-300">
          This feature is under development. Stay tuned!
        </p>

        <button onClick={handleGoBack} className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
