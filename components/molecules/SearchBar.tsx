"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, XIcon } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ButtonGroup } from "../atoms/button-group";
import { ADMIN_ROUTES } from "@/constants/routers";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isUsersRoute = pathname === ADMIN_ROUTES.USERS.ROOT;
  const isCategoriesRoute = pathname === ADMIN_ROUTES.CATEGORIES.ROOT;
  const showSearchBar = isUsersRoute || isCategoriesRoute;

  const search = searchParams.get("search") || "";
  const [searchKey, setSearchKey] = useState(search);

  // Sync internal state with URL if URL changes (e.g. browser back button)
  useEffect(() => {
    setSearchKey(search);
  }, [search]);

  // Memoize handleSearch to prevent unnecessary effect triggers
  const handleSearch = useCallback(
    (valueToSearch: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (valueToSearch.trim() !== "") {
        params.set("search", valueToSearch.trim());
      } else {
        params.delete("search");
      }

      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  // Debounce logic
  useEffect(() => {
    if (searchKey === search) return;

    const timer = setTimeout(() => {
      handleSearch(searchKey);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchKey, search, handleSearch]); // All dependencies included

  if (!showSearchBar) return null;

  const onClear = () => {
    setSearchKey("");
    handleSearch("");
  };

  const onSubmit = () => {
    handleSearch(searchKey);
  };

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
