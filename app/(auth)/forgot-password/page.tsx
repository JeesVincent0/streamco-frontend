import EmailVerification from "@/components/organisms/auth/EmailVerification";
import AuthTemplate from "@/components/templates/AuthTemplate";

const VerifyEmailPage = () => {
  return (
    <AuthTemplate>
      <EmailVerification />
    </AuthTemplate>
  );
};

export default VerifyEmailPage;
