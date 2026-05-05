"use client";
import { acceptSwap, cancelSwap } from "@/lib/swap";
import SwapCard, { type Swap } from "./SwapCard";

export default function SwapTabs({
  incoming,
  outgoing,
}: {
  incoming: Swap[];
  outgoing: Swap[];
}) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-xl font-semibold">Incoming Swap Requests</h2>
        {incoming.length === 0 ? (
          <p className="text-muted-foreground">No incoming swap requests.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {incoming.map((swap) => (
              <SwapCard
                key={swap.id}
                swap={swap}
                direction="incoming"
                onAccept={() => acceptSwap(swap.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Outgoing Swap Requests</h2>
        {outgoing.length === 0 ? (
          <p className="text-muted-foreground">No outgoing swap requests.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {outgoing.map((swap) => (
              <SwapCard
                key={swap.id}
                swap={swap}
                direction="outgoing"
                onCancel={() => cancelSwap(swap.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
