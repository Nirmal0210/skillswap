type InputProps = {
  type?: "text" | "email" | "password" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
}: InputProps) {
  const base =
    "w-full px-4 py-3 rounded-md border border-border bg-surface text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-coral text-sm transition-colors dark:bg-surface-dark dark:border-border-dark dark:text-foreground-dark dark:placeholder:text-muted-dark dark:focus:ring-coral-dark";

  return (
    <input
      type={type}
      placeholder={placeholder}
      {...(onChange ? { value, onChange } : { defaultValue: value })}
      className={`${base} ${className}`}
    />
  );
}
