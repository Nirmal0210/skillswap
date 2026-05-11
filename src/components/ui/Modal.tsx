// src/components/ui/Modal.tsx (GENERIC - reusable anywhere)
"use client";

import Button from "./Button";
import Card from "./Card";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  disabled = false,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-50 animate-fadeIn">
      <Card 
        className="bg-background rounded-xl p-6 w-96 shadow-2xl border border-border/50 animate-scaleIn"
        animated={false}
      >
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-teal-dark to-coral bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="mb-6">
          {children}
        </div>
        <div className="flex justify-between gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onSubmit} disabled={disabled}>
            Send Request
          </Button>
        </div>
      </Card>
    </div>
  );
}
