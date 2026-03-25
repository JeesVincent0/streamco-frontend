"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/*
 * A truly resuable pagination component that can be used across the application.
 * It uses the current page and total pages from props to calculate the next
 * and previous page URLs.
 */

const PaginationMolecule = ({
  totalPages,
}: {
  totalPages: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const nextPage = currentPage + 1;
  const previousPage = Math.max(currentPage - 1, 1);

  const updatePageInUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleForward = () => {
    if (currentPage < totalPages) updatePageInUrl(nextPage);
  };

  const handleBackward = () => {
    if (currentPage > 1) updatePageInUrl(previousPage);
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mx-0 w-auto bg-black/5 rounded-sm hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem className="hover:cursor-pointer">
            <PaginationPrevious onClick={handleBackward} />
          </PaginationItem>
        )}
        {currentPage < totalPages && (
          <PaginationItem className="hover:cursor-pointer">
            <PaginationNext onClick={handleForward} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationMolecule;
