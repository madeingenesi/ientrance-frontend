import { fetchFromStrapi } from "@/lib/config";

/** Slate inline → plain (links become visible URL in parens) */
function inlinePlainText(children: any[] | undefined): string {
  if (!children?.length) return "";
  return children
    .map((c) => {
      if (c.type === "text" && c.text) return c.text;
      if (c.type === "link" && c.children) return inlinePlainText(c.children);
      return "";
    })
    .join("");
}

function listToStrings(listBlock: any): string[] {
  return (
    listBlock.children
      ?.filter((c: any) => c.type === "list-item")
      .map((c: any) => inlinePlainText(c.children).trim()) ?? []
  ).filter(Boolean);
}

export type TabContentItem = {
  type: "paragraph" | "subtitle" | "list";
  text?: string;
  items?: string[];
};

export type GuideTabSection = {
  id: string;
  number: string;
  title: string;
  content: string | TabContentItem[];
};

function slugifyId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function blockToTabItem(block: any): TabContentItem | null {
  if (block.type === "list") {
    const items = listToStrings(block);
    if (items.length === 0) return null;
    return { type: "list", items };
  }
  if (block.type === "paragraph") {
    const ch = block.children;
    if (!ch?.length) return null;
    if (
      ch.length === 1 &&
      ch[0].type === "text" &&
      ch[0].bold &&
      (ch[0].text || "").trim()
    ) {
      return { type: "subtitle", text: ch[0].text.trim() };
    }
    const t = inlinePlainText(ch).trim();
    if (!t) return null;
    return { type: "paragraph", text: t };
  }
  return null;
}

function nodesToTabContent(nodes: any[]): TabContentItem[] {
  const out: TabContentItem[] = [];
  for (const block of nodes) {
    const item = blockToTabItem(block);
    if (item) out.push(item);
  }
  return out;
}

function splitByH2(
  textEditor: any[] | undefined
): { title: string; nodes: any[] }[] {
  if (!textEditor?.length) return [];
  const sections: { title: string; nodes: any[] }[] = [];
  for (const block of textEditor) {
    if (block.type === "heading" && block.level === 2) {
      const title = inlinePlainText(block.children).trim() || "Section";
      sections.push({ title, nodes: [] });
    } else if (sections.length > 0) {
      sections[sections.length - 1].nodes.push(block);
    }
  }
  return sections;
}

type StrapiPageEntry = {
  Titolo?: string;
  Sottotitolo?: string | null;
  Blocks?: any[];
};

export type ComeInGuidelinesData = {
  introTitle: string;
  introBody: string;
  tabSections: GuideTabSection[];
};

export function buildGuideSectionsFromStrapi(
  page: StrapiPageEntry | null
): ComeInGuidelinesData {
  const editorBlock = page?.Blocks?.find(
    (b: any) => b?.__component === "page-components.editor"
  );
  const textEditor = editorBlock?.text_editor as any[] | undefined;
  const h2Groups = splitByH2(textEditor);
  if (h2Groups.length === 0) {
    return {
      introTitle: "Access the iENTRANCE infrastructure",
      introBody: "",
      tabSections: [],
    };
  }
  const [first, ...rest] = h2Groups;
  const introParas = first.nodes
    .filter((n: any) => n.type === "paragraph")
    .map((n: any) => inlinePlainText(n.children).trim())
    .filter(Boolean);
  const introBody = introParas.join(" ");

  const tabSections: GuideTabSection[] = rest.map((g, i) => ({
    id: slugifyId(g.title),
    number: String(i + 1),
    title: g.title,
    content: nodesToTabContent(g.nodes),
  }));

  return {
    introTitle: first.title,
    introBody,
    tabSections,
  };
}

type FaqItem = { title: string; content: string };

function splitFaqByH3(textEditor: any[] | undefined): FaqItem[] {
  if (!textEditor?.length) return [];
  const items: FaqItem[] = [];
  let current: FaqItem | null = null;
  const appendParagraph = (t: string) => {
    if (!current) return;
    if (!t) return;
    if (current.content) current.content += "\n\n" + t;
    else current.content = t;
  };
  const appendList = (listBlock: any) => {
    if (!current) return;
    const lines = listToStrings(listBlock).map((s) => `• ${s}`);
    if (lines.length === 0) return;
    const block = lines.join("\n");
    if (current.content) current.content += "\n\n" + block;
    else current.content = block;
  };
  for (const block of textEditor) {
    if (block.type === "heading" && (block.level === 3 || block.level === 2)) {
      const title = inlinePlainText(block.children).trim();
      if (title) {
        if (current) items.push(current);
        current = { title, content: "" };
      }
    } else if (current) {
      if (block.type === "paragraph") {
        appendParagraph(inlinePlainText(block.children).trim());
      } else if (block.type === "list") {
        appendList(block);
      }
    }
  }
  if (current) items.push(current);
  return items;
}

export type ComeInFaqData = {
  subtitle: string;
  items: FaqItem[];
};

export function buildFaqDataFromStrapi(
  page: StrapiPageEntry | null
): ComeInFaqData {
  const editorBlock = page?.Blocks?.find(
    (b: any) => b?.__component === "page-components.editor"
  );
  const textEditor = editorBlock?.text_editor as any[] | undefined;
  const items = splitFaqByH3(textEditor);
  const subtitle =
    (page?.Sottotitolo && page.Sottotitolo.trim()) ||
    "Clear answers to common questions on access, application procedures, and the iENTRANCE infrastructure.";
  return { subtitle, items };
}

// ---- Strapi fetches (same source as /guidelines and /faq) ----

type StrapiPagesResponse = { data: StrapiPageEntry[] };

export async function fetchGuidelinesPageForComeIn() {
  const res = await fetchFromStrapi<StrapiPagesResponse>(
    "/api/pages?filters[Titolo][$eq]=Guidelines&populate=*",
    { allowNotFound: true, kind: "collection" }
  );
  return res?.data?.[0] ?? null;
}

export async function loadFaqPageForComeIn(): Promise<StrapiPageEntry | null> {
  const tryQueries = [
    () =>
      fetchFromStrapi<StrapiPagesResponse>(
        "/api/pages?filters[Slug][$eq]=faq&populate=*",
        { allowNotFound: true, kind: "collection" }
      ),
    () =>
      fetchFromStrapi<StrapiPagesResponse>(
        "/api/pages?filters[Slug][$eq]=FAQ&populate=*",
        { allowNotFound: true, kind: "collection" }
      ),
    () =>
      fetchFromStrapi<StrapiPagesResponse>(
        "/api/pages?filters[Titolo][$eq]=FAQ&populate=*",
        { allowNotFound: true, kind: "collection" }
      ),
    () =>
      fetchFromStrapi<StrapiPagesResponse>(
        "/api/pages?filters[Titolo][$eq]=Faq&populate=*",
        { allowNotFound: true, kind: "collection" }
      ),
  ];
  for (const t of tryQueries) {
    const r = await t();
    if (r?.data?.[0]) return r.data[0];
  }
  return null;
}
