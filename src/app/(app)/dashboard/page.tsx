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
        <div className="mb-12 animate-fadeInUp">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-dark via-purple-dark to-coral bg-clip-text text-transparent mb-2">
            Good morning, {fullName}!
          </h1>
          <p className="text-sm text-muted">
            You have 3 new match suggestions today.
          </p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-4 mb-8 stagger">
          {skillStats.map((stat, i) => (
            <div 
              key={i} 
              className="bg-surface rounded-xl p-6 border border-border/50 hover:border-teal-dark/30 transition-all duration-300 hover:shadow-lg hover:scale-105 group animate-scaleIn"
            >
              <p className="text-xs font-bold text-muted uppercase tracking-wide mb-2 group-hover:text-foreground transition-colors">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-foreground group-hover:text-teal-dark transition-colors">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        {/* Two column section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Your skills */}
          <Card className="p-6 animate-scaleIn" style={{ animationDelay: '0.1s' }}>
            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-coral"></span>
              Your skills
            </p>
            {profile?.skills_offered?.length ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills_offered.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="bg-gradient-to-br from-coral-light to-coral-light/70 text-coral-dark text-xs px-3 py-1.5 rounded-full font-semibold transition-all duration-300 hover:shadow-md hover:scale-105 animate-scaleIn"
                  >
                    📤 {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted mb-4 italic">No skills added yet.</p>
            )}

            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-teal-dark"></span>
              Wants to learn
            </p>
            {profile?.skills_wanted?.length ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills_wanted.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="bg-gradient-to-br from-teal-light to-teal-light/70 text-teal-dark text-xs px-3 py-1.5 rounded-full font-semibold transition-all duration-300 hover:shadow-md hover:scale-105 animate-scaleIn"
                  >
                    📥 {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted mb-4 italic">Nothing added yet.</p>
            )}

            <Link href="/profile/edit" className="w-full mt-4 block">
              <Button variant="outline" className="w-full">
                Edit profile
              </Button>
            </Link>
          </Card>

          {/* Suggested matches */}
          <Card className="p-6 animate-scaleIn" style={{ animationDelay: '0.2s' }}>
            <p className="text-xs font-bold text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-purple-dark"></span>
              Suggested matches
            </p>
            <div className="flex flex-col gap-4 stagger">
              {suggestedMatches.map((match, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-surface transition-all duration-300 group ${i > 0 ? "border-t border-border/50 pt-3" : ""}`}
                >
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    <Avatar size="md">
                      <Avatar.Fallback color={match.color as any}>
                        {match.initials}
                      </Avatar.Fallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 transition-transform duration-300 group-hover:translate-x-1">
                    <p className="text-sm font-semibold text-foreground group-hover:text-teal-dark transition-colors">
                      {match.name}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      📤 {match.offers} · 📥 {match.wants}
                    </p>
                  </div>
                  <Button variant="primary" className="text-xs px-3 py-1.5 transition-transform duration-300 group-hover:scale-105">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Active swap */}
        <Card className="p-6 flex items-center gap-4 group animate-scaleIn" style={{ animationDelay: '0.3s' }}>
          <div className="transition-transform duration-300 group-hover:scale-110">
            <Avatar size="lg">
              <Avatar.Fallback color="coral">
                AP
              </Avatar.Fallback>
            </Avatar>
          </div>
          <div className="flex-1 transition-transform duration-300 group-hover:translate-x-1">
            <p className="text-sm font-semibold text-foreground group-hover:text-coral transition-colors">Anika P.</p>
            <p className="text-xs text-muted mt-0.5">
              🎸 You teach Guitar · 🧘 She teaches Yoga
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Next session</p>
            <p className="text-sm font-bold text-foreground bg-gradient-to-r from-coral to-teal-dark bg-clip-text text-transparent">
              Tomorrow, 3pm
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
