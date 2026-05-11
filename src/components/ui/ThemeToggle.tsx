"use client";

import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-surface transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-md"
      aria-label="Toggle dark mode"
    >
      <span className="text-xl transition-transform duration-300 inline-block" style={{
        transform: isDark ? 'rotate(180deg) scale(1)' : 'rotate(0deg) scale(1)'
      }}>
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
