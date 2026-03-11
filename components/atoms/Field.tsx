interface FieldProps {
  label: string;
  children: React.ReactNode;
}

const Field = ({ label, children }: FieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
};

export default Field;