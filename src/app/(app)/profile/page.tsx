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
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-dark to-coral bg-clip-text text-transparent mb-2">
            Your profile
          </h1>
          <p className="text-sm text-muted">
            View and edit your skills and what you want to learn.
          </p>
        </div>

        <Card className="p-6 flex flex-col gap-6 animate-scaleIn">
          {/* Full Name */}
          <div className="pb-4 border-b border-border/50 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <p className="text-xs font-bold text-muted uppercase tracking-wide mb-2">Full name</p>
            <p className="text-xl font-semibold text-foreground group hover:text-teal-dark transition-colors">
              {profile.full_name || "Unknown user"}
            </p>
          </div>

          {/* Skills Offered */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <p className="text-xs font-bold text-muted uppercase tracking-wide mb-3">Skills offered</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills_offered?.length ? (
                profile.skills_offered.map((skill: string, index: number) => (
                  <div key={skill} style={{ animationDelay: `${0.1 * index}s` }} className="animate-scaleIn">
                    <Badge variant="warning">
                      📤 {skill}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted italic">No skills offered yet.</p>
              )}
            </div>
          </div>

          {/* Skills Wanted */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <p className="text-xs font-bold text-muted uppercase tracking-wide mb-3">Skills to learn</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills_wanted?.length ? (
                profile.skills_wanted.map((skill: string, index: number) => (
                  <div key={skill} style={{ animationDelay: `${0.1 * index}s` }} className="animate-scaleIn">
                    <Badge variant="success">
                      📥 {skill}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted italic">No skills to learn yet.</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t border-border/50">
            <Link href="/profile/edit">
              <Button variant="outline">Edit profile</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
