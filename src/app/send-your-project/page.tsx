import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FolderOpenDot } from "lucide-react";

export default function SendYourProject() {
  return (
    <>
      <header className="flex flex-col gap-0">
        {/* <div className="w-full border-b p-4 px-8">
          <BrowserRouter>
            <DynamicBreadcrumb />
          </BrowserRouter>
        </div> */}
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 md:pt-32 border-y md:border md:border-t-0">
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
            Send your project
          </h1>
        </div>
      </header>
      <main className="">
        <div className="container w-full mx-auto flex flex-col gap-2 p-4 md:p-8 border-y md:border md:border-t-0">
          <div className="w-full md:w-1/2 md:max-w-3xl mx-auto py-12">
            <p className="text-2xl">
              iENTRANCE will publish open calls through its official website and
              other relevant communication channels. Each call will clearly
              outline the scope, key focus areas, and application deadlines.
              Comprehensive information, including access policies and specific
              guidelines, will be made available on the dedicated application
              portal to ensure transparency and support for potential
              applicants.
            </p>
            <p className="text-2xl">
              Applicants are required to submit their proposals downloading the
              submission{" "}
              <Link href="https://ambitious-cat-3135f7987e.media.strapiapp.com/i_E_form_proposal_a6e0ca1d58.docx">
                <span className="text-[var(--blue-primary)] underline font-semibold">
                  form
                </span>
              </Link>{" "}
              and send it to{" "}
              <Link href="mailto:submission@ientrance.eu">
                <span className="text-[var(--blue-primary)] underline font-semibold">
                  submission@ientrance.eu
                </span>
              </Link>
            </p>
            <p className="text-2xl">
              The submission form will request detailed information such as the
              project title and abstract, research objectives and methodology, a
              clear justification for requesting infrastructure access, expected
              outcomes and their potential impact, required resources and
              facilities, as well as the applicant's qualifications and relevant
              experience. It is strongly recommended that applicants consult the
              provided application guidelines to ensure their submission meets
              all necessary criteria.
            </p>
            <Link href="/come-in#guide">
              <Button className="bg-[var(--blue-primary)] text-white cursor-pointer">
                <FolderOpenDot className="w-4 h-4" />
                Go to the Guide
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
