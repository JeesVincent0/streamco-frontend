"use client";

import { Input } from "@/components/ui/input";
import { useGetCategoriesQuery } from "@/lib/service";
import React, { useState, useEffect, useRef, useCallback } from "react";

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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
      setCategories([]);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const queryParams = {
    page,
    limit: 10,
    sortby: "createdAt",
    order: "desc",
    status: "ACTIVE",
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  };

  const { data: response, isFetching } = useGetCategoriesQuery(queryParams, {
    skip: !isOpen,
  });

  useEffect(() => {
    if (response?.data?.categories) {
      setCategories((prev) =>
        page === 1
          ? response.data.categories
          : [...prev, ...response.data.categories],
      );

      const currentPage = response.data.pagination.page;
      const totalPages = response.data.pagination.totalPages;

      setHasMore(currentPage < totalPages); 
    }
  }, [response, page]);

  const lastElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        },
        {
          root: document.querySelector(".dropdown-scroll"),
          threshold: 1.0,
        },
      );

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore],
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCategory = categories.find((c) => c.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <Input
        value={isOpen ? search : selectedCategory?.name || value}
        onChange={(e) => {
          setSearch(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onClick={() => setIsOpen(true)}
        placeholder="Search category..."
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {isOpen && (
        <ul
          className="dropdown-scroll absolute z-10 w-full mt-1 max-h-60 overflow-y-auto
          bg-background border border-border rounded-md shadow-lg"
        >
          {categories.length === 0 && !isFetching && (
            <li className="p-2 text-sm text-center text-muted-foreground">
              No categories found
            </li>
          )}

          {categories.map((cat, index) => {
            const isLast = categories.length === index + 1;

            return (
              <li
                key={cat.id}
                ref={isLast ? lastElementRef : null}
                className="p-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  onChange(cat.id);
                  setSearch("");
                  setDebouncedSearch("");
                  setIsOpen(false);
                }}
              >
                {cat.name}
              </li>
            );
          })}

          {isFetching && (
            <li className="p-2 text-sm text-center text-muted-foreground">
              Loading...
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
