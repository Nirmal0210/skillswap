// src/components/features/swaps/SwapRequestModal.tsx (FEATURE-SPECIFIC)
"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Profile } from "@/types/user";
import { useState } from "react";

type SwapRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  targetProfile: Profile;
};

export function SwapRequestModal({
  isOpen,
  onClose,
  targetProfile,
}: SwapRequestModalProps) {
  const [selectedSkill, setSelectedSkill] = useState("");

  const handleSubmit = async () => {
    // Create swap request in database
    const response = await fetch("/api/swaps", {
      method: "POST",
      body: JSON.stringify({
        target_user: targetProfile.id,
        offered_skill: selectedSkill,
      }),
    });

    if (response.ok) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitButtonDisabled={!selectedSkill}
      title="Request a Skill Swap"
    >
      <div>
        <p className="text-sm text-muted">
          Propose a swap with {targetProfile.full_name}
        </p>

        <select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="w-full mt-4 p-2 border rounded"
        >
          <option>Select a skill you can offer...</option>
          {targetProfile.skills_wanted?.map((skill) => (
            <option key={skill}>{skill}</option>
          ))}
        </select>
      </div>
    </Modal>
  );
}
