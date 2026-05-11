"use client";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar, { AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { BadgeVariant } from "@/types/user";
import { initials } from "@/lib/utils";
import Button from "@/components/ui/Button";

export type SwapUser = {
  full_name: string;
  avatar_url: string | null;
};

export type Swap = {
  id: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  offered_skill: string;
  wanted_skill: string;
  message: string | null;
  status: "pending" | "accepted" | "rejected" | string;
  sender?: SwapUser;
  receiver?: SwapUser;
};

const statusVariant: Record<string, BadgeVariant> = {
  pending: "warning",
  accepted: "success",
  rejected: "info",
};

export function SwapCard({
  swap,
  direction,
  onAccept,
  onCancel,
}: {
  swap: Swap;
  direction: "incoming" | "outgoing";
  onAccept?: () => void;
  onCancel?: () => void;
}) {
  const counterpart = direction === "incoming" ? swap.sender : swap.receiver;
  const label = direction === "incoming" ? "From" : "To";
  const isIncoming = direction === "incoming";

  return (
    <Card className="group overflow-hidden animate-scaleIn">
      {/* Animated gradient accent bar per direction */}
      <div
        className={`h-1 w-full transition-all duration-300 ${
          isIncoming 
            ? "bg-gradient-to-r from-teal-dark via-teal-dark/50 to-transparent group-hover:via-teal-dark" 
            : "bg-gradient-to-r from-coral via-coral/50 to-transparent group-hover:via-coral"
        }`}
      />

      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-1">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <Avatar>
              <AvatarImage
                src={counterpart?.avatar_url ?? undefined}
                alt={counterpart?.full_name}
              />
              <AvatarFallback color={isIncoming ? "teal" : "coral"}>
                {initials(counterpart?.full_name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p
              className={`text-xs font-medium transition-colors ${
                isIncoming ? "text-teal-dark group-hover:text-teal-dark/80" : "text-coral group-hover:text-coral/80"
              }`}
            >
              {label}
            </p>
            <CardTitle className="text-base group-hover:text-teal-dark transition-colors">
              {counterpart?.full_name ?? "Unknown"}
            </CardTitle>
          </div>
        </div>
        <Badge
          variant={statusVariant[swap.status] ?? "warning"}
          className="capitalize animate-fadeIn"
        >
          {swap.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Skill exchange row - animated */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg bg-surface p-3 border border-border transition-all duration-300 group-hover:border-teal-dark/30 group-hover:bg-surface/80">
          <div className="transition-transform duration-300 group-hover:translate-x-1">
            <p className="text-xs text-muted mb-0.5">Offering</p>
            <p className="text-sm font-semibold capitalize text-teal-dark group-hover:text-teal-dark/80 transition-colors">
              {swap.offered_skill}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-125">
            <span className="material-symbols-outlined text-base text-muted">
              swap_horiz
            </span>
          </div>

          <div className="text-right transition-transform duration-300 group-hover:-translate-x-1">
            <p className="text-xs text-muted mb-0.5">Wanting</p>
            <p className="text-sm font-semibold capitalize text-coral group-hover:text-coral/80 transition-colors">
              {swap.wanted_skill}
            </p>
          </div>
        </div>

        {/* Message - animated entrance */}
        {swap.message && (
          <div className="rounded-md border-l-4 border-purple-dark bg-purple-light px-3 py-2 transition-all duration-300 group-hover:border-purple-dark/80 group-hover:shadow-sm animate-slideInLeft">
            <p className="text-sm text-purple-dark italic">"{swap.message}"</p>
          </div>
        )}

        {/* Date and Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center justify-between gap-1.5 text-xs text-muted transition-colors group-hover:text-foreground/70">
            <i className="material-symbols-outlined text-sm">calendar_today</i>
            <time dateTime={swap.created_at}>
              {new Date(swap.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
          <div className="transition-transform duration-300 group-hover:scale-105">
            {direction === "incoming" && swap.status === "pending" && (
              <Button variant="primary" onClick={onAccept || (() => {})}>
                Accept
              </Button>
            )}
            {direction === "outgoing" && swap.status === "pending" && (
              <Button variant="outline" onClick={onCancel || (() => {})}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SwapCard;
