// src/components/ui/Modal.tsx (GENERIC - reusable anywhere)
"use client";

import Button from "./Button";
import Card from "./Card";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitButtonDisabled?: boolean;
  title: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitButtonDisabled = false,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center bg-blur-sm backdrop-blur-xs">
      <Card className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {children}
        <div className="flex justify-between align-center gap-2 mt-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitButtonDisabled}>
            Send Request
          </Button>
        </div>
      </Card>
    </div>
  );
}
