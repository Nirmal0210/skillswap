import { AvatarColor } from "@/types/user";

type AvatarSize = "sm" | "md" | "lg";

const sizeMap: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

type AvatarProps = {
  children?: React.ReactNode;
  size?: AvatarSize;
  className?: string;
};

type AvatarImageProps = {
  src?: string;
  alt?: string;
};

type AvatarFallbackProps = {
  children?: React.ReactNode;
  color?: AvatarColor;
  className?: string;
};

function Avatar({ children, size = "md", className = "" }: AvatarProps) {
  const baseStyles = `${sizeMap[size]} rounded-full flex items-center justify-center font-semibold overflow-hidden transition-all duration-300 ring-2 ring-transparent hover:ring-coral/20 shadow-sm`;

  return <div className={`${baseStyles} ${className}`.trim()}>{children}</div>;
}

function AvatarImage({ src, alt }: AvatarImageProps) {
  if (!src) {
    return null;
  }

  return <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />;
}

function AvatarFallback({
  children,
  color = "coral",
  className = "",
}: AvatarFallbackProps) {
  const variants: Record<AvatarColor, string> = {
    coral: "bg-gradient-to-br from-coral-light to-coral-light/70 text-coral-dark font-bold",
    teal: "bg-gradient-to-br from-teal-light to-teal-light/70 text-teal-dark font-bold",
    purple: "bg-gradient-to-br from-purple-light to-purple-light/70 text-purple-dark font-bold",
    amber: "bg-gradient-to-br from-amber-light to-amber-light/70 text-amber-dark font-bold",
  };

  return (
    <div
      className={`w-full h-full rounded-full flex items-center justify-center ${variants[color]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export { AvatarImage, AvatarFallback };
export default Avatar;
