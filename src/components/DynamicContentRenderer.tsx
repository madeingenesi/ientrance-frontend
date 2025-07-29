import React from "react";
import Image from "next/image";
import Link from "next/link";

interface DynamicContentRendererProps {
  postContent: any[];
}

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
const SimpleImageComponent = ({ component }: { component: any }) => {
  // For now, we'll show a placeholder since the image data isn't in the JSON
  // In real implementation, this would contain the image data from Strapi
  return (
    <div className="mb-8">
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">
          Simple Image Component (ID: {component.id})
        </p>
      </div>
    </div>
  );
};

// Main renderer component
export default function DynamicContentRenderer({
  postContent,
}: DynamicContentRendererProps) {
  if (!postContent || !Array.isArray(postContent)) {
    return null;
  }

  return (
    <div className="dynamic-content">
      {postContent.map((component: any, index: number) => {
        switch (component.__component) {
          case "componets.text-image":
            return <TextImageComponent key={index} component={component} />;
          case "componets.simple-image":
            return <SimpleImageComponent key={index} component={component} />;
          default:
            console.warn(`Unknown component type: ${component.__component}`);
            return null;
        }
      })}
    </div>
  );
}
