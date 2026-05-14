"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAlert } from "@/context/AlertContext";
import { ALERT_TYPES } from "@/lib/constants";

interface Message {
  id: string;
  swap_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export function useChat(swapId: string, currentUserId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []); // stable reference
  const { setAlert } = useAlert();
  // 1. Fetch existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("swap_id", swapId)
        .order("created_at", { ascending: true });

      if (error) {
        setAlert(ALERT_TYPES.ERROR, "Failed to load messages.");
      } else {
        setMessages(data as Message[]);
      }
      setLoading(false);
    };

    fetchMessages();
  }, [swapId, supabase]);

  // 2. Subscribe to realtime + 3. cleanup — together in one useEffect
  useEffect(() => {
    const channel = supabase
      .channel(`chat_swap_${swapId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `swap_id=eq.${swapId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        },
      )
      .subscribe((status) => {});
    return () => {
      supabase.removeChannel(channel);
    };
  }, [swapId, supabase]);

  // 4. Send message
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Debug: check what session looks like
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("messages").insert({
      swap_id: swapId,
      sender_id: currentUserId,
      content,
    });
    if (error) {
      setAlert(ALERT_TYPES.ERROR, "Failed to send message.");
    } else {
      setAlert(ALERT_TYPES.SUCCESS, "Message sent!");
    }
  };
  return { messages, loading, sendMessage };
}
