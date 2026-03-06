import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { ButtonGroup } from "../atoms/button-group";

const SearchBar = () => {
  return (
    <>
      <ButtonGroup className="sm:w-50 md:w-65 lg:w-100 xl:w-150">
        <Input
          className="rounded-sm dark:border dark:border-white/50 border-black/20"
          placeholder="Search..."
        />
        <Button
          className="dark:bg-[#FF7701] bg-[#FF7701] rounded-sm border dark:border-white/50 border-black/20 dark:hover:bg-[#e26900f3] hover:bg-[#e26900f3] hover:cursor-pointer"
          variant="outline"
          size={"icon"}
          aria-label="Search"
        >
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </>
  );
};

export default SearchBar;
