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
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      {/* Colored top accent bar per direction */}
      <div
        className={`h-1 w-full ${isIncoming ? "bg-teal-dark" : "bg-coral"}`}
      />

      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pt-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarImage
              src={counterpart?.avatar_url ?? undefined}
              alt={counterpart?.full_name}
            />
            <AvatarFallback color={isIncoming ? "teal" : "coral"}>
              {initials(counterpart?.full_name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p
              className={`text-xs font-medium ${isIncoming ? "text-teal-dark" : "text-coral"}`}
            >
              {label}
            </p>
            <CardTitle className="text-base">
              {counterpart?.full_name ?? "Unknown"}
            </CardTitle>
          </div>
        </div>
        <Badge
          variant={statusVariant[swap.status] ?? "warning"}
          className="capitalize"
        >
          {swap.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Skill exchange row */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg bg-surface p-3 border border-border">
          <div>
            <p className="text-xs text-muted mb-0.5">Offering</p>
            <p className="text-sm font-semibold capitalize text-teal-dark">
              {swap.offered_skill}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-base text-muted">
              swap_horiz
            </span>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted mb-0.5">Wanting</p>
            <p className="text-sm font-semibold capitalize text-coral">
              {swap.wanted_skill}
            </p>
          </div>
        </div>

        {/* Message */}
        {swap.message && (
          <div className="rounded-md border-l-2 border-purple-dark bg-purple-light px-3 py-2">
            <p className="text-sm text-purple-dark italic">"{swap.message}"</p>
          </div>
        )}

        {/* Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-1.5 text-xs text-muted">
            <i className="material-symbols-outlined text-sm">calendar_today</i>
            <time dateTime={swap.created_at}>
              {new Date(swap.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
          <div>
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
