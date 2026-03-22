import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from "lucide-react";

export function SortIcon({
  field,
  currentSortBy,
  currentOrder,
}: {
  field: string;
  currentSortBy?: string;
  currentOrder?: string;
}) {
  if (currentSortBy?.toLowerCase() !== field.toLowerCase()) {
    return <ChevronsUpDownIcon className="size-3.5 text-muted-foreground/60" />;
  }
  return currentOrder === "asc" ? (
    <ArrowUpIcon className="size-3.5 text-primary" />
  ) : (
    <ArrowDownIcon className="size-3.5 text-primary" />
  );
}
