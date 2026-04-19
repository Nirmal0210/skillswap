"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh(); // forces navbar to re-render with logged out state
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Log out
    </Button>
  );
}
