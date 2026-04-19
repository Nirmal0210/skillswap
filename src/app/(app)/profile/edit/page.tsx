import { requireUser } from "@/lib/auth";
import EditProfileForm from "./EditProfileForm";
import { Profile } from "@/types/user";

export default async function EditProfilePage() {
  const { user, supabase } = await requireUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-medium text-foreground mb-1">
          Edit profile
        </h1>
        <p className="text-sm text-muted mb-8">
          Update your skills and what you want to learn.
        </p>
        <EditProfileForm profile={profile as Profile} userId={user.id} />
      </div>
    </main>
  );
}
