import NavBar from "@/components/organisms/NavBar";
import { ROLE } from "@/constants/role.enum";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar role={ROLE.ADVERTISER} />

      {/* Push content below fixed navbar */}
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default layout;
