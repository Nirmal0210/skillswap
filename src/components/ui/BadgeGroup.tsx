import { BadgeVariant } from "@/types/user";
import Badge from "./Badge";

export default function BadgeGroup({
  skills,
  variant,
}: {
  skills: string[];
  variant: BadgeVariant;
}) {
  return (
    <div className="flex flex-row gap-1">
      {skills.map((skill, i) => (
        <Badge key={i} variant={variant}>
          {skill}
        </Badge>
      ))}
    </div>
  );
}
