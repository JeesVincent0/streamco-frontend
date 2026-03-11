interface SectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  cols?: 2 | 3;
}

const Section = ({ title, icon: Icon, children, cols = 2 }: SectionProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Icon className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          cols === 3 ? "xl:grid-cols-3" : ""
        } gap-x-8 gap-y-5`}
      >
        {children}
      </div>
    </div>
  );
};

export default Section;