// Centralized configuration for API URLs
export const API_CONFIG = {
  // Strapi API URL - uses environment variable with fallback to production
  STRAPI_BASE_URL:
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "https://ambitious-cat-3135f7987e.strapiapp.com",

  // IEntrance API URL - uses environment variable with fallback (public base URL only)
  IENTRANCE_BASE_URL:
    process.env.IENTRANCE_API_URL || "https://ientrance.fablims.com/api",
  /** Server-only. Set in `.env.local` / deployment; never use a public fallback in source. */
  IENTRANCE_API_KEY: process.env.IENTRANCE_API_KEY,
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

export type FetchStrapiOptions = {
  /**
   * When the Strapi instance has no such route or content (404), return an empty
   * payload instead of throwing — avoids console spam when types are not deployed yet.
   */
  allowNotFound?: boolean;
  /** With allowNotFound: collection → `{ data: [] }`, single type → `{ data: null }`. */
  kind?: "collection" | "single";
};

// Helper function for Strapi API calls
export async function fetchFromStrapi<T = any>(
  endpoint: string,
  options?: FetchStrapiOptions
): Promise<T> {
  const base = API_CONFIG.STRAPI_BASE_URL.replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${base}${path}`;
  const response = await fetch(url, createFetchOptions());

  if (response.status === 404 && options?.allowNotFound) {
    const kind = options.kind ?? "collection";
    return (
      kind === "single"
        ? ({ data: null } as T)
        : ({ data: [] } as T)
    );
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Helper function to get image URL from Strapi image field
// Handles multiple Strapi response structures: direct URL, object with url, and nested data.attributes.url
export const getImageUrl = (imageField: any, fallbackUrl?: string): string => {
  // If no image field provided, return fallback or empty string
  if (!imageField) {
    return fallbackUrl || "";
  }

  // Handle direct string URL
  if (typeof imageField === "string") {
    return imageField.startsWith("http")
      ? imageField
      : `${API_CONFIG.STRAPI_BASE_URL}${imageField}`;
  }

  // Handle Strapi v4 structure: data.attributes.url or data.url
  if (imageField.data) {
    const imageData = imageField.data;
    if (Array.isArray(imageData) && imageData.length > 0) {
      // Handle array of images, take the first one
      const firstImage = imageData[0];
      const url = firstImage.attributes?.url || firstImage.url;
      return url
        ? url.startsWith("http")
          ? url
          : `${API_CONFIG.STRAPI_BASE_URL}${url}`
        : fallbackUrl || "";
    } else if (imageData.attributes?.url || imageData.url) {
      // Handle single image object
      const url = imageData.attributes?.url || imageData.url;
      return url.startsWith("http")
        ? url
        : `${API_CONFIG.STRAPI_BASE_URL}${url}`;
    }
  }

  // Handle direct object with url property
  if (imageField.url) {
    return imageField.url.startsWith("http")
      ? imageField.url
      : `${API_CONFIG.STRAPI_BASE_URL}${imageField.url}`;
  }

  // Handle array of image objects (photoGallery style)
  if (Array.isArray(imageField) && imageField.length > 0) {
    const firstImage = imageField[0];
    if (firstImage?.url) {
      return firstImage.url.startsWith("http")
        ? firstImage.url
        : `${API_CONFIG.STRAPI_BASE_URL}${firstImage.url}`;
    }
  }

  // Return fallback if no valid URL found
  return fallbackUrl || "";
};
