/**
 * Fablims catalog-equipment2 shape: techniques live in `equipmentTechniques[]`
 * instead of the legacy `techniqueName` string ("Main > Sub").
 */

export interface EquipmentTechnique {
  id?: number;
  name?: string;
  genericEquipmentName?: string;
  mainCategory?: string | null;
  subCategory?: string | null;
}

export interface CatalogEquipment {
  id: number;
  tenantName?: string | null;
  name?: string | null;
  description?: string | null;
  productModel?: string | null;
  manufacturer?: string | null;
  equipmentStatus?: string | null;
  equipmentLaboratoryName?: string | null;
  equipmentMainContactInfo?: string | string[] | null;
  equipmentTechniques?: EquipmentTechnique[] | null;
  /** @deprecated Old API; still supported as fallback when present */
  techniqueName?: string | null;
}

export function getEquipmentTechniques(m: CatalogEquipment): EquipmentTechnique[] {
  const t = m.equipmentTechniques;
  if (!Array.isArray(t) || t.length === 0) return [];
  return t;
}

export function getPrimaryTechnique(m: CatalogEquipment): EquipmentTechnique | null {
  const techniques = getEquipmentTechniques(m);
  return techniques[0] ?? null;
}

/** Labels for all techniques on an instrument (for filters / stats). */
export function collectTechniqueLabels(m: CatalogEquipment): string[] {
  const techniques = getEquipmentTechniques(m);
  if (techniques.length === 0 && m.techniqueName) {
    const parts = m.techniqueName.split(">", 2);
    const second = parts[1]?.trim();
    const first = parts[0]?.trim();
    if (second) return [second];
    if (first) return [first];
    return [];
  }
  return techniques
    .map((t) => formatSingleTechniqueLabel(t))
    .filter((s): s is string => Boolean(s));
}

function formatSingleTechniqueLabel(t: EquipmentTechnique): string {
  const sub = t.subCategory?.trim() || "";
  const name = t.name?.trim() || "";
  if (sub && name && sub !== name) return `${sub} (${name})`;
  return sub || name || "";
}

/** Main category column + filters (primary technique, else legacy string). */
export function getEquipmentMainCategory(m: CatalogEquipment): string {
  const p = getPrimaryTechnique(m);
  const fromApi = p?.mainCategory?.trim();
  if (fromApi) return fromApi;
  if (m.techniqueName) {
    const parts = m.techniqueName.split(">", 2);
    const first = parts[0]?.trim();
    if (first) return first;
  }
  return "—";
}

/** Technique column + sheet subtitle (primary technique). */
export function getEquipmentTechniqueLabel(m: CatalogEquipment): string {
  const techniques = getEquipmentTechniques(m);
  if (techniques.length > 0) {
    const label = formatSingleTechniqueLabel(techniques[0]);
    if (label) return label;
  }
  if (m.techniqueName) {
    const parts = m.techniqueName.split(">", 2);
    return parts[1]?.trim() || parts[0]?.trim() || "—";
  }
  return "—";
}

export function collectMainCategories(m: CatalogEquipment): string[] {
  const techniques = getEquipmentTechniques(m);
  const out: string[] = [];
  for (const t of techniques) {
    const c = t.mainCategory?.trim();
    if (c) out.push(c);
  }
  if (out.length === 0 && m.techniqueName) {
    const parts = m.techniqueName.split(">", 2);
    const first = parts[0]?.trim();
    if (first) out.push(first);
  }
  return out;
}

/** Lowercase blob for search + multi-select filter matching. */
export function getEquipmentSearchHaystack(m: CatalogEquipment): string {
  const parts: string[] = [
    m.tenantName ?? "",
    m.name ?? "",
    m.productModel ?? "",
    m.manufacturer ?? "",
    m.description ?? "",
    m.techniqueName ?? "",
  ];
  for (const t of getEquipmentTechniques(m)) {
    parts.push(
      t.mainCategory ?? "",
      t.subCategory ?? "",
      t.name ?? "",
      t.genericEquipmentName ?? ""
    );
  }
  return parts.filter(Boolean).join(" ").toLowerCase();
}

export function normalizeCatalogEquipmentList(payload: unknown): CatalogEquipment[] {
  if (Array.isArray(payload)) {
    return payload as CatalogEquipment[];
  }
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray((payload as { data: unknown }).data)
  ) {
    return (payload as { data: CatalogEquipment[] }).data;
  }
  return [];
}
