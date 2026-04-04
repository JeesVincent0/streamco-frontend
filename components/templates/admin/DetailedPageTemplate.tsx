"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const DetailedPageTemplate = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <div className="space-y-5 py-6 px-2 sm:px-4 lg:px-6">
      {/* Back navigation */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer"
      >
        <ArrowLeftIcon className="size-4" />
        Go back
      </button>
      {children}
    </div>
  );
};

export default DetailedPageTemplate;
