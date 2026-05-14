import Avatar, { AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Card from "@/components/ui/Card";
import { requireUser } from "@/lib/auth";
import { initials } from "@/lib/utils";
import Link from "next/link";

interface SwapProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
}

interface SwapRequest {
  offered_skill: string;
  wanted_skill: string;
  sender: SwapProfile;
  receiver: SwapProfile;
}

interface ActiveSwap {
  id: string;
  swap_id: string;
  swap_requests: SwapRequest;
}

async function ActiveSwaps() {
  const { user, supabase } = await requireUser();

  const { data: activeSwaps, error } = (await supabase
    .from("active_swaps")
    .select(
      `
      id,
      swap_id,
      swap_requests (
        offered_skill,
        wanted_skill,
        sender:profiles!sender_id ( id, full_name, avatar_url ),
        receiver:profiles!receiver_id ( id, full_name, avatar_url )
      )
    `,
    )
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)) as unknown as {
    data: ActiveSwap[] | null;
    error: any;
  };

  if (error) {
    return <p className="text-red-500">Failed to load active swaps.</p>;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-dark to-coral bg-clip-text text-transparent mb-2">
            Active Swaps
          </h1>
          <p className="text-sm text-muted">
            Here are your active swaps. You can chat with your swap partner or
            cancel the swap if needed.
          </p>
        </div>
        {activeSwaps && activeSwaps.length > 0 ? (
          <ul className="space-y-4 stagger">
            {activeSwaps.map((swap) => {
              const otherUser =
                swap.swap_requests.sender.id === user.id
                  ? swap.swap_requests.receiver
                  : swap.swap_requests.sender;

              return (
                <Card
                  key={swap.id}
                  className="p-4 border flex items-center justify-between rounded-lg group"
                >
                  <div className="flex items-center gap-4 flex-1 transition-transform duration-300 group-hover:translate-x-1">
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      <Avatar>
                        <AvatarImage
                          src={otherUser.avatar_url || undefined}
                          alt={otherUser.full_name}
                        />
                        <AvatarFallback>
                          {initials(otherUser.full_name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-teal-dark transition-colors">
                        {otherUser.full_name}
                      </p>
                      <div className="flex gap-4 flex-wrap">
                        <p className="text-sm text-muted">
                          📤{" "}
                          <span className="font-medium text-teal-dark">
                            {swap.swap_requests.offered_skill}
                          </span>
                        </p>
                        <p className="text-sm text-muted">
                          📥{" "}
                          <span className="font-medium text-coral">
                            {swap.swap_requests.wanted_skill}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-110">
                    <Link
                      href={`/chat/${swap.id}`}
                      className="p-2 rounded-lg hover:bg-surface transition-all duration-300 hover:shadow-md cursor-pointer text-teal-dark hover:text-teal-dark/80"
                    >
                      <i className="material-symbols-outlined">chat</i>
                    </Link>
                    <button className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-950 transition-all duration-300 hover:shadow-md cursor-pointer text-red-600 hover:text-red-700">
                      <i className="material-symbols-outlined">cancel</i>
                    </button>
                  </div>
                </Card>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-16 animate-fadeIn">
            <i className="material-symbols-outlined text-5xl text-muted/30 block mb-4">
              handshake
            </i>
            <p className="text-muted-foreground">No active swaps found.</p>
            <p className="text-muted text-sm mt-2">
              Start exploring to find your first swap!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default ActiveSwaps;
