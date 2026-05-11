"use client";

import { useAlert } from "@/context/AlertContext";
import { AlertType } from "@/lib/constants";

const styles: Record<AlertType, { wrapper: string; icon: string }> = {
  success: {
    wrapper: "bg-gradient-to-r from-teal-50 to-teal-50/70 border-teal-200 text-teal-800 shadow-lg shadow-teal-100/50",
    icon: "bg-teal-100 text-teal-700",
  },
  error: {
    wrapper: "bg-gradient-to-r from-coral-50 to-coral-50/70 border-coral-200 text-coral-800 shadow-lg shadow-coral-100/50",
    icon: "bg-coral-100 text-coral-700",
  },
  info: {
    wrapper: "bg-gradient-to-r from-amber-50 to-amber-50/70 border-amber-200 text-amber-800 shadow-lg shadow-amber-100/50",
    icon: "bg-amber-100 text-amber-700",
  },
  loading: {
    wrapper: "bg-surface border-border text-foreground shadow-lg",
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 animate-slideInLeft">
      <div
        className={`flex items-center gap-3 px-4 py-4 rounded-xl border shadow-xl text-sm backdrop-blur-sm ${style.wrapper} transition-all duration-300 hover:shadow-2xl`}
      >
        {/* Icon */}
        <span
          className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0 ${style.icon} animate-float`}
        >
          {icons[alert.type]}
        </span>

        {/* Message */}
        <span className="flex-1 font-semibold">{alert.message}</span>

        {/* Dismiss */}
        <button
          onClick={clearAlert}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-all duration-200 text-base leading-none hover:scale-110 active:scale-95"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
