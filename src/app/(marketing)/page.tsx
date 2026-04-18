import Navbar from "@/components/layout/Navbar";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Home() {
  const skillTags = [
    "Guitar lessons",
    "Python basics",
    "Logo design",
    "Spanish",
    "Photography",
  ];

  const swappers = [
    {
      initials: "AP",
      color: "coral",
      name: "Anika P.",
      meta: "Offers: Yoga · Wants: Web dev",
    },
    {
      initials: "MK",
      color: "teal",
      name: "Marco K.",
      meta: "Offers: Spanish · Wants: Guitar",
    },
    {
      initials: "SR",
      color: "purple",
      name: "Sara R.",
      meta: "Offers: Photography · Wants: Python",
    },
    {
      initials: "JL",
      color: "amber",
      name: "James L.",
      meta: "Offers: Cooking · Wants: Design",
    },
  ] as const;

  const steps = [
    {
      num: 1,
      title: "List your skill",
      desc: "Tell us what you're good at — design, coding, cooking, music, languages.",
    },
    {
      num: 2,
      title: "Find a match",
      desc: "Browse people who want what you offer, and offer what you want.",
    },
    {
      num: 3,
      title: "Start swapping",
      desc: "Connect, set a schedule, and grow together — no money involved.",
    },
  ];

  const stats = [
    { num: "2,400+", label: "Active swappers" },
    { num: "180+", label: "Skills listed" },
    { num: "94%", label: "Match satisfaction" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero — two columns on large screens */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 items-start">
          {/* Left — headline + CTA */}
          <div>
            <Badge className="mb-4">Free to join — no money needed</Badge>
            <h1 className="text-4xl font-medium leading-tight mt-3 mb-4 text-foreground">
              Trade what you know.
              <br />
              Learn what you don't.
            </h1>
            <p className="text-base text-muted leading-relaxed mb-6 max-w-md">
              Connect with people who have the skills you want — and share yours
              in return. No money, just people helping people grow.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <Button variant="primary">Start Swapping</Button>
              <Button variant="outline">See How It Works</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillTags.map((tag, i) => (
                <span
                  key={i}
                  className="border border-border text-muted text-sm px-4 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — swapper cards */}
          <div className="flex flex-col gap-3">
            <p className="text-xs text-muted uppercase tracking-widest mb-1">
              Recent swappers
            </p>
            {swappers.map((s, i) => (
              <Card key={i} className="flex items-center gap-3">
                <Avatar initials={s.initials} color={s.color} />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {s.name}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{s.meta}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <hr className="border-border" />

        {/* Stats */}
        <section className="grid grid-cols-3 gap-4 py-10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-medium text-foreground">{stat.num}</p>
              <p className="text-sm text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        <hr className="border-border" />

        {/* How it works + CTA — two columns on large screens */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 items-start">
          {/* Left — steps */}
          <div>
            <p className="text-xs text-muted uppercase tracking-widest mb-6">
              How it works
            </p>
            <div className="flex flex-col gap-6">
              {steps.map((step) => (
                <div key={step.num} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-coral-light text-coral-dark flex items-center justify-center text-sm font-medium shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {step.title}
                    </p>
                    <p className="text-sm text-muted mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA box */}
          <div className="bg-surface rounded-lg px-8 py-10 text-center">
            <h2 className="text-2xl font-medium text-foreground mb-2">
              Ready to swap?
            </h2>
            <p className="text-sm text-muted mb-6">
              Join thousands of people trading skills every day.
            </p>
            <Button variant="primary">Create your free profile</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
