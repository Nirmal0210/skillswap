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
          <div className="animate-fadeInUp">
            <Badge className="mb-4 animate-slideInLeft">✨ Free to join — no money needed</Badge>
            <h1 className="text-5xl font-bold leading-tight mt-3 mb-4 bg-gradient-to-r from-teal-dark via-purple-dark to-coral bg-clip-text text-transparent">
              Trade what you know.
              <br />
              Learn what you don't.
            </h1>
            <p className="text-base text-muted leading-relaxed mb-6 max-w-md">
              Connect with people who have the skills you want — and share yours
              in return. No money, just people helping people grow.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
              <Button variant="primary" className="transition-transform duration-300 hover:scale-105">
                Start Swapping
              </Button>
              <Button variant="outline" className="transition-transform duration-300 hover:scale-105">
                See How It Works
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 stagger">
              {skillTags.map((tag, i) => (
                <span
                  key={i}
                  className="border border-border text-muted text-sm px-4 py-1.5 rounded-full transition-all duration-300 hover:border-coral hover:text-foreground hover:bg-coral-light/10 hover:shadow-md animate-scaleIn"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — swapper cards */}
          <div className="flex flex-col gap-3 stagger">
            <p className="text-xs text-muted uppercase tracking-widest mb-1 font-bold">
              📊 Recent swappers
            </p>
            {swappers.map((s, i) => (
              <Card 
                key={i} 
                className="flex items-center gap-3 p-4 hover:bg-surface/50 group transition-all duration-300 animate-scaleIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <Avatar>
                    <Avatar.Fallback color={s.color}>
                      {s.initials}
                    </Avatar.Fallback>
                  </Avatar>
                </div>
                <div className="flex-1 transition-transform duration-300 group-hover:translate-x-1">
                  <p className="text-sm font-semibold text-foreground group-hover:text-teal-dark transition-colors">
                    {s.name}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{s.meta}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <hr className="border-border/50" />

        {/* Stats */}
        <section className="grid grid-cols-3 gap-4 py-10 stagger">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="text-center p-4 rounded-lg hover:bg-surface transition-all duration-300 hover:shadow-md animate-scaleIn"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-coral to-teal-dark bg-clip-text text-transparent">
                {stat.num}
              </p>
              <p className="text-sm text-muted mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </section>

        <hr className="border-border/50" />

        {/* How it works + CTA — two columns on large screens */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 items-start">
          {/* Left — steps */}
          <div className="animate-fadeInUp">
            <p className="text-xs text-muted uppercase tracking-widest mb-6 font-bold flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-coral"></span>
              How it works
            </p>
            <div className="flex flex-col gap-6 stagger">
              {steps.map((step) => (
                <div 
                  key={step.num} 
                  className="flex items-start gap-4 group animate-slideInLeft"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral-light to-coral-light/70 text-coral-dark flex items-center justify-center text-sm font-bold shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg shadow-sm">
                    {step.num}
                  </div>
                  <div className="flex-1 transition-transform duration-300 group-hover:translate-x-1">
                    <p className="text-sm font-semibold text-foreground group-hover:text-coral transition-colors">
                      {step.title}
                    </p>
                    <p className="text-sm text-muted mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA box */}
          <Card className="p-8 text-center bg-gradient-to-br from-teal-light/10 to-coral-light/10 border border-coral/20 animate-scaleIn">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Ready to swap?
            </h2>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              Join thousands of people trading skills every day.
            </p>
            <Button variant="primary" className="transition-transform duration-300 hover:scale-105">
              Create your free profile
            </Button>
          </Card>
        </section>
      </div>
    </main>
  );
}
