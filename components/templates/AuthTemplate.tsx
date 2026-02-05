import React from "react";

const AuthTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center  mt-10">
      {children}
    </div>
  );
};

export default AuthTemplate;
