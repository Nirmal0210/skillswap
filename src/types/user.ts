export type AvatarColor = "coral" | "teal" | "purple" | "amber";

export type SwapUser = {
  name: string;
  skill: string;
  wants: string;
  initials: string;
  color: AvatarColor;
};

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  skills_offered: string[] | null;
  skills_wanted: string[] | null;
  created_at: string;
};
