"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { ButtonGroup } from "../atoms/button-group";
import { useEffect, useState } from "react";
import { ADMIN_ROUTES } from "@/constants/routers";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const [searchKey, setSearchKey] = useState(search);

  // sync URL → input state
  useEffect(() => {
    setSearchKey(search);
  }, [search]);

  const handleSearch = () => {
    router.push(
      `${ADMIN_ROUTES.USERS.ROOT}?page=${1}&limit=${10}&sortBy=${"createdAt"}&order=${"desc"}&role=${"all"}&status=${"all"}&isVerified=${"all"}&search=${searchKey}`,
    );
  };

  return (
    <ButtonGroup className="sm:w-50 md:w-65 lg:w-100 xl:w-150">
      <Input
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        className="rounded-sm dark:border dark:border-white/50 border-black/20"
        placeholder="Search..."
      />

      <Button
        onClick={handleSearch}
        className="dark:bg-[#FF7701] bg-[#FF7701] rounded-sm border dark:border-white/50 border-black/20 dark:hover:bg-[#e26900f3] hover:bg-[#e26900f3] hover:cursor-pointer"
        variant="outline"
        size={"icon"}
        aria-label="Search"
      >
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
};

export default SearchBar;
