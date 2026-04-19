import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { requireUser } from "@/lib/auth";
import Link from "next/link";

const suggestedMatches = [
  {
    initials: "MK",
    color: "teal",
    name: "Marco K.",
    offers: "Spanish",
    wants: "Guitar",
  },
  {
    initials: "SR",
    color: "purple",
    name: "Sara R.",
    offers: "Design",
    wants: "Cooking",
  },
  {
    initials: "JL",
    color: "amber",
    name: "James L.",
    offers: "Python",
    wants: "Guitar",
  },
] as const;

export default async function DashboardPage() {
  const { user, supabase } = await requireUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const fullName =
    profile?.full_name ?? user.user_metadata?.full_name ?? "there";

  const skillStats = [
    { label: "Skills offered", value: profile?.skills_offered?.length ?? 0 },
    { label: "Skills wanted", value: profile?.skills_wanted?.length ?? 0 },
    { label: "Active swaps", value: 0 },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-foreground">
            Good morning, {fullName}!
          </h1>
          <p className="text-sm text-muted mt-1">
            You have 3 new match suggestions today.
          </p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-4 mb-8">
          {skillStats.map((stat, i) => (
            <div key={i} className="bg-surface rounded-lg p-4">
              <p className="text-xs text-muted mb-1">{stat.label}</p>
              <p className="text-2xl font-medium text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        {/* Two column section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Your skills */}
          <Card>
            <p className="text-xs text-muted uppercase tracking-widest mb-3">
              Your skills
            </p>
            {profile?.skills_offered?.length ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills_offered.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="bg-coral-light text-coral-dark text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted mb-4">No skills added yet.</p>
            )}

            <p className="text-xs text-muted uppercase tracking-widest mb-3">
              Wants to learn
            </p>
            {profile?.skills_wanted?.length ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills_wanted.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="bg-teal-light text-teal-dark text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted mb-4">Nothing added yet.</p>
            )}

            <Link href="/profile/edit" className="w-full mt-2">
              <Button variant="outline" className="w-full">
                Edit profile
              </Button>
            </Link>
          </Card>

          {/* Suggested matches */}
          <Card>
            <p className="text-xs text-muted uppercase tracking-widest mb-3">
              Suggested matches
            </p>
            <div className="flex flex-col gap-3">
              {suggestedMatches.map((match, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 ${i > 0 ? "border-t border-border pt-3" : ""}`}
                >
                  <Avatar initials={match.initials} color={match.color} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {match.name}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      Offers {match.offers} · Wants {match.wants}
                    </p>
                  </div>
                  <Button variant="primary" className="text-xs px-3 py-1.5">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Active swap */}
        <Card className="flex items-center gap-4">
          <Avatar initials="AP" color="coral" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Anika P.</p>
            <p className="text-xs text-muted mt-0.5">
              You teach Guitar · She teaches Yoga
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Next session</p>
            <p className="text-sm font-medium text-foreground">Tomorrow, 3pm</p>
          </div>
        </Card>
      </div>
    </main>
  );
}
