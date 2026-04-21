import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { requireUser } from "@/lib/auth";
import Link from "next/link";

export default async function ProfilePage() {
  const { user, supabase } = await requireUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Failed to load profile.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-medium text-foreground mb-1">
          Your profile
        </h1>
        <p className="text-sm text-muted mb-8">
          View and edit your skills and what you want to learn.
        </p>

        <Card className="p-6 flex flex-col gap-6">
          {/* Full Name */}
          <div>
            <p className="text-sm text-muted mb-1">Full name</p>
            <p className="text-lg text-foreground">
              {profile.full_name || "Unknown user"}
            </p>
          </div>

          {/* Skills Offered */}
          <div>
            <p className="text-sm text-muted mb-2">Skills offered</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills_offered?.length ? (
                profile.skills_offered.map((skill: string) => (
                  <Badge key={skill} variant="warning">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted">No skills offered yet.</p>
              )}
            </div>
          </div>

          {/* Skills Wanted */}
          <div>
            <p className="text-sm text-muted mb-2">Skills to learn</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills_wanted?.length ? (
                profile.skills_wanted.map((skill: string) => (
                  <Badge key={skill} variant="success">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted">No skills to learn yet.</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-2 border-t border-border">
            <Link href="/profile/edit">
              <Button variant="outline">Edit profile</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
