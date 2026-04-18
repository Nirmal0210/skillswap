"use client";

import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { ACTIVE_USERS } from "@/lib/constants";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              Welcome back
            </h1>
            <p className="text-sm text-muted leading-relaxed mb-8">
              Log in to your account to continue swapping.
            </p>

            <div className="flex flex-col gap-5">
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
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted">Password</label>
                  <Link
                    href="#"
                    className="text-xs text-coral hover:opacity-75"
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

              <Button variant="primary" className="w-full">
                Log in
              </Button>

              <p className="text-sm text-muted text-center">
                Don't have an account?{" "}
                <Link href="/signup" className="text-coral hover:opacity-75">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Right — coral panel */}
          <div className="hidden lg:flex flex-col gap-4 bg-coral-light rounded-xl px-8 py-10">
            <p className="text-xs text-coral-dark uppercase tracking-widest">
              Active right now
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

            <blockquote className="border-l-2 border-coral pl-4 mt-2">
              <p className="text-sm text-coral-dark leading-relaxed">
                "I learned Python in 3 weeks by teaching someone Spanish. Best
                decision ever."
              </p>
              <p className="text-xs text-coral-dark opacity-70 mt-2">
                — Anika P.
              </p>
            </blockquote>
          </div>
        </section>
      </div>
    </main>
  );
}
