import GoogleSignupButton from "@/components/molecules/GoogleSingupButton";
import LoginForm from "@/components/molecules/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col  items-center w-100 gap-3">
      {/* Google button */}
      <GoogleSignupButton type={`Login`} />

      <p className="text-white/50">or</p>

      {/* singup form using email */}
      <LoginForm />
    </div>
  );
};

export default Login;
