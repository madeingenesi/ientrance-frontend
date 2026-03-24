const DELIMITER_SPLIT = /[\s:;,]+/;
const SIMPLE_EMAIL =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function looksLikeEmail(token: string): boolean {
  return SIMPLE_EMAIL.test(token);
}

function splitStringToTokens(value: string): string[] {
  return value
    .split(DELIMITER_SPLIT)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Parses equipmentMainContactInfo from the catalog API: a single email, a delimited string
 * (: , ; whitespace), or an array of such values. Returns deduplicated addresses (case-insensitive).
 */
export function parseEquipmentMainContactEmails(raw: unknown): string[] {
  const pieces: string[] = [];

  if (raw == null) {
    return [];
  }

  if (Array.isArray(raw)) {
    for (const item of raw) {
      if (typeof item === "string") {
        pieces.push(...splitStringToTokens(item));
      }
    }
  } else if (typeof raw === "string") {
    pieces.push(...splitStringToTokens(raw));
  }

  const seen = new Set<string>();
  const out: string[] = [];

  for (const token of pieces) {
    if (!looksLikeEmail(token)) continue;
    const key = token.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(token);
  }

  return out;
}

export function mergeRecipientEmails(
  nodeEmail: string | undefined,
  equipmentContactRaw: unknown
): string[] {
  const fromEquipment = parseEquipmentMainContactEmails(equipmentContactRaw);
  const seen = new Set<string>();
  const out: string[] = [];

  const add = (addr: string | undefined) => {
    if (!addr?.trim()) return;
    const key = addr.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push(addr.trim());
  };

  add(nodeEmail);
  for (const e of fromEquipment) add(e);

  return out;
}
