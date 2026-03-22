"use client";

import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { TableHead, TableRow, TableHeader } from "../../atoms/table";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../../atoms/dropdown-menu";
import Badge from "../../atoms/Badge";
import { SortIcon } from "../../atoms/SortIcon";
import { TableHeaderCustomProps } from "./types";

const ActiveDot = () => (
  <span className="ml-1 inline-block size-1.5 rounded-full bg-primary align-middle" />
);

export default function TableHeaderCustom({
  columns,
  queryArgs,
  onSort,
  onFilter,
}: TableHeaderCustomProps) {
  const headBtnCls =
    "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors";

  return (
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border">
        {columns.map((col, index) => {
          const alignment =
            col.align === "right"
              ? "text-right justify-end"
              : col.align === "center"
                ? "text-center justify-center"
                : "text-left justify-start";

          return (
            <TableHead
              key={col.field || index}
              className={`${col.className || ""}`}
            >
              {/* SORTABLE BUTTON */}
              {col.sortable && col.field && !col.filterOptions && (
                <button
                  onClick={() => onSort(col.field!)}
                  className={`${headBtnCls} w-full ${alignment}`}
                >
                  {col.name}
                  <SortIcon
                    field={col.field}
                    currentSortBy={queryArgs.sortBy}
                    currentOrder={queryArgs.order}
                  />
                </button>
              )}

              {/* FILTER DROPDOWN */}
              {col.filterOptions && col.field && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={`${headBtnCls} w-full ${alignment}`}>
                      {col.name}
                      {/* Check if there is an active filter for this field */}
                      {queryArgs[col.field] && queryArgs[col.field] !== "" && (
                        <ActiveDot />
                      )}
                      <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/60" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-40">
                    {col.filterOptions.map((opt) => (
                      <DropdownMenuItem
                        key={opt.value}
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => onFilter(col.field!, opt.value)}
                      >
                        {/* Display badge if styleClass is provided, otherwise simple text */}
                        {opt.styleClass ? (
                          <Badge
                            label={opt.label}
                            styleClass={opt.styleClass}
                          />
                        ) : (
                          <span className="text-sm">{opt.label || "All"}</span>
                        )}

                        {/* Checkmark for active state */}
                        {String(queryArgs[col.field!] ?? "") === opt.value && (
                          <CheckIcon className="size-3.5 text-primary ml-2" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* STANDARD HEADER (No sort, no filter) */}
              {!col.sortable && !col.filterOptions && (
                <div
                  className={`text-xs font-semibold uppercase tracking-wider text-muted-foreground ${alignment}`}
                >
                  {col.name}
                </div>
              )}
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}
