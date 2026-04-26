"use client";

import { useState } from "react";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { BadgeVariant, Profile } from "@/types/user";
import { SwapRequestModal } from "../swaps/SwapRequestModal";
import checkMatch, { MATCH_UI } from "@/lib/utils";
import { MATCH_RESULTS } from "@/lib/constants";
import Section from "@/components/ui/Section";
import BadgeGroup from "@/components/ui/BadgeGroup";
import EmptyText from "@/components/ui/EmptyText";

type ExploreProfileCardProps = {
  profile: Profile;
  currentUserProfile: Profile;
};

export function ExploreProfileCard({
  profile,
  currentUserProfile,
}: ExploreProfileCardProps) {
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);

  const matchResult = checkMatch(currentUserProfile, profile);
  const match = MATCH_UI[matchResult];

  const initials: string =
    profile.full_name
      ?.split(" ")
      .map((n) => n[0])
      .join("") ?? "?";

  const isDisabled =
    matchResult === MATCH_RESULTS.NO_MATCH ||
    matchResult === MATCH_RESULTS.NO_SKILLS;

  return (
    <>
      <Card
        className={`flex items-center gap-4 p-3 transition-shadow duration-200 hover:shadow-md ${
          isDisabled ? "opacity-80" : ""
        }`}
      >
        {/* LEFT — Avatar + name + skills */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar initials={initials} color="coral" />

          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {profile.full_name ?? "Unknown user"}
            </p>

            {/* Inline skills row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-foreground/50">Offers</span>
                {profile.skills_offered?.length ? (
                  <BadgeGroup
                    skills={profile.skills_offered}
                    variant="warning"
                  />
                ) : (
                  <EmptyText text="—" />
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs text-foreground/50">Wants</span>
                {profile.skills_wanted?.length ? (
                  <BadgeGroup
                    skills={profile.skills_wanted}
                    variant="success"
                  />
                ) : (
                  <EmptyText text="—" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Match badge + action */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          <Badge variant={match.variant as BadgeVariant}>{match.label}</Badge>
          <Button
            variant="primary"
            className="text-sm"
            onClick={() => setIsSwapModalOpen(true)}
            disabled={isDisabled}
          >
            Request Swap
          </Button>
        </div>
      </Card>

      {isSwapModalOpen && (
        <SwapRequestModal
          isOpen={isSwapModalOpen}
          onClose={() => setIsSwapModalOpen(false)}
          targetProfile={profile}
          currentUserProfile={currentUserProfile}
        />
      )}
    </>
  );
}
