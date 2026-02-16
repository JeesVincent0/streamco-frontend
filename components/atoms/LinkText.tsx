import Link from "next/link";


const LinkText = ({ path, text }: { path: string; text: string }) => {
  return (
    <Link
      className="text-sm dark:text-white/60 dark:hover:text-white/80 hover:underline"
      href={path}
    >
      {text}
    </Link>
  );
};

export default LinkText;
