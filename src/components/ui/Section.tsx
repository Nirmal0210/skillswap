export default function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-3 ${className || ""}`}>
      <p className="text-sm font-medium text-foreground mb-2">{title}</p>
      {children}
    </div>
  );
}
