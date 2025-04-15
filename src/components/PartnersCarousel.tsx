import Image from "next/image";

export default function PartnersCarousel() {
  const partnerLogos = [
    {
      id: 1,
      image: "/images/boardofpartners/CNR.jpg",
    },
    {
      id: 2,
      image: "/images/boardofpartners/inrim.png",
    },
    {
      id: 3,
      image: "/images/boardofpartners/polito.jpg",
    },
    {
      id: 4,
      image: "/images/boardofpartners/romatre.jpg",
    },
    {
      id: 5,
      image: "/images/boardofpartners/sapienza.jpg",
    },
    {
      id: 6,
      image: "/images/boardofpartners/unibologna.gif",
    },
  ];

  return (
    <div className="w-full ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        {partnerLogos.map((partner) => (
          <div
            key={partner.id}
            className="flex items-center justify-center p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 splashMini"
          >
            <Image
              src={partner.image}
              alt={`Partner ${partner.id}`}
              width={150}
              height={100}
              className="object-contain w-auto h-auto p-6"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
