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
    console.error(
      "Error fetching swaps:",
      incomingRes.error,
      outgoingRes.error,
    );
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
        <h1 className="text-4xl font-bold mb-6">My Swaps</h1>
        <SwapTabs
          incoming={incomingRes.data || []}
          outgoing={outgoingRes.data || []}
        />
      </div>
    </main>
  );
}
