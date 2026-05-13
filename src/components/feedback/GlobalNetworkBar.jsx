import { useIsFetching } from "@tanstack/react-query";

export default function GlobalNetworkBar() {
  const activeRequests = useIsFetching();

  if (!activeRequests) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Loading data"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "3px",
        zIndex: 9999,
        background:
          "linear-gradient(90deg, #fcbb15 0%, #f96d00 40%, #fcbb15 80%)",
        backgroundSize: "200% 100%",
        animation: "networkBarMove 1s linear infinite",
      }}
    />
  );
}
