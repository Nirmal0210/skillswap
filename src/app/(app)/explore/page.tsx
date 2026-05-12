import { requireUser } from "@/lib/auth";
import { ExploreProfileCard } from "@/components/features/explore/ExploreProfileCard";
import { Profile } from "@/types/user";

export default async function ExplorePage() {
  const { user, supabase } = await requireUser();

  const PROFILE_FIELDS =
    "id, full_name, avatar_url, skills_offered, skills_wanted";

  const [{ data: allProfiles }, { data: swapRequests }, { data: activeSwaps }] =
    await Promise.all([
      supabase.from("profiles").select(PROFILE_FIELDS),
      supabase
        .from("swap_requests")
        .select("sender_id, receiver_id")
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`),
      supabase
        .from("active_swaps")
        .select("user1_id, user2_id")
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`),
    ]);

  const currentUserProfile = allProfiles?.find((p) => p.id === user.id) ?? null;
  const otherUsers = allProfiles?.filter((p) => p.id !== user.id) ?? [];

  const swappedUserIds = new Set([
    ...(swapRequests?.map((r) =>
      r.sender_id === user.id ? r.receiver_id : r.sender_id,
    ) ?? []),
    ...(activeSwaps?.map((s) =>
      s.user1_id === user.id ? s.user2_id : s.user1_id,
    ) ?? []),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-dark to-coral bg-clip-text text-transparent mb-2">
            Hello {currentUserProfile?.full_name ?? "there"}, explore the
            community!
          </h1>
          <p className="text-sm text-muted">
            Browse skills offered by the community and find someone to swap
            with.
          </p>
        </div>

        <div className="flex flex-col gap-4 stagger">
          {otherUsers.length ? (
            otherUsers.map((profile) => (
              <ExploreProfileCard
                key={profile.id}
                profile={profile as Profile}
                currentUserProfile={currentUserProfile as Profile}
                isSwappedWith={swappedUserIds.has(profile.id)}
              />
            ))
          ) : (
            <div className="text-center py-16 animate-fadeIn">
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
