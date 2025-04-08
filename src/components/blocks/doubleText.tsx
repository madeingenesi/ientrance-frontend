interface BlockText {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

interface DoubleTextProps {
  block: {
    TestoInEvidenza: BlockText[];
    Contenuto: BlockText[];
  };
}

export default function DoubleText({ block }: DoubleTextProps) {
  return (
    <section className="container w-full mx-auto flex flex-col md:flex-row gap-12 p-12">
      <div className="w-full md:w-1/2">
        <div className="sticky top-10">
          {block.TestoInEvidenza.map((item, index) => (
            <p
              key={index}
              className="mb-4 text-2xl font-medium tracking-tighter"
            >
              {item.children.map((child, childIndex) => child.text)}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2">
        {block.Contenuto.map((item, index) => (
          <p key={index} className="mb-4 text-lg tracking-tighter">
            {item.children.map((child, childIndex) => child.text)}
          </p>
        ))}
      </div>
    </section>
  );
}
