import React from "react";
import Image from "next/image";
import Link from "next/link";

// Helper function per renderizzare il contenuto degli heading in modo ottimizzato
const renderHeadingContent = (children: any[]) => {
  if (!children || !Array.isArray(children)) {
    return null;
  }

  // Se c'è un solo child di tipo text senza formattazione, renderizza direttamente il testo
  if (children.length === 1 && children[0].type === "text") {
    const child = children[0];
    const hasFormatting = child.bold || child.italic || child.underline;

    if (!hasFormatting) {
      return child.text;
    }
  }

  // Altrimenti, renderizza con gli span per la formattazione
  return children.map((child: any, childIndex: number) => {
    if (child.type === "text") {
      const hasFormatting = child.bold || child.italic || child.underline;

      if (!hasFormatting) {
        return child.text;
      }

      return (
        <span
          key={childIndex}
          className={`${child.bold ? "font-bold" : ""} ${
            child.italic ? "italic" : ""
          } ${child.underline ? "underline" : ""}`}
        >
          {child.text}
        </span>
      );
    }
    return child.text || "";
  });
};

interface DynamicContentRendererProps {
  postContent: any[];
  fallbackImage?: any;
}

// Component for rendering articles.editor
const EditorComponent = ({ component }: { component: any }) => {
  const content = component.SimpleText;

  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className="mb-8">
      {content.map((block: any, index: number) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className="text-lg leading-relaxed mb-4">
              {block.children &&
                Array.isArray(block.children) &&
                block.children.map((child: any, childIndex: number) => {
                  switch (child.type) {
                    case "text":
                      return (
                        <span
                          key={childIndex}
                          className={child.bold ? "font-bold" : ""}
                        >
                          {child.text}
                        </span>
                      );
                    case "link":
                      return (
                        <Link
                          key={childIndex}
                          href={child.url}
                          className="text-blue-600 hover:text-blue-800 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {child.children &&
                            Array.isArray(child.children) &&
                            child.children.map(
                              (linkChild: any, linkChildIndex: number) => (
                                <span
                                  key={linkChildIndex}
                                  className={linkChild.bold ? "font-bold" : ""}
                                >
                                  {linkChild.text}
                                </span>
                              )
                            )}
                        </Link>
                      );
                    default:
                      return null;
                  }
                })}
            </p>
          );
        } else if (block.type === "heading") {
          // Gestione degli heading come blocchi separati
          const headingLevel = Math.min(Math.max(block.level || 1, 1), 6);
          const headingClassName = `${
            headingLevel === 1
              ? "text-4xl font-bold"
              : headingLevel === 2
              ? "text-3xl font-semibold"
              : headingLevel === 3
              ? "text-2xl font-semibold"
              : headingLevel === 4
              ? "text-xl font-medium"
              : headingLevel === 5
              ? "text-lg font-medium"
              : "text-sm font-medium"
          } tracking-tight mt-8 mb-4`;

          const content = renderHeadingContent(block.children);

          // Render del heading appropriato
          switch (headingLevel) {
            case 1:
              return (
                <h1 key={index} className={headingClassName}>
                  {content}
                </h1>
              );
            case 2:
              return (
                <h2 key={index} className={headingClassName}>
                  {content}
                </h2>
              );
            case 3:
              return (
                <h3 key={index} className={headingClassName}>
                  {content}
                </h3>
              );
            case 4:
              return (
                <h4 key={index} className={headingClassName}>
                  {content}
                </h4>
              );
            case 5:
              return (
                <h5 key={index} className={headingClassName}>
                  {content}
                </h5>
              );
            case 6:
            default:
              return (
                <h6 key={index} className={headingClassName}>
                  {content}
                </h6>
              );
          }
        }
        return null;
      })}
    </div>
  );
};

// Component for rendering articles.image
const ArticleImageComponent = ({ component }: { component: any }) => {
  const imageData = component.SingleImage;

  if (!imageData || !imageData.url) {
    return null;
  }

  return (
    <div className="mb-8">
      <Image
        src={imageData.url}
        alt={imageData.alternativeText || imageData.name || "Article image"}
        width={imageData.width || 800}
        height={imageData.height || 400}
        className="w-full h-auto rounded-lg"
      />
      {imageData.caption && (
        <p className="text-sm text-gray-600 mt-2 text-center italic">
          {imageData.caption}
        </p>
      )}
    </div>
  );
};

