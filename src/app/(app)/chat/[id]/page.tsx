import ChatWindow from "./ChatWindow";
import { requireUser } from "@/lib/auth";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { user, supabase } = await requireUser();
  const { id: swapId } = await params;

  const { data: swap, error } = await supabase
    .from("active_swaps")
    .select(
      `*, user1:profiles!user1_id(id, full_name, avatar_url), user2:profiles!user2_id(id, full_name, avatar_url)`,
    )
    .eq("id", swapId)
    .single();

  if (error || !swap) {
    return <p className="text-red-500">Failed to load chat.</p>;
  }

  const partner = swap.user1_id === user.id ? swap.user2 : swap.user1;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-dark to-coral bg-clip-text text-transparent mb-2">
          Chat with {partner.full_name}
        </h1>
        <p className="text-sm text-muted mb-4">
          Swap your skills, grow together.
        </p>
        <ChatWindow swapId={swapId} currentUserId={user.id} partner={partner} />
      </div>
    </main>
  );
}
