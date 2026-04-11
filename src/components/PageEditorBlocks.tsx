"use client";

import Link from "next/link";

function renderInline(children: any[] | undefined) {
  if (!children?.length) return null;
  return children.map((child: any, i: number) => {
    if (child.type === "text") {
      return (
        <span key={i} className={child.bold ? "font-bold" : ""}>
          {child.text}
        </span>
      );
    }
    if (child.type === "link") {
      return (
        <Link
          key={i}
          href={child.url || "#"}
          className="text-blue-600 hover:text-blue-800 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderInline(child.children)}
        </Link>
      );
    }
    return null;
  });
}

function renderHeading(block: any, index: number) {
  const level = Math.min(Math.max(block.level || 2, 1), 6);
  const content = renderInline(block.children);
  const base =
    "tracking-tight mt-8 mb-4 scroll-mt-24 text-[var(--blue-primary)]";
  const byLevel: Record<number, string> = {
    1: `text-4xl font-bold ${base}`,
    2: `text-3xl font-semibold ${base}`,
    3: `text-2xl font-semibold ${base}`,
    4: `text-xl font-medium ${base}`,
    5: `text-lg font-medium ${base}`,
    6: `text-base font-medium ${base}`,
  };
  const className = byLevel[level] ?? byLevel[2];
  switch (level) {
    case 1:
      return (
        <h1 key={index} className={className}>
          {content}
        </h1>
      );
    case 2:
      return (
        <h2 key={index} className={className}>
          {content}
        </h2>
      );
    case 3:
      return (
        <h3 key={index} className={className}>
          {content}
        </h3>
      );
    case 4:
      return (
        <h4 key={index} className={className}>
          {content}
        </h4>
      );
    case 5:
      return (
        <h5 key={index} className={className}>
          {content}
        </h5>
      );
    default:
      return (
        <h6 key={index} className={className}>
          {content}
        </h6>
      );
  }
}

function renderBlock(block: any, index: number) {
  if (block.type === "paragraph") {
    const hasContent = block.children?.some(
      (c: any) => typeof c.text === "string" && c.text.trim().length > 0
    );
    if (!hasContent) return null;
    return (
      <p key={index} className="text-lg leading-relaxed mb-4 text-foreground">
        {renderInline(block.children)}
      </p>
    );
  }
  if (block.type === "heading") {
    return renderHeading(block, index);
  }
  if (block.type === "list") {
    const ListTag = block.format === "ordered" ? "ol" : "ul";
    const listClass =
      block.format === "ordered"
        ? "list-decimal pl-6 mb-4 space-y-2"
        : "list-disc pl-6 mb-4 space-y-2";
    const items =
      block.children?.filter((c: any) => c.type === "list-item") ?? [];
    return (
      <ListTag key={index} className={listClass}>
        {items.map((item: any, i: number) => (
          <li key={i} className="text-lg leading-relaxed pl-1">
            {renderInline(item.children)}
          </li>
        ))}
      </ListTag>
    );
  }
  return null;
}

export default function PageEditorBlocks({ blocks }: { blocks: any[] }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }
  return (
    <div className="max-w-4xl mx-auto w-full">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
