"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";

const TableLoadingSkelton = () => {
  const columns = ["Name", "Email", "Status", "isVerified", "Role", "Actions"];
  const rows = Array.from({ length: 10 });

  return (
    <Table>
      <TableHeader className="dark:bg-white/12 bg-black/12">
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col}>{col}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="dark:bg-white/5 bg-black/5">
        {rows.map((_, index) => (
          <TableRow key={index}>
            {columns.map((_, colIndex) => (
              <TableCell
                key={colIndex}
                className="h-12 bg-black/10 dark:bg-white/10 animate-pulse"
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableLoadingSkelton;
