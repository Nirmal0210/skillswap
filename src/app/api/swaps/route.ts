import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { user } = await requireUser();

  const { target_user, offered_skill, wanted_skill } = await request.json();

  const { error } = await supabase.from("swap_requests").insert({
    sender_id: user.id,
    receiver_id: target_user,
    offered_skill,
    wanted_skill,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Swap request created" },
    { status: 201 },
  );
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { user } = await requireUser();
  const { data, error } = await supabase
    .from("swap_requests")
    .select(`*,sender:profiles!sender_id(full_name,avatar_url)`)
    .eq("receiver_id", user.id)
    .eq("status", "pending");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(
    {
      message: "Pending swap requests retrieved successfully",
      swapRequests: data,
    },
    { status: 200 },
  );
}
