import Link from "next/link";

const LinkButton = ({
  path,
  text,
  children,
}: {
  path: string;
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Link
        href={path}
        className="flex gap-4 pl-3 text-foreground/70 hover:text-foreground/95  rounded h-8 items-center "
      >
        {children}
        {text}
      </Link>
    </>
  );
};

export default LinkButton;
