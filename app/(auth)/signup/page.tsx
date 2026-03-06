import UserSignupForm from "@/components/organisms/auth/UserSignupForm";
import AuthTemplate from "@/components/templates/AuthTemplate";

const UserSingup = () => {
  return (
    <AuthTemplate>
      <UserSignupForm />
    </AuthTemplate>
  );
};

export default UserSingup;
