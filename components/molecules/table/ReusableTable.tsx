"use client";

import React from "react";
import { Table } from "@/components/atoms/table";
import TableHeaderCustom from "./TableHeaderCustom";
import TableBodyCustom from "./TableBodyCustom";
import PaginationMolecule from "./PaginationMolecule";
import { TableColumn } from "./types";

interface ReusableTableProps<T> {
  columns: TableColumn[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  queryArgs: {
    page: number;
    limit: number;
    sortBy: string;
    order: string;
    role: string;
    status: string;
    search: string;
    isVerified: string | null;
  };
  onSort: (field: string) => void;
  onFilter: (field: string, value: string) => void;
  totalPages?: number;
}

export default function ReusableTable<T>({
  columns,
  data,
  renderRow,
  isLoading,
  emptyMessage = "No results found.",
  queryArgs,
  onSort,
  onFilter,
  totalPages,
}: ReusableTableProps<T>) {
  return (
    <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
      <div className="overflow-x-auto w-full">
        <Table>
          <TableHeaderCustom
            columns={columns}
            queryArgs={queryArgs}
            onSort={onSort}
            onFilter={onFilter}
          />
          <TableBodyCustom
            data={data}
            renderRow={renderRow}
            isLoading={isLoading}
            emptyMessage={emptyMessage}
          />
        </Table>
      </div>

      {/* Pagination Container */}
      {totalPages !== undefined && totalPages > 0 && (
        <div className="flex items-center justify-end border-t border-border px-4 py-3 sm:px-6">
          <PaginationMolecule totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
