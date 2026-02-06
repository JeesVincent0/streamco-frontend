import Image from "next/image";

const GoogleSignupButton = () => {
  return (
    <button className="bg-white/3 hover:bg-white/5 h-15 w-full rounded-md border border-white/45 hover:border-white/20 flex justify-center items-center hover:text-lg hover:cursor-pointer gap-3">
      <Image
        src={`/google_logo.png`}
        height={20}
        width={20}
        alt="Google.logo"
      />
      <p>SignUp with Google</p>
    </button>
  );
};

export default GoogleSignupButton;
