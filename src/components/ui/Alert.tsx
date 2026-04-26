"use client";

import { useAlert } from "@/context/AlertContext";
import { AlertType } from "@/lib/constants";

const styles: Record<AlertType, { wrapper: string; icon: string }> = {
  success: {
    wrapper: "bg-teal-50 border-teal-200 text-teal-800",
    icon: "bg-teal-100 text-teal-700",
  },
  error: {
    wrapper: "bg-coral-50 border-coral-200 text-coral-800",
    icon: "bg-coral-100 text-coral-700",
  },
  info: {
    wrapper: "bg-amber-50 border-amber-200 text-amber-800",
    icon: "bg-amber-100 text-amber-700",
  },
  loading: {
    wrapper: "bg-surface border-border text-foreground",
    icon: "bg-surface text-foreground",
  },
};

const icons: Record<AlertType, string> = {
  success: "✓",
  error: "✕",
  info: "i",
  loading: "⏳",
};

export default function Alert() {
  const { alert, clearAlert } = useAlert();

  if (!alert) return null;

  const style = styles[alert.type];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-sm text-sm ${style.wrapper}`}
      >
        {/* Icon */}
        <span
          className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold flex-shrink-0 ${style.icon}`}
        >
          {icons[alert.type]}
        </span>

        {/* Message */}
        <span className="flex-1 font-medium">{alert.message}</span>

        {/* Dismiss */}
        <button
          onClick={clearAlert}
          className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity text-base leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
