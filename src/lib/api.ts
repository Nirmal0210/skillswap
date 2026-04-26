type ApiOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
};

type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

export async function apiCall<T>(
  url: string,
  options: ApiOptions = {},
): Promise<ApiResponse<T>> {
  const { method = "GET", body } = options;

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

    const json = await response.json();

    if (!response.ok) {
      return { data: null, error: json.error ?? "Something went wrong" };
    }

    return { data: json, error: null };
  } catch {
    return { data: null, error: "Network error. Please try again." };
  }
}
