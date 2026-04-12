"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";

// --- Mock Backend Call (Replace with your actual API) ---
const fetchCategoriesAPI = async (search: string, page: number) => {
  // Simulating network delay and paginated response
  await new Promise((res) => setTimeout(res, 500));
  const allMocks = Array.from({ length: 50 }, (_, i) => ({
    id: `cat-${i + 1}`,
    name: `Category ${i + 1}`,
  })).filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const paginated = allMocks.slice(start, start + pageSize);

  return {
    data: paginated,
    hasMore: start + pageSize < allMocks.length,
  };
};
// --------------------------------------------------------

interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  value: string;
  onChange: (id: string) => void;
  error?: string;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  onChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // For Infinite Scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore],
  );

  // Fetch Categories Effect
  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        const res = await fetchCategoriesAPI(search, page);
        if (isMounted) {
          setCategories((prev) =>
            page === 1 ? res.data : [...prev, ...res.data],
          );
          setHasMore(res.hasMore);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    // Debounce search
    const timeout = setTimeout(() => {
      loadCategories();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [search, page]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
    setCategories([]);
  }, [search]);

  // Close dropdown on outside click
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategory = categories.find((c) => c.id === value) || {
    name: "",
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Input
        value={isOpen ? search : selectedCategory.name || value}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onClick={() => setIsOpen(true)}
        placeholder="Search category..."
        autoComplete="off"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-background border rounded-md shadow-lg">
          {categories.length === 0 && !isLoading && (
            <li className="p-2 text-sm text-muted-foreground text-center">
              No categories found.
            </li>
          )}
          {categories.map((cat, index) => {
            const isLast = categories.length === index + 1;
            return (
              <li
                key={cat.id}
                ref={isLast ? lastElementRef : null}
                className="p-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                onClick={() => {
                  onChange(cat.id);
                  setSearch("");
                  setIsOpen(false);
                }}
              >
                {cat.name}
              </li>
            );
          })}
          {isLoading && (
            <li className="p-2 text-sm text-center text-muted-foreground">
              Loading...
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
