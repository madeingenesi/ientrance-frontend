export default function HeroSection({
  title,
  image,
  headerHeight,
}: {
  title: string;
  image: string;
  headerHeight: number;
}) {
  return (
    <section
      className={`container w-full mx-auto flex flex-col md:flex-row gap-32 justify-start items-end bg-cover bg-center min-h-[500px] border-y`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-fit">
        <div className="sticky top-10">
          <h1 className="text-4xl font-medium tracking-tighter bg-white p-8 md:border-t md:border-r">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
