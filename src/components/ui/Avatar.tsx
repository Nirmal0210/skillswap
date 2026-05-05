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
  const baseStyles = `${sizeMap[size]} rounded-full flex items-center justify-center font-medium overflow-hidden`;

  return <div className={`${baseStyles} ${className}`.trim()}>{children}</div>;
}

function AvatarImage({ src, alt }: AvatarImageProps) {
  if (!src) {
    return null;
  }

  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
}

function AvatarFallback({
  children,
  color = "coral",
  className = "",
}: AvatarFallbackProps) {
  const variants: Record<AvatarColor, string> = {
    coral: "bg-coral-light text-coral-dark",
    teal: "bg-teal-light text-teal-dark",
    purple: "bg-purple-light text-purple-dark",
    amber: "bg-amber-light text-amber-dark",
  };

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${variants[color]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export { AvatarImage, AvatarFallback };
export default Avatar;
