import Image from "next/image";

const GoogleSignupButton = () => {
  return (
    <button className="dark:bg-white/10 dark:hover:bg-white/13 h-15 w-full rounded-md border dark:border-white/15 border-black/15 hover:border-black/30 hover:bg-black/2 dark:hover:border-white/20 flex justify-center items-center hover:text-lg hover:cursor-pointer gap-3">
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
