/**
 * API client for Pro Devs Ltd. React SPA.
 *
 * Set VITE_API_BASE_URL in your .env file to point to your Laravel backend.
 * Defaults to /api/v1 (same-domain) when the variable is not set.
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "/api/v1";

async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${url}`);
  }
  return res.json();
}

// ── Settings & static data ──────────────────────────────────────────────────
export const getSetting = () => apiFetch("/setting");
export const getPageSettings = () => apiFetch("/page-settings");

// ── Sliders ─────────────────────────────────────────────────────────────────
export const getSliders = () => apiFetch("/slider");

// ── Services ─────────────────────────────────────────────────────────────────
export const getServices = () => apiFetch("/services");
export const getServiceDetails = (slug) => apiFetch(`/service/${slug}`);

// ── Projects ─────────────────────────────────────────────────────────────────
export const getProjects = (params = "") => apiFetch(`/projects${params}`);

// ── Testimonials & Clients ───────────────────────────────────────────────────
export const getTestimonials = () => apiFetch("/testimonials");
export const getClients = () => apiFetch("/clients");

// ── Team ─────────────────────────────────────────────────────────────────────
export const getTeam = () => apiFetch("/team");

// ── Blogs ────────────────────────────────────────────────────────────────────
export const getBlogs = () => apiFetch("/blogs");
export const getBlogDetails = (slug) => apiFetch(`/blog/${slug}`);

// ── Careers ──────────────────────────────────────────────────────────────────
export const getCareers = () => apiFetch("/careers");
export const getCareerDetails = (slug) => apiFetch(`/career/${slug}`);

// ── Products & Categories ────────────────────────────────────────────────────
export const getCategories = () => apiFetch("/categories");
export const getProducts = (categorySlug) =>
  apiFetch(`/products/${categorySlug}`);
export const getProductDetails = (slug) => apiFetch(`/product/${slug}`);

// ── Forms (POST) ─────────────────────────────────────────────────────────────
export const postContact = (data) =>
  apiFetch("/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const postNewsletter = (data) =>
  apiFetch("/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const postOrder = (data) =>
  apiFetch("/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