// Component for rendering text-image blocks
const TextImageComponent = ({ component }: { component: any }) => {
  return (
    <div className="mb-8">
      {component.Content &&
        Array.isArray(component.Content) &&
        component.Content.map((block: any, index: number) => {
          if (block.type === "paragraph") {
            return (
              <p key={index} className="text-lg leading-relaxed mb-4">
                {block.children &&
                  Array.isArray(block.children) &&
                  block.children.map((child: any, childIndex: number) => {
                    switch (child.type) {
                      case "text":
                        return (
                          <span
                            key={childIndex}
                            className={child.bold ? "font-bold" : ""}
                          >
                            {child.text}
                          </span>
                        );
                      case "link":
                        return (
                          <Link
                            key={childIndex}
                            href={child.url}
                            className="text-blue-600 hover:text-blue-800 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {child.children &&
                              Array.isArray(child.children) &&
                              child.children.map(
                                (linkChild: any, linkChildIndex: number) => (
                                  <span
                                    key={linkChildIndex}
                                    className={
                                      linkChild.bold ? "font-bold" : ""
                                    }
                                  >
                                    {linkChild.text}
                                  </span>
                                )
                              )}
                          </Link>
                        );
                      default:
                        return <span key={childIndex}>{child.text || ""}</span>;
                    }
                  })}
              </p>
            );
          } else if (block.type === "heading") {
            // Gestione degli heading come blocchi separati
            const headingLevel = Math.min(Math.max(block.level || 1, 1), 6);
            const headingClassName = `${
              headingLevel === 1
                ? "text-3xl font-bold"
                : headingLevel === 2
                ? "text-2xl font-semibold"
                : headingLevel === 3
                ? "text-xl font-semibold"
                : headingLevel === 4
                ? "text-lg font-medium"
                : headingLevel === 5
                ? "text-base font-medium"
                : "text-sm font-medium"
            } tracking-tight mt-8 mb-4`;

            const content = renderHeadingContent(block.children);

            // Render del heading appropriato
            switch (headingLevel) {
              case 1:
                return (
                  <h1 key={index} className={headingClassName}>
                    {content}
                  </h1>
                );
              case 2:
                return (
                  <h2 key={index} className={headingClassName}>
                    {content}
                  </h2>
                );
              case 3:
                return (
                  <h3 key={index} className={headingClassName}>
                    {content}
                  </h3>
                );
              case 4:
                return (
                  <h4 key={index} className={headingClassName}>
                    {content}
                  </h4>
                );
              case 5:
                return (
                  <h5 key={index} className={headingClassName}>
                    {content}
                  </h5>
                );
              case 6:
              default:
                return (
                  <h6 key={index} className={headingClassName}>
                    {content}
                  </h6>
                );
            }
          }
          return null;
        })}
    </div>
  );
};

// Component for rendering simple images
const SimpleImageComponent = ({
  component,
  fallbackImage,
}: {
  component: any;
  fallbackImage?: any;
}) => {
  // Check for different possible image field names
  const imageData =
    component.Image ||
    component.image ||
    component.Immagine ||
    component.foto ||
    component.picture;

  // Debug: show what fields are available
  console.log(
    "SimpleImageComponent - Available fields:",
    Object.keys(component)
  );
  console.log("SimpleImageComponent - Full component:", component);

  if (imageData && imageData.url) {
    return (
      <div className="mb-8">
        <Image
          src={imageData.url}
          alt={imageData.alternativeText || imageData.name || "Article image"}
          width={imageData.width || 800}
          height={imageData.height || 400}
          className="w-full h-auto rounded-lg"
        />
        {imageData.caption && (
          <p className="text-sm text-gray-600 mt-2 text-center italic">
            {imageData.caption}
          </p>
        )}
      </div>
    );
  }

  // Try fallback image if provided
  if (fallbackImage && fallbackImage.url) {
    return (
      <div className="mb-8">
        <Image
          src={fallbackImage.url}
          alt={
            fallbackImage.alternativeText ||
            fallbackImage.name ||
            "Fallback article image"
          }
          width={fallbackImage.width || 800}
          height={fallbackImage.height || 400}
          className="w-full h-auto rounded-lg opacity-80"
        />
        <p className="text-xs text-gray-400 mt-1 text-center">
          Using article main image (component image not loaded)
        </p>
      </div>
    );
  }

  // Fallback to placeholder if no image data
  return (
    <div className="mb-8">
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-2">
            Simple Image Component (ID: {component.id}) - Image not loaded
          </p>
          <p className="text-xs text-gray-400">
            Available fields: {Object.keys(component).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main renderer component
export default function DynamicContentRenderer({
  postContent,
  fallbackImage,
}: DynamicContentRendererProps) {
  if (!postContent || !Array.isArray(postContent)) {
    return null;
  }

  // Debug: log all component types
  console.log(
    "All components in postContent:",
    postContent.map((c) => c.__component)
  );

  return (
    <div className="dynamic-content">
      {postContent.map((component: any, index: number) => {
        switch (component.__component) {
          case "articles.editor":
            return <EditorComponent key={index} component={component} />;
          case "articles.image":
            return <ArticleImageComponent key={index} component={component} />;
          case "SimpleContent":
          case "componets.text-image":
            return <TextImageComponent key={index} component={component} />;
          case "SimpleImage":
          case "componets.simple-image":
            return (
              <SimpleImageComponent
                key={index}
                component={component}
                fallbackImage={fallbackImage}
              />
            );
          default:
            console.warn(`Unknown component type: ${component.__component}`);
            return null;
        }
      })}
    </div>
  );
}
