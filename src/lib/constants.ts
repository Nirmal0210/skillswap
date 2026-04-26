import { SwapUser } from "@/types/user";

export const MATCH_RESULTS = {
  PERFECT_MATCH: "Perfect Match",
  PARTIAL_MATCH: "Partial Match",
  NO_MATCH: "No Match",
  NO_SKILLS: "No Skills Listed",
} as const;

export type MatchResult = (typeof MATCH_RESULTS)[keyof typeof MATCH_RESULTS];

export const ACTIVE_USERS: SwapUser[] = [
  {
    name: "Anika P.",
    skill: "Yoga",
    wants: "Web dev",
    initials: "AP",
    color: "coral",
  },
  {
    name: "Marco K.",
    skill: "Spanish",
    wants: "Guitar",
    initials: "MK",
    color: "purple",
  },
  {
    name: "Sara R.",
    skill: "Photography",
    wants: "Python",
    initials: "SR",
    color: "teal",
  },
  {
    name: "James L.",
    skill: "Cooking",
    wants: "Design",
    initials: "JL",
    color: "amber",
  },
];
export const ALERT_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  LOADING: "loading",
} as const;

export type AlertType = (typeof ALERT_TYPES)[keyof typeof ALERT_TYPES];
