"use client";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Profile } from "@/types/user";
import { useState } from "react";
import { SwapRequestModal } from "../swaps/SwapRequestModal";

type ExploreProfileCardProps = {
  profile: Profile;
};

export function ExploreProfileCard({ profile }: ExploreProfileCardProps) {
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [swapTarget, setSwapTarget] = useState<Profile | null>(null);

  const handleStartSwap = (profile: Profile) => {
    setIsSwapModalOpen(true);
    setSwapTarget(profile);
  };

  return (
    <>
      <Card className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Avatar
            initials={
              profile.full_name
                ?.split(" ")
                .map((n) => n[0])
                .join("") ?? "?"
            }
            color="coral"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground mb-2">
              {profile.full_name ?? "Unknown user"}
            </p>

            {/* Skills offered */}
            {profile.skills_offered?.length ? (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {profile.skills_offered.map((skill, i) => (
                  <Badge variant="warning" key={i}>
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted mb-2">No skills offered yet</p>
            )}

            {/* Skills wanted */}
            {profile.skills_wanted?.length ? (
              <div className="flex flex-wrap gap-1.5">
                {profile.skills_wanted.map((skill, i) => (
                  <Badge variant="success" key={i}>
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted">Nothing wanted yet</p>
            )}
          </div>
        </div>

        <Button
          variant="primary"
          className="text-sm shrink-0"
          onClick={() => handleStartSwap(profile)}
        >
          Request Swap
        </Button>
      </Card>

      {swapTarget && (
        <SwapRequestModal
          isOpen={isSwapModalOpen}
          onClose={() => {
            setIsSwapModalOpen(false);
            setSwapTarget(null);
          }}
          targetProfile={swapTarget}
        />
      )}
    </>
  );
}
