//Blocks
import DoubleText from "@/components/blocks/doubleText";
import PageEditorBlocks from "@/components/PageEditorBlocks";

interface BlocksRenderProps {
  block: any;
  index: number;
}

export default function BlocksRender({ block, index }: BlocksRenderProps) {
  switch (block.__component) {
    case "page-components.double-text":
      return <DoubleText block={block} />;
    case "page-components.editor":
      return (
        <section key={index} className="mb-10">
          <PageEditorBlocks blocks={block.text_editor} />
        </section>
      );
    default:
      return null;
  }
}
