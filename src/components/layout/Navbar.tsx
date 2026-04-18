import Button from "@/components/ui/Button";
import Link from "next/link";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  const session = null; // Placeholder for authentication state
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-border bg-background">
      <Link href="/" className="text-lg font-medium text-foreground">
        SkillSwap
      </Link>
      <div className="flex items-center justify-between">
        <ThemeToggle />
        {session ? (
          <div className="flex items-center gap-3">
            <Button variant="outline">User</Button>
            <Button variant="primary">Logout</Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
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
