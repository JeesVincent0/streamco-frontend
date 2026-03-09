"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { ButtonGroup } from "../atoms/button-group";
import { useState } from "react";
import { ADMIN_ROUTES } from "@/constants/routers";
import { useSearchParams, useRouter } from "next/navigation";

const SearchBar = () => {
  const [searchKey, setSearchKey] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const sortBy = searchParams.get("sortBy") || "displayName";
  const order = searchParams.get("order") || "asc";
  const role = searchParams.get("role") || "";
  const status = searchParams.get("status") || "";
  const isVerified = searchParams.get("isVerified");

  const handleSearch = () => {
    router.push(
      `${ADMIN_ROUTES.USERS.ROOT}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&role=${role}&status=${status}&isVerified=${isVerified}&search=${searchKey}`,
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
