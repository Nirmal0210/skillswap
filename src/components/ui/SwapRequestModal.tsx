import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { requireUser } from "@/lib/auth";
import { Profile } from "@/types/user";
import Link from "next/link";

export default async function ExplorePage() {
  const { user, supabase } = await requireUser();

  const { data: currentUserProfile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: otherUsers } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", user.id);
    
  const onStartSwap = (profile: Profile) => {
    // For now, just alert. In a real app, this would create a swap request in the database and redirect to a chat or swap details page.
    alert(`Swap requested with ${profile.full_name ?? "Unknown user"}!`);
  };
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-foreground mb-1">
            Hello {currentUserProfile?.full_name ?? "there"}, explore the
            community!
          </h1>
          <p className="text-sm text-muted">
            Browse skills offered by the community and find someone to swap
            with.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {otherUsers?.length ? (
            otherUsers.map((profile) => (
              <Card
                key={profile.id}
                className="flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3 flex-1">
                  <Avatar
                    initials={
                      profile.full_name
                        ?.split(" ")
                        .map((n: string) => n[0])
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
                        {profile.skills_offered.map(
                          (skill: string, i: number) => (
                            <Badge variant="warning" key={i}>
                              {skill}
                            </Badge>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-muted mb-2">
                        No skills offered yet
                      </p>
                    )}

                    {/* Skills wanted */}
                    {profile.skills_wanted?.length ? (
                      <div className="flex flex-wrap gap-1.5">
                        {profile.skills_wanted.map(
                          (skill: string, i: number) => (
                            <Badge variant="success" key={i}>
                              {skill}
                            </Badge>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-muted">Nothing wanted yet</p>
                    )}
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="text-sm shrink-0"
                  onClick={() => onStartSwap(profile)}
                >
                  Request Swap
                </Button>
              </Card>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-muted text-sm">No other users yet.</p>
              <p className="text-muted text-xs mt-1">
                Invite friends to join SkillSwap!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
