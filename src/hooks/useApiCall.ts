import { useState } from "react";
import { apiCall } from "@/lib/api";

type Status = "idle" | "loading" | "error" | "success";

type ApiOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
};

export function useApiCall<T>() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = async (url: string, options: ApiOptions = {}) => {
    setStatus("loading");
    setError(null);

    const result = await apiCall<T>(url, options);

    if (result.error) {
      setError(result.error);
      setStatus("error");
      return;
    }

    setData(result.data);
    setStatus("success");
  };

  const reset = () => {
    setStatus("idle");
    setError(null);
    setData(null);
  };

  return {
    execute,
    reset,
    status,
    data,
    error,
    isIdle: status === "idle",
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "success",
  };
}
