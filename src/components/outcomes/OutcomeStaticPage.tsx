import type { ReactNode } from "react";

type OutcomeStaticPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

/**
 * Shared shell for static Outcomes pages (same layout as publications, results, etc.).
 */
export function OutcomeStaticPage({
  title,
  description,
  children,
}: OutcomeStaticPageProps) {
  return (
    <>
      <header className="flex flex-col gap-0">
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 md:pt-32 border-y md:border md:border-t-0">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-600 mt-2">{description}</p>
        </div>
      </header>
      <main>
        <div className="container w-full mx-auto flex flex-col gap-10 p-4 md:p-8 border-y md:border md:border-t-0">
          {children}
        </div>
      </main>
    </>
  );
}
