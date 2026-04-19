"use client";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { ACTIVE_USERS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const whyPoints = [
  "No money involved — just skills",
  "Find your match in minutes",
  "Learn anything, teach anything",
];

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 items-center">
          {/* Left — form */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-lg font-medium text-foreground block mb-10"
            >
              SkillSwap
            </Link>

            <h1 className="text-3xl font-medium text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-sm text-muted leading-relaxed mb-8">
              Join thousands of people trading skills every day.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-muted">Full name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-muted">Email address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-muted">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-muted">Confirm password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                variant="primary"
                className="w-full"
                onClick={handleSignup}
              >
                {loading ? "Creating an account" : "Create account"}
              </Button>

              <p className="text-sm text-muted text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-coral hover:opacity-75">
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* Right — coral panel */}
          <div className="hidden lg:flex flex-col gap-4 bg-coral-light rounded-xl px-8 py-10">
            <p className="text-xs text-coral-dark uppercase tracking-widest">
              Why SkillSwap?
            </p>

            <div className="flex flex-col gap-3">
              {ACTIVE_USERS.map((user) => (
                <Card key={user.name} className="flex items-center gap-3">
                  <Avatar initials={user.initials} color={user.color} />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      Offers: {user.skill} · Wants: {user.wants}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <ul className="flex flex-col gap-2 mt-2">
              {whyPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-coral-dark"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
