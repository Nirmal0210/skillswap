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
    "px-6 py-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-coral focus:ring-offset-2 dark:focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed dark:disabled:opacity-40 dark:disabled:hover:opacity-40 dark:disabled:hover:cursor-not-allowed active:scale-95";

  const variants = {
    primary: "bg-coral text-white border-none hover:bg-coral-dark hover:shadow-lg hover:shadow-coral/20 hover:scale-105",
    outline: "bg-transparent text-foreground border border-border hover:border-coral hover:bg-coral-light/10 hover:shadow-md",
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