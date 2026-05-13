import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 45 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error?.name === "AbortError") return false;
        if (error?.status && error.status < 500 && error.status !== 429) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});
