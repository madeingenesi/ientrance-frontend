import type { Metadata } from "next";
import Link from "next/link";
import { OutcomeStaticPage } from "@/components/outcomes/OutcomeStaticPage";

export const metadata: Metadata = {
  title: "Contact us | iENTRANCE",
  description:
    "Contact iENTRANCE for general inquiries, node-specific questions, or technical support.",
};

const NODE_CONTACTS = [
  { node: "POLITO", email: "polito@ientrance.eu" },
  { node: "INRIM", email: "inrim@ientrance.eu" },
  { node: "CNR-ISMN", email: "cnr-ismn@ientrance.eu" },
  { node: "UNIBO", email: "unibo@ientrance.eu" },
  { node: "CNR-IMEM", email: "cnr-imem@ientrance.eu" },
  { node: "CNR-NANO", email: "cnr-nano@ientrance.eu" },
  { node: "UNISAP", email: "unisap@ientrance.eu" },
  { node: "ROMA3", email: "roma3@ientrance.eu" },
  { node: "CNR-ISM-RM", email: "cnr-ism-rm@ientrance.eu" },
  { node: "CNR-STEMS", email: "cnr-stems@ientrance.eu" },
  { node: "CNR-IPCB", email: "cnr-ipcb@ientrance.eu" },
  { node: "CNR-ISM-PZ", email: "cnr-ism-pz@ientrance.eu" },
  { node: "CNR-IMM-CT", email: "cnr-imm@ientrance.eu" },
] as const;

function ContactEmail({ email }: { email: string }) {
  return (
    <a
      href={`mailto:${email}`}
      className="text-[var(--blue-primary)] underline underline-offset-2 hover:opacity-80 break-all"
    >
      {email}
    </a>
  );
}

export default function ContactUsPage() {
  return (
    <OutcomeStaticPage
      title="Contact us"
      description="If you require assistance with our services or have a general inquiry, please use the contact details provided below."
    >
      <section className="flex flex-col gap-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          General inquiries
        </h2>
        <p className="text-lg text-gray-700">
          For all general information regarding iENTRANCE, please write to:{" "}
          <ContactEmail email="info@ientrance.eu" />
        </p>
      </section>

      <section className="flex flex-col gap-4 w-full">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          Node-specific questions
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl">
          If your inquiry relates to a specific research node, please contact
          the respective team directly:
        </p>
        <div className="w-full border-y">
          <div className="grid grid-cols-12 border-b py-4 hidden md:grid">
            <div className="col-span-4 text-muted-foreground font-semibold">
              Node
            </div>
            <div className="col-span-8 text-muted-foreground font-semibold">
              Email
            </div>
          </div>
          {NODE_CONTACTS.map(({ node, email }) => (
            <div
              key={node}
              className="grid grid-cols-12 border-b py-4 bg-white hover:bg-muted/50 transition-colors items-start md:items-center gap-1 md:gap-0"
            >
              <div className="col-span-12 md:col-span-4 font-medium text-sm md:text-base">
                {node}
              </div>
              <div className="col-span-12 md:col-span-8 text-sm md:text-base">
                <ContactEmail email={email} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          Technical support
        </h2>
        <p className="text-lg text-gray-700">
          If you need technical assistance for specific instrumentation, please
          use the dedicated form found within our{" "}
          <Link
            href="/catalogue"
            className="text-[var(--blue-primary)] underline underline-offset-2 hover:opacity-80"
          >
            Catalogue
          </Link>
          .
        </p>
        <div className="flex flex-col gap-2 text-lg text-gray-700">
          <p className="font-medium text-gray-900">How to find it:</p>
          <ol className="list-decimal list-inside space-y-2 pl-1">
            <li>
              Select the specific equipment from the Catalogue and click on it.
            </li>
            <li>A menu will open on the right-hand side.</li>
            <li>
              The contact form is located at the bottom of that menu.
            </li>
          </ol>
        </div>
      </section>
    </OutcomeStaticPage>
  );
}
