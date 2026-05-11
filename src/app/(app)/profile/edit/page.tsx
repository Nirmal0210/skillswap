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
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-dark to-coral bg-clip-text text-transparent mb-2">
            Edit profile
          </h1>
          <p className="text-sm text-muted">
            Update your skills and what you want to learn.
          </p>
        </div>
        <EditProfileForm profile={profile as Profile} userId={user.id} />
      </div>
    </main>
  );
}
