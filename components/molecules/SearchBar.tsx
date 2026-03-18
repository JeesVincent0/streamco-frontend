"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, XIcon } from "lucide-react"; // Imported XIcon

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ButtonGroup } from "../atoms/button-group";
import { ADMIN_ROUTES } from "@/constants/routers";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Determine if the search bar should be visible
  const isUsersRoute = pathname === ADMIN_ROUTES.USERS.ROOT;
  const isCategoriesRoute = pathname === ADMIN_ROUTES.CATEGORIES.ROOT;
  const showSearchBar = isUsersRoute || isCategoriesRoute;

  const search = searchParams.get("search") || "";
  const [searchKey, setSearchKey] = useState(search);

  // Sync URL → input state
  useEffect(() => {
    setSearchKey(search);
  }, [search]);

  // If not on a supported route, don't render anything
  if (!showSearchBar) return null;

  // 2. Dynamic Search Handler
  const handleSearch = (valueToSearch: string) => {
    // Clone current params so we don't lose active filters (like status/sortBy)
    const params = new URLSearchParams(searchParams.toString());

    if (valueToSearch.trim() !== "") {
      params.set("search", valueToSearch.trim());
    } else {
      params.delete("search");
    }

    // Always reset to page 1 when doing a new search
    params.set("page", "1");

    // Push to the current pathname, making it work for both Users and Categories
    router.push(`${pathname}?${params.toString()}`);
  };

  // Trigger search on button click
  const onSubmit = () => {
    handleSearch(searchKey);
  };

  // Trigger clear on X icon click
  const onClear = () => {
    setSearchKey("");
    handleSearch(""); // Instantly update URL to clear the search
  };

  // Optional: Trigger search on "Enter" key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <ButtonGroup className="sm:w-50 md:w-65 lg:w-100 xl:w-150">
      <div className="relative w-full flex items-center">
        <Input
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyDown={handleKeyDown}
          className="rounded-sm dark:border dark:border-white/50 border-black/20 pr-8 w-full"
          placeholder={`Search ${isUsersRoute ? "users" : "categories"}...`}
        />

        {/* 3. Small Close Icon (Only shows if there is text) */}
        {searchKey && (
          <button
            onClick={onClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>

      <Button
        onClick={onSubmit}
        className="dark:bg-[#FF7701] bg-[#FF7701] rounded-sm border dark:border-white/50 border-black/20 dark:hover:bg-[#e26900f3] hover:bg-[#e26900f3] hover:cursor-pointer"
        variant="outline"
        size="icon"
        aria-label="Search"
      >
        <SearchIcon className="size-4 text-white" />
      </Button>
    </ButtonGroup>
  );
};

export default SearchBar;
