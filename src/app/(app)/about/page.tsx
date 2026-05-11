import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function AboutPage() {
  const features = [
    {
      icon: "🤝",
      title: "Connect",
      description: "Find people who want to learn what you can teach.",
    },
    {
      icon: "📚",
      title: "Learn",
      description: "Acquire new skills from experienced community members.",
    },
    {
      icon: "🌱",
      title: "Grow",
      description: "Develop personally while sharing your expertise.",
    },
  ];

  const values = [
    { title: "Community First", desc: "We believe in the power of peer-to-peer learning" },
    { title: "Equal Exchange", desc: "Everyone has something valuable to teach and learn" },
    { title: "Lifelong Learning", desc: "Growth and personal development never stop" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 animate-fadeInUp">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-dark to-coral bg-clip-text text-transparent mb-3">
            About SkillSwap
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            SkillSwap is a platform designed to connect individuals who want to exchange skills with others in their community. Whether you want to learn a new language, pick up a musical instrument, or share your expertise in coding, SkillSwap makes it easy to find like-minded people and swap skills in a fun and engaging way.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="p-6 mb-12 animate-scaleIn border-l-4 border-l-coral">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Our Mission</h2>
              <p className="text-muted leading-relaxed">
                We foster a sense of community and encourage lifelong learning by providing a space where people can connect, share, and grow together. We believe that everyone has something valuable to offer, and by swapping skills, we can create a more connected and empowered world.
              </p>
            </div>
          </div>
        </Card>

        {/* How it Works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gradient-to-r from-coral to-teal-dark"></span>
            How it Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="p-6 text-center hover:bg-surface/50 animate-scaleIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-5xl mb-4 inline-block animate-float">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-dark to-teal-dark"></span>
            Our Values
          </h2>
          <div className="space-y-4 stagger">
            {values.map((value, i) => (
              <Card
                key={i}
                className="p-6 group hover:border-teal-dark/30 animate-slideInLeft"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <Badge variant="success" className="flex-shrink-0 mt-0.5">
                    ✓
                  </Badge>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-teal-dark transition-colors mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-8 bg-gradient-to-br from-teal-light/10 to-coral-light/10 border border-coral/20 animate-scaleIn text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Ready to Start Learning?
          </h2>
          <p className="text-muted mb-6 leading-relaxed">
            Join our community and start swapping skills today. Whether you're a teacher or a learner, SkillSwap has a place for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="/explore"
              className="px-6 py-3 rounded-md bg-coral text-white font-medium transition-all duration-200 hover:bg-coral-dark hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Explore Community
            </a>
            <a
              href="/profile/edit"
              className="px-6 py-3 rounded-md border border-border bg-background text-foreground font-medium transition-all duration-200 hover:border-coral hover:bg-coral-light/10 hover:shadow-md"
            >
              Set Up Your Skills
            </a>
          </div>
        </Card>
      </div>
    </main>
  );
}
