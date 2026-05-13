import { useQuery } from "@tanstack/react-query";
import {
  getClients,
  getProjects,
  getSliders,
  getTestimonials,
} from "../../../api/client";

export function useHomeData() {
  return useQuery({
    queryKey: ["home-data"],
    staleTime: 5 * 60 * 1000,
    queryFn: async ({ signal }) => {
      const [sliderRes, projectRes, testimonialRes, clientRes] =
        await Promise.all([
          getSliders({ signal }),
          getProjects("", { signal }),
          getTestimonials({ signal }),
          getClients({ signal }),
        ]);

      return {
        sliders: sliderRes?.data ?? [],
        projects: projectRes?.data ?? [],
        testimonials: testimonialRes?.data ?? testimonialRes ?? [],
        clients: clientRes?.data ?? [],
      };
    },
  });
}
