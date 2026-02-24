import Image from "next/image";

const NavBarLogo = () => {
  return (
    <>
      <Image
        className="hidden dark:block"
        src={`/streamco_dark_logo.png`}
        alt="Streamco logo"
        width={100}
        height={35}
        priority
      />
      <Image
        className="dark:hidden"
        src={`/streamco_light_logo.png`}
        alt="Streamco logo"
        width={100}
        height={35}
        priority
      />
    </>
  );
};

export default NavBarLogo;
