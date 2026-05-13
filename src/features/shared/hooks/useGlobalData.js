import { useQuery } from "@tanstack/react-query";
import { getCategories, getServices, getSetting } from "../../../api/client";

export function useGlobalData() {
  return useQuery({
    queryKey: ["global-data"],
    staleTime: 10 * 60 * 1000,
    queryFn: async ({ signal }) => {
      const [settingRes, serviceRes, categoryRes] = await Promise.all([
        getSetting({ signal }),
        getServices({ signal }),
        getCategories({ signal }),
      ]);

      return {
        setting: settingRes ?? null,
        services: serviceRes?.data ?? serviceRes ?? [],
        categories: categoryRes?.data ?? categoryRes ?? [],
      };
    },
  });
}
