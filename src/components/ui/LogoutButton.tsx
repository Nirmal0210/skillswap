"use client";

import { createClient } from "@/lib/supabase/client";
import { useAlert } from "@/context/AlertContext";
import { ALERT_TYPES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function LogoutButton() {
  const router = useRouter();
  const { setAlert } = useAlert();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setAlert(ALERT_TYPES.INFO, "You have been logged out.");
    router.push("/");
    router.refresh(); // forces navbar to re-render with logged out state
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Log out
    </Button>
  );
}
