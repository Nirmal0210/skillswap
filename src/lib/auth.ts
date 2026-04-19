import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

// For pages that REQUIRE login — redirects if not logged in
export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return { user, supabase };
}

// For components that OPTIONALLY show user — no redirect
export async function getOptionalUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user, supabase };
}
