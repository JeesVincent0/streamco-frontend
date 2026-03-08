"use client";

import { useParams } from "next/navigation";

const Page = () => {
  const userId = useParams().id;
  return <div>user with ID {userId}</div>;
};

export default Page;
