import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <div className="relative bg-[#1F1F1F] w-full">
          <Image
            className="ml-10 my-5"
            src={`/streamco_dark_logo.png`}
            alt="Next.js logo"
            width={120}
            height={40}
            priority
          />
        </div>
        {children}
      </div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-[12px] text-white/25">
        <div>
          <p className="inline">Copyright ©️ 2026-PRESENT Streamco Inc.</p>
          <Image className="inline ml-5 hover:cursor-pointer" src="/instagram_logo.png" alt="" height={16} width={16} />
          <Image className="inline ml-3 hover:cursor-pointer" src="/facebook_logo.png" alt="" height={16} width={16} />
          <Image className="inline ml-3 hover:cursor-pointer" src="/twitter_logo.png" alt="" height={16} width={16} />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
