"use client";

import { AlertType } from "@/lib/constants";
import { createContext, useContext, useState } from "react";

// Types

type Alert = {
  type: AlertType;
  message: string;
} | null;

type AlertContextType = {
  alert: Alert;
  setAlert: (type: AlertType, message: string) => void;
  clearAlert: () => void;
};

// Context
const AlertContext = createContext<AlertContextType | null>(null);

// Provider
export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlertState] = useState<Alert>(null);

  const setAlert = (type: AlertType, message: string) => {
    setAlertState({ type, message });
    setTimeout(() => setAlertState(null), 3000);
  };

  const clearAlert = () => setAlertState(null);

  return (
    <AlertContext.Provider value={{ alert, setAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// Hook
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
