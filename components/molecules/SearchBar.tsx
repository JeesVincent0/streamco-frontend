"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
  useParams, // <-- Import useParams
} from "next/navigation";
import { SearchIcon, XIcon } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ButtonGroup } from "../atoms/button-group";
import { ADMIN_ROUTES } from "@/constants/routers";
import { CHANNEL_ROUTES } from "@/constants/routers/channels";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams(); // <-- Get route parameters
  const id = params?.id as string; // <-- Extract 'id' (adjust if your folder uses a different name like [channelId])

  // Move the config inside the component so it can use the dynamic 'id'
  const SEARCH_CONFIG: Record<string, { placeholder: string }> = useMemo(
    () => ({
      [ADMIN_ROUTES.USERS.ROOT]: { placeholder: "Search users..." },
      [ADMIN_ROUTES.CATEGORIES.ROOT]: { placeholder: "Search categories..." },
      [ADMIN_ROUTES.CHANNELS.ROOT]: { placeholder: "Search channels..." },
      // Only add the scheduled live route if an id exists
      ...(id && {
        [CHANNEL_ROUTES.SCHEDULED_LIVE.ROOT(id)]: {
          placeholder: "Search scheduled live...",
        },
      }),
    }),
    [id],
  );

  const currentConfig = SEARCH_CONFIG[pathname];

  const search = searchParams.get("search") || "";
  const [searchKey, setSearchKey] = useState(search);

  useEffect(() => {
    setSearchKey(search);
  }, [search]);

  const handleSearch = useCallback(
    (valueToSearch: string) => {
      const currentParams = new URLSearchParams(searchParams.toString());

      if (valueToSearch.trim() !== "") {
        currentParams.set("search", valueToSearch.trim());
      } else {
        currentParams.delete("search");
      }

      currentParams.set("page", "1");
      router.push(`${pathname}?${currentParams.toString()}`);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (searchKey === search) return;

    const timer = setTimeout(() => {
      handleSearch(searchKey);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchKey, search, handleSearch]);

  if (!currentConfig) return null;

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
          placeholder={currentConfig.placeholder}
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
