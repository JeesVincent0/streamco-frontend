"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination";
import { useSearchParams } from "next/navigation";

/*
* A resuable pagination component that can be used across the application. 
* It takes in a starting URL and a limit for the number of items per page. 
* It uses the current page from the search parameters to calculate the next 
* and previous page URLs.
*/

const PaginationMolecule = ({
  startingUrl,
  limit = 10,
}: {
  startingUrl: string;
  limit?: number;
}) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const nextPage = currentPage + 1;
  const previousPage = Math.max(currentPage - 1, 1);

  return (
    <Pagination className="mx-0 w-auto bg-black/5 rounded-sm hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${startingUrl}?page=${previousPage}&limit=${limit}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`${startingUrl}?page=${nextPage}&limit=${limit}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationMolecule;
