import { Profile } from "@/types/user";
import { MATCH_RESULTS, MatchResult } from "./constants";

function hasOverlap(arr1?: string[] | null, arr2?: string[] | null) {
  return arr1?.some((item) => arr2?.includes(item)) ?? false;
}

export default function checkMatch(
  currentUserProfile: Profile,
  profile: Profile,
): MatchResult {
  if (
    !currentUserProfile.skills_offered?.length ||
    !profile.skills_wanted?.length
  ) {
    return MATCH_RESULTS.NO_SKILLS;
  }

  const offerMatches = hasOverlap(
    currentUserProfile.skills_offered,
    profile.skills_wanted,
  );

  const wantMatches = hasOverlap(
    profile.skills_offered,
    currentUserProfile.skills_wanted,
  );

  if (offerMatches && wantMatches) {
    return MATCH_RESULTS.PERFECT_MATCH;
  }

  if (offerMatches || wantMatches) {
    return MATCH_RESULTS.PARTIAL_MATCH;
  }

  return MATCH_RESULTS.NO_MATCH;
}

// matchUI.ts
export const MATCH_UI: Record<MatchResult, { variant: string; label: string }> =
  {
    [MATCH_RESULTS.PERFECT_MATCH]: {
      variant: "success",
      label: "Perfect Match",
    },
    [MATCH_RESULTS.PARTIAL_MATCH]: {
      variant: "info",
      label: "Partial Match",
    },
    [MATCH_RESULTS.NO_MATCH]: {
      variant: "warning",
      label: "No Match",
    },
    [MATCH_RESULTS.NO_SKILLS]: {
      variant: "secondary",
      label: "No Skills",
    },
  };

export function initials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
