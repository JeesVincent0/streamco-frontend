import Button from "@/components/atoms/Button";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import GoogleSignupButton from "@/components/molecules/GoogleSingupButton";

const UserSignupForm = () => {
  return (
    <div className="flex flex-col items-center w-100 gap-3">
      {/* Google button */}
      <GoogleSignupButton />

      <p className="text-white/50">or</p>

      {/* User singup form using email */}
      <div className="flex flex-col justify-center items-center gap-4 bg-white/3 h-110 w-full rounded-md border border-white/15">
        <InputField placeholder="First Name" />
        <InputField placeholder="Last Name" />
        <InputField placeholder="email@example.com" type="email" />
        <InputField placeholder="Password" type="password" />
        <InputField placeholder="Confirm Password" type="password" />

        <SelectField />

        <InputField placeholder="" type="date" />

        <Button text="SignUp" />
      </div>
    </div>
  );
};

export default UserSignupForm;
