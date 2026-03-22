"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination";
import { useGetUsersQuery } from "@/lib/service/adminApi";
import { useRouter, useSearchParams } from "next/navigation";

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
  const currentLimit = Number(searchParams.get("limit")) || limit;
  const role = searchParams.get("role") || "all";
  const status = searchParams.get("status") || "all";
  const isVerified = searchParams.get("isVerified") || "all";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const order = searchParams.get("order") || "asc";
  const search = searchParams.get("search") || "";

  const { data } = useGetUsersQuery({
    page: currentPage,
    limit: currentLimit,
    role,
    status,
    isVerified,
    sortBy,
    order,
    search,
  });

  const { page, totalPages } = data?.data?.pagination ?? {};

  const nextPage = currentPage + 1;
  const previousPage = Math.max(currentPage - 1, 1);

  const router = useRouter();

  const handleForward = () => {
    router.push(
      `${startingUrl}?page=${nextPage}&limit=${currentLimit}&role=${role}&status=${status}&isVerified=${isVerified}&sortBy=${sortBy}&order=${order}&search=${search}`,
    );
  };

  const handleBackward = () => {
    router.push(
      `${startingUrl}?page=${previousPage}&limit=${currentLimit}&role=${role}&status=${status}&isVerified=${isVerified}&sortBy=${sortBy}&order=${order}&search=${search}`,
    );
  };

  return (
    <Pagination className="mx-0 w-auto bg-black/5 rounded-sm hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem className="hover:cursor-pointer">
            <PaginationPrevious onClick={handleBackward} />
          </PaginationItem>
        )}
        {page < totalPages && (
          <PaginationItem className="hover:cursor-pointer">
            <PaginationNext onClick={handleForward} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationMolecule;
