"use client";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useAlert } from "@/context/AlertContext";
import { ACTIVE_USERS, ALERT_TYPES } from "@/lib/constants";
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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { setAlert } = useAlert();

  const handleSignup = async () => {
    setLoading(true);

    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setAlert(ALERT_TYPES.ERROR, "All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setAlert(ALERT_TYPES.ERROR, "Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setAlert(ALERT_TYPES.ERROR, "Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      setAlert(ALERT_TYPES.ERROR, error.message);
      setLoading(false);
      return;
    }
    setAlert(ALERT_TYPES.SUCCESS, "Account created successfully! Redirecting to dashboard...");
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 items-center">
          {/* Left — form */}
          <div className="max-w-sm animate-fadeInUp">
            <Link
              href="/"
              className="text-lg font-bold bg-gradient-to-r from-teal-dark to-coral bg-clip-text text-transparent block mb-10 hover:opacity-80 transition-opacity"
            >
              SkillSwap
            </Link>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-sm text-muted leading-relaxed mb-8">
              Join thousands of people trading skills every day.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5 animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
                <label className="text-sm font-medium text-muted">Full name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5 animate-slideInLeft" style={{ animationDelay: '0.15s' }}>
                <label className="text-sm font-medium text-muted">Email address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5 animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
                <label className="text-sm font-medium text-muted">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5 animate-slideInLeft" style={{ animationDelay: '0.25s' }}>
                <label className="text-sm font-medium text-muted">Confirm password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button
                variant="primary"
                className="w-full animate-slideInLeft"
                style={{ animationDelay: '0.3s' }}
                onClick={handleSignup}
              >
                {loading ? "Creating an account" : "Create account"}
              </Button>

              <p className="text-sm text-muted text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-coral font-medium hover:text-coral-dark transition-colors">
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* Right — coral panel */}
          <div className="hidden lg:flex flex-col gap-4 bg-gradient-to-br from-coral-light/20 to-coral-light/10 rounded-2xl px-8 py-10 border border-coral/10 animate-scaleIn">
            <p className="text-xs text-coral-dark uppercase tracking-widest font-bold flex items-center gap-2">
              ⭐ Why SkillSwap?
            </p>

            <div className="flex flex-col gap-3 stagger mb-4">
              {ACTIVE_USERS.map((user, i) => (
                <Card 
                  key={user.name} 
                  className="flex items-center gap-3 p-4 hover:bg-surface/50 group transition-all duration-300 animate-scaleIn"
                  style={{ animationDelay: `${i * 0.08}s` }}
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

            <ul className="flex flex-col gap-3 mt-4 pt-4 border-t border-coral/10 stagger">
              {whyPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-coral-dark font-medium transition-all duration-300 hover:translate-x-1 animate-slideInLeft"
                  style={{ animationDelay: `${0.35 + i * 0.1}s` }}
                >
                  <span className="w-5 h-5 rounded-full bg-coral text-white flex items-center justify-center text-xs flex-shrink-0 font-bold">
                    ✓
                  </span>
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
