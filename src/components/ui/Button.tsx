type ButtonProps = {
  variant?: "primary" | "outline";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  variant = "primary",
  children,
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {
  const base =
    "px-6 py-3 rounded-md text-sm font-medium cursor-pointer transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-coral disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-coral-contrast dark:disabled:opacity-40 dark:disabled:hover:opacity-40 dark:disabled:hover:cursor-not-allowed";

  const variants = {
    primary: "bg-coral text-white border-none",
    outline: "bg-transparent text-foreground border border-border",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}