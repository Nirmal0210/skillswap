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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
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
          <div className="max-w-sm animate-fadeInUp">
            <Link
              href="/"
              className="text-lg font-bold bg-gradient-to-r from-teal-dark to-coral bg-clip-text text-transparent block mb-10 hover:opacity-80 transition-opacity"
            >
              SkillSwap
            </Link>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-muted leading-relaxed mb-8">
              Log in to your account to continue swapping.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5 animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
                <label className="text-sm font-medium text-muted">Email address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5 animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-muted">Password</label>
                  <Link
                    href="#"
                    className="text-xs text-coral hover:text-coral-dark transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 animate-slideInLeft">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <Button
                variant="primary"
                className="w-full animate-slideInLeft"
                style={{ animationDelay: '0.3s' }}
                onClick={handleLogin}
              >
                {loading ? "Logging in..." : "Log in"}
              </Button>

              <p className="text-sm text-muted text-center">
                Don't have an account?{" "}
                <Link href="/signup" className="text-coral font-medium hover:text-coral-dark transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4 bg-gradient-to-br from-coral-light/20 to-coral-light/10 rounded-2xl px-8 py-10 border border-coral/10 animate-scaleIn">
            <p className="text-xs text-coral-dark uppercase tracking-widest font-bold">
              🔥 Active right now
            </p>
            <div className="flex flex-col gap-3 stagger">
              {ACTIVE_USERS.map((user, i) => (
                <Card 
                  key={user.name} 
                  className="flex items-center gap-3 p-4 hover:bg-surface/50 group transition-all duration-300 animate-scaleIn"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    <Avatar>
                      <Avatar.Fallback color={user.color}>
                        {user.initials}
                      </Avatar.Fallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 transition-transform duration-300 group-hover:translate-x-1">
                    <p className="text-sm font-semibold text-foreground group-hover:text-coral transition-colors">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      📤 {user.skill} · 📥 {user.wants}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
