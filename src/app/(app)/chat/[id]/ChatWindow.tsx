"use client";

import { useChat } from "@/hooks/useChat";
import { useRef, useState, useEffect } from "react";
import Avatar, { AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { initials } from "@/lib/utils";

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
}

interface ChatWindowProps {
  swapId: string;
  currentUserId: string;
  partner: Profile;
}

export default function ChatWindow({
  swapId,
  currentUserId,
  partner,
}: ChatWindowProps) {
  const { messages, loading, sendMessage } = useChat(swapId, currentUserId);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue.trim());
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-b from-background to-surface rounded-2xl overflow-hidden shadow-lg border border-border/50 h-96">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-dark/10 to-coral/10 border-b border-border/50 px-6 py-3 flex items-center gap-4 backdrop-blur-sm flex-shrink-0">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={partner.avatar_url || undefined}
            alt={partner.full_name}
          />
          <AvatarFallback className="text-xs font-semibold">
            {initials(partner.full_name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-base font-bold text-foreground">
            {partner.full_name}
          </h2>
          <p className="text-xs text-muted">Skill swap partner</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-muted">Online</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gradient-to-b from-transparent to-surface/50 min-h-0">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="space-y-2 text-center">
              <div className="flex justify-center gap-1">
                <div className="w-2 h-2 bg-teal-dark rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-coral rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-teal-dark rounded-full animate-bounce delay-200" />
              </div>
              <p className="text-xs text-muted">Loading messages...</p>
            </div>
          </div>
        ) : messages.length ? (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender_id === currentUserId ? "justify-end" : "justify-start"
                } animate-fadeInUp`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl shadow-sm ${
                    msg.sender_id === currentUserId
                      ? "bg-gradient-to-br from-teal-dark to-teal-dark/80 text-white rounded-br-none"
                      : "bg-surface border border-border/50 text-foreground rounded-bl-none"
                  } break-words`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender_id === currentUserId
                        ? "text-white/70"
                        : "text-muted"
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-dark/10 to-coral/10 flex items-center justify-center">
              <i className="material-symbols-outlined text-2xl text-muted">
                chat_bubble_outline
              </i>
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                No messages yet
              </p>
              <p className="text-xs text-muted mt-0.5">
                Start the conversation with {partner.full_name}!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border/50 bg-surface px-6 py-3 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-background border border-border/50 rounded-2xl px-5 py-2 pr-12 text-sm placeholder-muted focus:outline-none focus:ring-2 focus:ring-teal-dark/50 focus:border-transparent transition-all duration-200"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-dark/10 active:scale-95"
              title="Send message"
            >
              <i className="material-symbols-outlined text-teal-dark text-lg">
                send
              </i>
            </button>
          </div>
        </div>
        <p className="text-xs text-muted mt-1">
          Press <kbd className="bg-surface/50 px-1 py-0.5 rounded border border-border/50 text-xs">Enter</kbd> to send
        </p>
      </div>
    </div>
  );
}
