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
