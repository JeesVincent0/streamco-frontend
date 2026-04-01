export type FilterOption = {
  label: string;
  value: string;
  styleClass?: string;
};

export type TableColumn = {
  name: string;
  field?: string;
  sortable?: boolean;
  filterOptions?: FilterOption[];
  align?: "left" | "center" | "right";
  className?: string;
};

export type TableHeaderCustomProps = {
  columns: TableColumn[];
  queryArgs: {
    sortBy?: string;
    order?: string;
    [key: string]: string | undefined | null | boolean | number;
  };
  onSort: (field: string) => void;
  onFilter: (field: string, value: string) => void;
};
