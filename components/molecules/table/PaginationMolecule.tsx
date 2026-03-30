"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const PaginationMolecule = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const updatePageInUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleBackward = () => {
    if (currentPage > 1) updatePageInUrl(currentPage - 1);
  };

  const handleForward = () => {
    if (currentPage < totalPages) updatePageInUrl(currentPage + 1);
  };

  /**
   * Generates the page number list with ellipsis.
   * e.g. [1, '...', 4, 5, 6, '...', 10]
   */
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mx-0 w-auto">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem className={cn(currentPage === 1 && "pointer-events-none opacity-50")}>
          <PaginationPrevious
            className="hover:cursor-pointer"
            onClick={handleBackward}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <span className="inline-flex items-center justify-center h-9 w-9 text-sm select-none text-muted-foreground">
                …
              </span>
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <button
                onClick={() => updatePageInUrl(page)}
                className={cn(
                  "inline-flex items-center justify-center h-9 w-9 rounded-sm text-sm font-medium transition-colors tabular-nums",
                  currentPage === page
                    ? "bg-primary text-primary-foreground pointer-events-none"
                    : "hover:bg-black/10 dark:hover:bg-white/10 hover:cursor-pointer"
                )}
              >
                {page}
              </button>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}>
          <PaginationNext
            className="hover:cursor-pointer"
            onClick={handleForward}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationMolecule;