type CardProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Card({ children, className = "", onClick }: CardProps) {
  const base = "bg-background border border-border p-4 rounded-lg";

  return (
    <div
      onClick={onClick}
      className={`${base} ${onClick ? "cursor-pointer hover:border-coral transition-colors" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
