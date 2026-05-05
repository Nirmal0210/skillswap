import Link from "next/link";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LogoutButton from "../ui/LogoutButton";
import { getOptionalUser } from "@/lib/auth";
import NavLinks from "../ui/NavLinks";

export default async function Navbar() {
  const { user } = await getOptionalUser();

  const fullName = user?.user_metadata?.full_name ?? "";

  const initials = fullName
    ? fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-border bg-background">
      <Link href="/" className="text-lg font-medium text-foreground">
        SkillSwap
      </Link>
      {user && <NavLinks />}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        {user ? (
          // Logged in state
          <Link href="/profile" className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-muted hidden sm:block">
              {fullName}
            </span>
            <Avatar initials={initials} color="coral" />
            <LogoutButton />
          </Link>
        ) : (
          // Logged out state
          <>
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary">Get started</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
