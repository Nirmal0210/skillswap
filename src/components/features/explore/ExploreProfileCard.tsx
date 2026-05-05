"use client";

import { useState } from "react";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { BadgeVariant, Profile } from "@/types/user";
import { SwapRequestModal } from "../swaps/SwapRequestModal";
import checkMatch, { initials, MATCH_UI } from "@/lib/utils";
import { MATCH_RESULTS } from "@/lib/constants";
import BadgeGroup from "@/components/ui/BadgeGroup";
import EmptyText from "@/components/ui/EmptyText";

type ExploreProfileCardProps = {
  profile: Profile;
  currentUserProfile: Profile;
  isSwappedWith: boolean;
};

export function ExploreProfileCard({
  profile,
  currentUserProfile,
  isSwappedWith,
}: ExploreProfileCardProps) {
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);

  const matchResult = checkMatch(currentUserProfile, profile);
  const match = MATCH_UI[matchResult];

  const isDisabled =
    matchResult === MATCH_RESULTS.NO_MATCH ||
    matchResult === MATCH_RESULTS.NO_SKILLS ||
    isSwappedWith;

  return (
    <>
      <Card
        className={`overflow-hidden transition-shadow duration-200 hover:shadow-md ${
          isDisabled ? "opacity-60" : ""
        }`}
      >
        {/* Teal accent bar */}
        <div className="h-0.5 w-full bg-teal-dark" />

        <div className="flex items-center gap-4 p-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Avatar>
              <Avatar.Fallback color="teal">
                {initials(profile.full_name ?? "Unknown user")}
              </Avatar.Fallback>
            </Avatar>
          </div>

          {/* Name + skills */}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground truncate">
                {profile.full_name ?? "Unknown user"}
              </p>
              <Badge variant={match.variant as BadgeVariant}>
                {match.label}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-teal-dark">
                  Offers
                </span>
                {profile.skills_offered?.length ? (
                  <BadgeGroup
                    skills={profile.skills_offered}
                    variant="success"
                  />
                ) : (
                  <EmptyText text="—" />
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-coral">Wants</span>
                {profile.skills_wanted?.length ? (
                  <BadgeGroup
                    skills={profile.skills_wanted}
                    variant="warning"
                  />
                ) : (
                  <EmptyText text="—" />
                )}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex-shrink-0 ml-auto">
            <Button
              variant="primary"
              className="text-sm flex items-center gap-1"
              onClick={() => setIsSwapModalOpen(true)}
              disabled={isDisabled}
            >
              <span className="material-symbols-outlined text-sm">
                swap_horiz
              </span>
              Swap
            </Button>
          </div>
        </div>
        {isSwappedWith && (
          <Badge variant="destructive" className="float-right">
            Already swapped
          </Badge>
        )}
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
