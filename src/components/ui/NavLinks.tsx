"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/explore", label: "Explore" },
    { href: "/my-swaps", label: "My Swaps" },
    { href: "/active-swaps", label: "Active Swaps" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="flex gap-5 justify-center">
      {navLinks?.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-base transition hover:text-foreground ${
            pathname === link.href
              ? "text-foreground font-semibold"
              : "text-muted"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
