import { Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function InfoButtonHeader(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <div {...props}>
        <Info
          onClick={() => setIsDialogOpen(true)}
          className="w-6 h-6 text-[var(--blue-primary)]"
        />
      </div>
      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white p-4 md:p-16 w-full max-w-2xl mx-4 relative splash flex flex-col gap-4">
            <h2 className="text-2xl mb-4 text-black font-semibold">Info</h2>

            <p className="leading-relaxed !text-sm md:text-base max-h-[300px] md:h-auto overflow-y-auto pr-4 md:pr-0 text-black font-normal">
              A research infrastructure provides access to advanced scientific
              instruments, valuable resources, and outstanding expertise to
              support the scientific community and all potential innovators,
              from both public and private sectors. It stands as a fundamental
              engine for frontier research and the overall innovation strategy,
              facilitating discovery and the development of new solutions for
              societal benefit.
            </p>

            <Button
              variant="default"
              className="self-end"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
