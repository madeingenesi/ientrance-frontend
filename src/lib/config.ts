// Centralized configuration for API URLs
export const API_CONFIG = {
  // Strapi API URL - uses environment variable with fallback to production
  STRAPI_BASE_URL:
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://ambitious-cat-3135f7987e.strapiapp.com",

  // IEntrance API URL - uses environment variable with fallback
  IENTRANCE_BASE_URL:
    process.env.IENTRANCE_API_URL || "https://ientrance.fablims.com/api",
  IENTRANCE_API_KEY:
    process.env.IENTRANCE_API_KEY || "2afdf943-a8b6-444d-9689-6ec4006df42c",
};

// Helper function to create fetch options with common headers
export const createFetchOptions = (
  additionalHeaders: Record<string, string> = {}
) => ({
  cache: "no-store" as RequestCache,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...additionalHeaders,
  },
});

// Helper function for Strapi API calls
export const fetchFromStrapi = async (endpoint: string) => {
  const url = `${API_CONFIG.STRAPI_BASE_URL}${endpoint}`;
  const response = await fetch(url, createFetchOptions());

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
