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
  const base = "inline-block text-xs font-medium px-3 py-1 rounded-md";

  const variants = {
    warning: "bg-coral-light text-coral-dark",
    success: "bg-teal-light text-teal-dark",
    info: "bg-surface text-foreground border border-border",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
