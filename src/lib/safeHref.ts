const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * Valida un href proveniente dal CMS: consente http(s), mailto, tel,
 * percorsi relativi ("/...") e ancore ("#..."). Negli altri casi
 * (es. javascript:, data:) restituisce undefined.
 */
export function safeHref(url: unknown): string | undefined {
  if (typeof url !== "string") return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;

  if (trimmed.startsWith("#")) return trimmed;
  if (trimmed.startsWith("/")) {
    // "//host" e "/\host" verrebbero interpretati come URL esterni
    return trimmed.startsWith("//") || trimmed.startsWith("/\\")
      ? undefined
      : trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    return ALLOWED_PROTOCOLS.has(parsed.protocol) ? trimmed : undefined;
  } catch {
    return undefined;
  }
}
