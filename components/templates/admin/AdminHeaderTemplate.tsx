import { SidebarTrigger } from "@/components/atoms/sidebar";
import Link from "next/link";
import { ReactNode } from "react";

const AdminHeaderTemplate = ({
  children,
  url,
  text,
}: {
  children: ReactNode;
  url: string;
  text: string;
}) => {
  return (
    <div>
      <header className="sticky top-17 z-10 flex h-16 w-full items-center border-b bg-background/95 px-4 backdrop-blur md:px-10">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="-ml-1" />
          <div className="h-6 w-px bg-border mx-2" />{" "}
          {/* Small visual separator */}
          <nav className="text-xl font-semibold tracking-tight">
            <Link href={url}>{text}</Link>
          </nav>
        </div>
      </header>
      <main className="px-10 pt-5 pb-10">{children}</main>
    </div>
  );
};

export default AdminHeaderTemplate;
