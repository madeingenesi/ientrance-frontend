// src/types.ts
export interface PageData {
  id: number;
  title: string;
  slug: string;
  content: string;
  attributes?: Record<string, any>;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  // Add other fields as needed
}

/** Legacy shape; catalog uses `CatalogEquipment` in `helpers/catalogEquipment`. */
export interface Equipment {
  id: number;
  name: string;
  model: string;
  node?: string;
  state?: string;
  /** Contact email(s) from catalog API; string and/or list, possibly delimited by : , ; or whitespace */
  equipmentMainContactInfo?: string | string[];
}

export interface Block {
  id: string;
  type: string;
  content: string;
}
