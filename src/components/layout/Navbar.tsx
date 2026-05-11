import Link from "next/link";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LogoutButton from "../ui/LogoutButton";
import { getOptionalUser } from "@/lib/auth";
import NavLinks from "../ui/NavLinks";
import { initials } from "@/lib/utils";

export default async function Navbar() {
  const { user } = await getOptionalUser();

  const fullName = user?.user_metadata?.full_name ?? "";

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm transition-all duration-300">
      <Link 
        href="/" 
        className="text-lg font-bold bg-gradient-to-r from-teal-dark to-coral bg-clip-text text-transparent hover:opacity-80 transition-opacity"
      >
        SkillSwap
      </Link>
      {user && <NavLinks />}
      <div className="flex items-center gap-3 transition-all duration-300">
        <ThemeToggle />

        {user ? (
          // Logged in state
          <Link 
            href="/profile" 
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-surface group"
          >
            <span className="text-sm text-muted group-hover:text-foreground transition-colors hidden sm:block">
              {fullName}
            </span>
            <div className="transition-transform duration-300 group-hover:scale-110">
              <Avatar>
                <Avatar.Image
                  src={user.user_metadata?.avatar_url}
                  alt={fullName}
                />
                <Avatar.Fallback color="purple">
                  {initials(fullName)}
                </Avatar.Fallback>
              </Avatar>
            </div>
            <LogoutButton />
          </Link>
        ) : (
          // Logged out state
          <div className="flex items-center gap-2 animate-fadeIn">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary">Get started</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
