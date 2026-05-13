const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api/v1";

export function assetUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const base = API_BASE_URL.replace("/api/v1", "").replace(/\/api.*/, "");
  return `${base}/${path.replace(/^\/+/, "")}`;
}
