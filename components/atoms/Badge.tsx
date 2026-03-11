interface BadgeProps {
  label: string;
  styleClass: string;
}

const Badge = ({ label, styleClass }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styleClass}`}
    >
      {label}
    </span>
  );
};

export default Badge;