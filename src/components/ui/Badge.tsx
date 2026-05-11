import { BadgeVariant } from "@/types/user";

type BadgeProps = {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
};

export default function Badge({
  children,
  variant = "warning",
  className = "",
}: BadgeProps) {
  const base = "inline-block text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md";

  const variants: Record<BadgeVariant, string> = {
    warning: "bg-coral-light/80 text-coral-dark border border-coral-light hover:bg-coral-light hover:shadow-coral/20",
    success: "bg-teal-light/80 text-teal-dark border border-teal-light hover:bg-teal-light hover:shadow-teal-light/20",
    info: "bg-surface border border-border text-foreground hover:border-border/60 hover:bg-surface/80",
    secondary: "bg-surface/80 text-muted border border-border hover:text-foreground hover:bg-surface",
    default: "bg-surface/80 text-foreground border border-border hover:bg-surface",
    destructive: "bg-destructive/80 text-destructive-foreground border border-destructive hover:bg-destructive",
    outline: "bg-transparent text-foreground border border-border hover:border-coral/50 hover:text-coral",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
