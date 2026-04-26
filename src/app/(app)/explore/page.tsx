import { requireUser } from "@/lib/auth";
import { ExploreProfileCard } from "@/components/features/explore/ExploreProfileCard";
import { Profile } from "@/types/user";

export default async function ExplorePage() {
  const { user, supabase } = await requireUser();

  const { data: currentUserProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: otherUsers } = await supabase
    .from("profiles")
    .select("*")
    .neq("id", user.id);

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
              <ExploreProfileCard
                key={profile.id}
                profile={profile}
                currentUserProfile={currentUserProfile as Profile}
              />
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
