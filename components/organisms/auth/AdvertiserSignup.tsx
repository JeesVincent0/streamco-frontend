import AdvertiserSigupForm from "@/components/molecules/AdvertiserSigupForm";
import GoogleSignupButton from "@/components/molecules/GoogleSingupButton";

const AdvertiserSignup = () => {
  return (
    <div className="flex flex-col  items-center w-200 gap-3">
      {/* Google button */}
      <GoogleSignupButton />

      <p className="dark:text-white/50 text-black/50">or</p>

      {/* User singup form using email */}
      <AdvertiserSigupForm />
    </div>
  );
};

export default AdvertiserSignup;
