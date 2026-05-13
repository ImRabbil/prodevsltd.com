/**
 * API client for Pro Devs Ltd. React SPA.
 *
 * Set VITE_API_BASE_URL in your .env file to point to your Laravel backend.
 * Defaults to /api/v1 (same-domain) when the variable is not set.
 */
function normalizeApiBaseUrl(rawBaseUrl) {
  if (!rawBaseUrl) return "/api/v1";

  const trimmed = rawBaseUrl.trim();

  if (trimmed.startsWith("/") || /^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/\/$/, "");
  }

  return `https://${trimmed}`.replace(/\/$/, "");
}

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
const DEFAULT_TIMEOUT_MS = 15000;
const inflightGetRequests = new Map();

export class ApiError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "ApiError";
    this.status = details.status ?? null;
    this.url = details.url ?? "";
    this.body = details.body ?? null;
    this.retryAfter = details.retryAfter ?? null;
  }
}

function delay(ms, signal) {
  if (!ms || ms <= 0) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const timerId = setTimeout(resolve, ms);

    if (!signal) return;

    const onAbort = () => {
      clearTimeout(timerId);
      reject(new DOMException("The operation was aborted.", "AbortError"));
    };

    signal.addEventListener("abort", onAbort, { once: true });
  });
}

function buildRequestSignal(externalSignal, timeoutMs) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort(new DOMException("Request timeout", "AbortError"));
  }, timeoutMs);

  const onAbort = () => {
    controller.abort(
      externalSignal?.reason || new DOMException("The operation was aborted.", "AbortError"),
    );
  };

  if (externalSignal) {
    if (externalSignal.aborted) {
      clearTimeout(timeoutId);
      controller.abort(
        externalSignal.reason ||
          new DOMException("The operation was aborted.", "AbortError"),
      );
    } else {
      externalSignal.addEventListener("abort", onAbort, { once: true });
    }
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timeoutId);
      if (externalSignal) {
        externalSignal.removeEventListener("abort", onAbort);
      }
    },
  };
}

function parseRetryAfter(value) {
  if (!value) return 0;
  const asNumber = Number(value);
  if (Number.isFinite(asNumber)) {
    return Math.max(0, asNumber * 1000);
  }

  const asDate = Date.parse(value);
  if (!Number.isNaN(asDate)) {
    return Math.max(0, asDate - Date.now());
  }

  return 0;
}

async function parseResponseBody(res) {
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return res.json();
  }

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function shouldRetry(method, status, attempt, maxRetries) {
  if (method !== "GET") return false;
  if (attempt >= maxRetries) return false;
  return status === 429 || status >= 500;
}

async function requestWithRetry(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;
  const maxRetries = options.retries ?? 2;
  const url = `${API_BASE_URL}${path}`;

  const fetchOptions = { ...options };
  delete fetchOptions.timeoutMs;
  delete fetchOptions.retries;

  let attempt = 0;

  while (true) {
    const { signal, cleanup } = buildRequestSignal(fetchOptions.signal, timeoutMs);

    try {
      const res = await fetch(url, {
        ...fetchOptions,
        method,
        signal,
        headers: {
          Accept: "application/json",
          ...fetchOptions.headers,
        },
      });

      const body = await parseResponseBody(res);

      if (!res.ok) {
        const retryAfter = parseRetryAfter(res.headers.get("retry-after"));
        const error = new ApiError(`API error ${res.status}: ${url}`, {
          status: res.status,
          url,
          body,
          retryAfter,
        });

        if (shouldRetry(method, res.status, attempt, maxRetries)) {
          attempt += 1;
          await delay(retryAfter || attempt * 500, fetchOptions.signal);
          continue;
        }

        throw error;
      }

      return body;
    } catch (error) {
      if (error?.name === "AbortError") {
        throw error;
      }

      if (method === "GET" && attempt < maxRetries) {
        attempt += 1;
        await delay(attempt * 500, fetchOptions.signal);
        continue;
      }

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(`Network error: ${url}`, { url, body: null });
    } finally {
      cleanup();
    }
  }
}

async function apiFetch(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();

  if (method !== "GET") {
    return requestWithRetry(path, options);
  }

  const key = `${method}:${API_BASE_URL}${path}`;
  const inflight = inflightGetRequests.get(key);
  if (inflight) return inflight;

  const requestPromise = requestWithRetry(path, options).finally(() => {
    inflightGetRequests.delete(key);
  });

  inflightGetRequests.set(key, requestPromise);
  return requestPromise;
}

// ── Settings & static data ──────────────────────────────────────────────────
export const getSetting = (options) => apiFetch("/setting", options);
export const getPageSettings = (options) => apiFetch("/page-settings", options);

// ── Sliders ─────────────────────────────────────────────────────────────────
export const getSliders = (options) => apiFetch("/slider", options);

// ── Services ─────────────────────────────────────────────────────────────────
export const getServices = (options) => apiFetch("/services", options);
export const getServiceDetails = (slug, options) =>
  apiFetch(`/service/${slug}`, options);

// ── Projects ─────────────────────────────────────────────────────────────────
export const getProjects = (params = "", options) =>
  apiFetch(`/projects${params}`, options);

// ── Testimonials & Clients ───────────────────────────────────────────────────
export const getTestimonials = (options) => apiFetch("/testimonials", options);
export const getClients = (options) => apiFetch("/clients", options);

// ── Team ─────────────────────────────────────────────────────────────────────
export const getTeam = (options) => apiFetch("/team", options);

// ── Blogs ────────────────────────────────────────────────────────────────────
export const getBlogs = (options) => apiFetch("/blogs", options);
export const getBlogDetails = (slug, options) => apiFetch(`/blog/${slug}`, options);

// ── Careers ──────────────────────────────────────────────────────────────────
export const getCareers = (options) => apiFetch("/careers", options);
export const getCareerDetails = (slug, options) =>
  apiFetch(`/career/${slug}`, options);

// ── Products & Categories ────────────────────────────────────────────────────
export const getCategories = (options) => apiFetch("/categories", options);
export const getProducts = (categorySlug, options) =>
  apiFetch(`/products/${categorySlug}`, options);
export const getProductDetails = (slug, options) =>
  apiFetch(`/product/${slug}`, options);

// ── Forms (POST) ─────────────────────────────────────────────────────────────
export const postContact = (data, options = {}) =>
  apiFetch("/contact", {
    ...options,
    retries: 0,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options.headers },
    body: JSON.stringify(data),
  });

export const postNewsletter = (data, options = {}) =>
  apiFetch("/newsletter", {
    ...options,
    retries: 0,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options.headers },
    body: JSON.stringify(data),
  });

export const postOrder = (data, options = {}) =>
  apiFetch("/order", {
    ...options,
    retries: 0,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options.headers },
    body: JSON.stringify(data),
  });
