import { useQuery } from "@tanstack/react-query";
import { getServiceDetails } from "../../../api/client";

export function useServiceDetails(slug) {
  return useQuery({
    queryKey: ["service", slug],
    enabled: !!slug,
    queryFn: ({ signal }) => getServiceDetails(slug, { signal }),
  });
}
