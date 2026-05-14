// src/app/(app)/swaps/actions.ts
"use server";

import { requireUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function acceptSwap(swapId: string) {
  const { user, supabase } = await requireUser();

  const { data: currentSwap, error } = await supabase
    .from("swap_requests")
    .update({ status: "accepted" })
    .eq("id", swapId)
    .eq("receiver_id", user.id)
    .select("sender_id, receiver_id")
    .single();

  if (error || !currentSwap) {
    return;
  }

  await supabase.from("active_swaps").insert({
    swap_id: swapId,
    user1_id: currentSwap.sender_id,
    user2_id: currentSwap.receiver_id,
  });

  revalidatePath("/swaps");
}

export async function cancelSwap(swapId: string) {
  const { user, supabase } = await requireUser();
  await supabase
    .from("swap_requests")
    .delete()
    .eq("id", swapId)
    .eq("sender_id", user.id);
  revalidatePath("/swaps");
}
