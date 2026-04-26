// src/components/features/swaps/SwapRequestModal.tsx (FEATURE-SPECIFIC)
"use client";

import Modal from "@/components/ui/Modal";
import { useAlert } from "@/context/AlertContext";
import { apiCall } from "@/lib/api";
import { ALERT_TYPES } from "@/lib/constants";
import { Profile } from "@/types/user";
import { useState } from "react";

type SwapRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  targetProfile: Profile;
  currentUserProfile: Profile;
};

export function SwapRequestModal({
  isOpen,
  onClose,
  targetProfile,
  currentUserProfile,
}: SwapRequestModalProps) {
  const { setAlert } = useAlert();

  const [offeredSkill, setOfferedSkill] = useState<string>("");
  const [wantedSkill, setWantedSkill] = useState<string>("");

  const handleSubmit = async () => {
    const response = await apiCall("/api/swaps", {
      method: "POST",
      body: JSON.stringify({
        target_user: targetProfile.id,
        offered_skill: offeredSkill,
        wanted_skill: wantedSkill,
      }),
    });

    if (response.error) {
      setAlert(
        ALERT_TYPES.ERROR,
        "Failed to send swap request: " + response.error,
      );
    } else {
      setAlert(ALERT_TYPES.SUCCESS, "Swap request sent successfully!");
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!offeredSkill || !wantedSkill}
      title="Request a Skill Swap"
    >
      <div>
        <p className="text-sm text-muted">
          Propose a swap with {targetProfile.full_name}
        </p>

        <div className="flex flex-col gap-4 mt-4">
          {/* What I offer */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-muted">I can teach you</label>
            <select
              value={offeredSkill}
              onChange={(e) => setOfferedSkill(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coral"
            >
              <option value="">Select a skill you offer...</option>
              {currentUserProfile.skills_offered?.map((skill: string) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          {/* What I want from them */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-muted">
              I want to learn from {targetProfile.full_name}
            </label>
            <select
              value={wantedSkill}
              onChange={(e) => setWantedSkill(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-coral"
            >
              <option value="">Select a skill to learn...</option>
              {targetProfile.skills_offered?.map((skill: string) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
}
