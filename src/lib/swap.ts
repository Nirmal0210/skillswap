// src/app/(app)/swaps/actions.ts
"use server";

import { requireUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function acceptSwap(swapId: string) {
  const { user, supabase } = await requireUser();
  await supabase
    .from("swap_requests")
    .update({ status: "accepted" })
    .eq("id", swapId)
    .eq("receiver_id", user.id);
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
