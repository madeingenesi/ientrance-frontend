import { useState } from "react";

//Blocks
import DoubleText from "@/components/blocks/doubleText";

interface BlocksRenderProps {
  block: any;
  index: number;
}

export default function BlocksRender({ block, index }: BlocksRenderProps) {
  const [currentBlock, setCurrentBlock] = useState(block);

  switch (currentBlock.__component) {
    case "page-components.double-text":
      return <DoubleText block={currentBlock} />;
    default:
      return null;
  }
}
