import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
  const { user } = await requireUser();

  const { action } = await request.json();

  if (!["accept", "decline"].includes(action)) {
    return new Response("Invalid action", { status: 400 });
  }

  const { error } = await supabase
    .from("swap_requests")
    .update({
      status: action === "accept" ? "accepted" : "declined",
    })
    .eq("id", id)
    .eq("receiver_id", user.id);

  if (error) {
    return new Response(error.message, { status: 500 });
  }
  return new Response("Swap request updated", { status: 200 });
}
