interface BooleanBadgeProps {
  value: boolean;
}

const BooleanBadge = ({ value }: BooleanBadgeProps) => {
  return (
    <span
      className={`text-sm font-medium ${
        value ? "text-emerald-500" : "text-muted-foreground"
      }`}
    >
      {value ? "Yes" : "No"}
    </span>
  );
};

export default BooleanBadge;