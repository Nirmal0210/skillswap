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
    <div className={`mb-6 ${className || ""}`}>
      <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2 group">
        <span className="h-0.5 w-1.5 bg-gradient-to-r from-coral to-teal-dark rounded-full group-hover:w-3 transition-all duration-300"></span>
        {title}
      </h3>
      <div className="transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
