import AdminSignin from "@/components/organisms/auth/AdminSignin";
import AuthTemplate from "@/components/templates/AuthTemplate";
import React from "react";

const AdminSigninPage = () => {
  return (
    <AuthTemplate>
      <div className="flex flex-col  items-center w-100">
        <AdminSignin />
      </div>
    </AuthTemplate>
  );
};

export default AdminSigninPage;
