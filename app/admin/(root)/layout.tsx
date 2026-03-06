import NavBar from "@/components/organisms/NavBar";
import { ROLE } from "@/constants/role.enum";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Nav Bar */}
      <NavBar role={ROLE.ADMIN} />

      {/* Push content below fixed navbar */}
      <div className="pt-20">{children}</div>
    </>
  );
};

export default layout;
