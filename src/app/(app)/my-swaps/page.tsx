import SwapTabs from "@/components/features/swaps/SwapTabs";
import { requireUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function MySwapsPage() {
  const { user, supabase } = await requireUser();

  const [incomingRes, outgoingRes] = await Promise.all([
    supabase
      .from("swap_requests")
      .select(`*, sender:profiles!sender_id(full_name, avatar_url)`)
      .eq("receiver_id", user.id),
    supabase
      .from("swap_requests")
      .select(`*, receiver:profiles!receiver_id(full_name, avatar_url)`)
      .eq("sender_id", user.id),
  ]);

  if (incomingRes.error || outgoingRes.error) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-6">My Swaps</h1>
          <p className="text-red-500">
            Failed to load swap requests. Please try again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-dark to-coral bg-clip-text text-transparent mb-2">
            My Swaps
          </h1>
          <p className="text-sm text-muted">
            Manage your incoming and outgoing swap requests.
          </p>
        </div>
        <SwapTabs
          incoming={incomingRes.data || []}
          outgoing={outgoingRes.data || []}
        />
      </div>
    </main>
  );
}
