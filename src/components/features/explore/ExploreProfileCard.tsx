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
        className={`group overflow-hidden animate-scaleIn ${
          isDisabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {/* Gradient accent bar - animated */}
        <div className="h-1 w-full bg-gradient-to-r from-teal-dark via-purple-dark to-teal-dark group-hover:animate-shimmer" />

        <div className="flex items-center gap-4 p-4">
          {/* Avatar - with hover animation */}
          <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            <Avatar>
              <Avatar.Fallback color="teal">
                {initials(profile.full_name ?? "Unknown user")}
              </Avatar.Fallback>
            </Avatar>
          </div>

          {/* Name + skills */}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground truncate group-hover:text-teal-dark transition-colors duration-300">
                {profile.full_name ?? "Unknown user"}
              </p>
              <Badge variant={match.variant as BadgeVariant} className="animate-fadeIn">
                {match.label}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-teal-dark group-hover:text-teal-dark/80 transition-colors">
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
                <span className="text-xs font-medium text-coral group-hover:text-coral/80 transition-colors">Wants</span>
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
          <div className="flex-shrink-0 ml-auto transform transition-transform duration-300 group-hover:scale-105">
            <Button
              variant="primary"
              className="text-sm flex items-center gap-1 whitespace-nowrap"
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
          <div className="px-4 pb-3">
            <Badge variant="destructive" className="animate-fadeIn">
              Already swapped
            </Badge>
          </div>
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
