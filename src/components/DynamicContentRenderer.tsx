import React from "react";
import Image from "next/image";
import Link from "next/link";

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
        }
        return null;
      })}
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
