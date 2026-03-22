import { ReactNode } from "react";
import { TableBody, TableRow, TableCell } from "@/components/atoms/table";

type TableBodyCustomProps<T> = {
  data: T[]; // An array of any generic data type (Users, Products, etc.)
  renderRow: (item: T, index: number) => ReactNode; // A function to draw a single row
  isLoading?: boolean;
  emptyMessage?: string;
};

export default function TableBodyCustom<T>({
  data,
  renderRow,
  isLoading,
  emptyMessage = "No results found.",
}: TableBodyCustomProps<T>) {
  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={100} className="h-24 text-center">
            {/* You can replace this with your TableLoadingSkeleton later */}
            Loading...
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (!data || data.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={100}
            className="h-24 text-center text-muted-foreground"
          >
            {emptyMessage}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>{data.map((item, index) => renderRow(item, index))}</TableBody>
  );
}
