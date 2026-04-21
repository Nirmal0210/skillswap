import { AvatarColor } from "@/types/user";

type AvatarProps = {
  initials: string;
  color?: AvatarColor;
};

export default function Avatar({ initials, color = "coral" }: AvatarProps) {
  const variants = {
    coral: "bg-coral-light text-coral-dark",
    teal: "bg-teal-light text-teal-dark",
    purple: "bg-purple-light text-purple-dark",
    amber: "bg-amber-light text-amber-dark",
  };

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${variants[color]}`}
    >
      {initials}
    </div>
  );
}
