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

export interface Equipment {
  id: number;
  name: string;
  model: string;
  node?: string;
  state?: string;
}

export interface Block {
  id: string;
  type: string;
  content: string;
}
