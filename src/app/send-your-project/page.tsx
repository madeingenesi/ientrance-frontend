import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, FolderOpenDot } from "lucide-react";

export default function SendYourProject() {
  return (
    <>
      <header className="flex flex-col gap-0">
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 md:pt-32 border-y md:border md:border-t-0">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
            Access the iENTRANCE Infrastructure
          </h1>
          <p className="text-xl md:text-2xl text-[var(--blue-primary)] font-medium tracking-tight">
            Join our community of researchers and innovators
          </p>
        </div>
      </header>
      <main>
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 border-y md:border md:border-t-0">
          <div className="w-full md:w-1/2 md:max-w-3xl mx-auto py-12 flex flex-col gap-8">
            <div className="flex flex-col gap-6 text-2xl">
              <p>
                The iENTRANCE project fosters groundbreaking research by
                providing periodic Open Call for Proposals. These calls offer
                researchers and institutions the opportunity to access our
                state-of-the-art facilities and expertise.
              </p>
              <p>
                iENTRANCE will publish these opportunities through this website
                and our official communication channels, clearly outlining the
                specific research scopes, evaluation criteria, and active windows
                for submission.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
                How to apply
              </h2>
              <div className="flex flex-col gap-6 text-2xl">
                <p>
                  To ensure a high-quality submission, applicants are encouraged
                  to review the comprehensive guidelines provided for each call.
                  Proposals typically require a detailed project abstract, research
                  methodology, and a clear justification for infrastructure access.
                </p>
                <p>
                  The specific guidelines and the application portal can be found
                  in the links below. Please note that the application procedure
                  is fully guided to support you through every step of the
                  submission process.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Button
                asChild
                className="bg-[var(--blue-primary)] text-white cursor-pointer"
              >
                <Link
                  href="https://ientrance.eu/guidelines"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FolderOpenDot className="w-4 h-4" />
                  Go to the Guide
                  <ExternalLink className="w-4 h-4 opacity-80" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[var(--blue-primary)] text-[var(--blue-primary)] cursor-pointer hover:bg-[var(--blue-primary)]/10"
              >
                <Link
                  href="https://aria.ientrance.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to the Application Portal
                  <ExternalLink className="w-4 h-4 opacity-80" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
