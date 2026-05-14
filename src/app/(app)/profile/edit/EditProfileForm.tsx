"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TagInput from "@/components/ui/TagInput";
import { useAlert } from "@/context/AlertContext";
import { createClient } from "@/lib/supabase/client";
import { ALERT_TYPES } from "@/lib/constants";
import { Profile } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EditProfileFormProps = {
  profile: Profile | null;
  userId: string;
};

export default function EditProfileForm({
  profile,
  userId,
}: EditProfileFormProps) {
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [skillsOffered, setSkillsOffered] = useState(
    profile?.skills_offered ?? [],
  );
  const [skillsWanted, setSkillsWanted] = useState(
    profile?.skills_wanted ?? [],
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAlert } = useAlert();

  const handleSave = async () => {
    setLoading(true);

    if (!fullName.trim()) {
      setAlert(ALERT_TYPES.ERROR, "Full name is required.");
      setLoading(false);
      return;
    }
    if (skillsOffered.length === 0 || skillsWanted.length === 0) {
      setAlert(ALERT_TYPES.ERROR, "Add at least one skill to offer and one to learn.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        skills_offered: skillsOffered.map((s) => s.trim().toLowerCase()),
        skills_wanted: skillsWanted.map((s) => s.trim().toLowerCase()),
      })
      .eq("id", userId);

    if (error) {
      setAlert(ALERT_TYPES.ERROR, error.message);
      setLoading(false);
      return;
    }

    setAlert(ALERT_TYPES.SUCCESS, "Profile updated successfully!");
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="bg-background border border-border rounded-lg p-6 flex flex-col gap-6">
      {/* Full name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-muted">Full name</label>
        <Input
          type="text"
          placeholder="Your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      {/* Skills offered */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-muted">Skills you offer</label>
        <TagInput
          tags={skillsOffered}
          onChange={setSkillsOffered}
          color="coral"
          placeholder="e.g. Guitar, Cooking..."
        />
        <p className="text-xs text-muted">Press Enter to add each skill</p>
      </div>

      {/* Skills wanted */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-muted">Skills you want to learn</label>
        <TagInput
          tags={skillsWanted}
          onChange={setSkillsWanted}
          color="teal"
          placeholder="e.g. Python, Design..."
        />
        <p className="text-xs text-muted">Press Enter to add each skill</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
        <Link href="/dashboard">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
