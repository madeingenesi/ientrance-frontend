import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonProps = {
  text: string;
  href?: string;
};

export const PrimaryButton = ({ text, href }: ButtonProps) => {
  return (
    <a href={href} className="bg-[var(--blue-primary)] splashMiniXS p-[1px]">
      <span className="bg-white splashMiniXS p-4">
        <span className="text-2xl font-medium">{text}</span>
      </span>
    </a>
  );
};
