import Image from "next/image";
import { Mail } from "lucide-react";

export default function BoardOfPartners() {
  const partners = [
    {
      name: "Dr. Vittorio MORANDI",
      role: "Project Coordinator and PI of CNR",
      mail: "vittorio.morandi@cnr.it",
      image: "/images/people/morandi.jpg",
      logo: "/images/boardofpartners/CNR.jpg",
    },
    {
      name: "Prof. Fabrizio Candido PIRRI",
      role: "PI of Politecnico di Torino",
      mail: "fabrizio.pirri@polito.it",
      image: "/images/people/candido.jpg",
      logo: "/images/boardofpartners/polito.jpg",
    },
    {
      name: "Dr. Davide Calonico",
      role: "PI of INRiM",
      mail: "d.calonico@inrim.it",
      image: "/images/people/calonico.jpg",
      logo: "/images/boardofpartners/inrim.png",
    },

    {
      name: "Prof. Loris GIORGINI",
      role: "PI of ALMA MATER Università di Bologna",
      mail: "loris.giorgini@unibo.it",
      logo: "/images/boardofpartners/unibologna.gif",
      image: "/images/people/giorgini.jpg",
    },
    {
      name: "Prof. Marco ROSSI",
      role: "PI of SAPIENZA Università di Roma",
      mail: "marco.rossi@uniroma1.it",
      logo: "/images/boardofpartners/sapienza.jpg",
      image: "/images/people/marco.jpg",
    },
    {
      name: "Prof. Marco SEBASTIANI",
      role: "PI of Università ROMATRE",
      mail: "marco.sebastiani@uniroma3.it",
      logo: "/images/boardofpartners/romatre.jpg",
      image: "/images/people/sebastiani.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {partners.map((partner, index) => (
        <div
          key={index}
          className="flex flex-col p-[1px] bg-gray-200 splashMiniXS"
        >
          <div
            className="w-full h-[300px] bg-gray-200 flex justify-center items-center splashMiniXS relative bg-cover bg-center"
            style={{ backgroundImage: `url(${partner.image})` }}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={100}
              height={100}
              className="object-contain absolute top-0 right-0 p-3 bg-white splashMiniXS h-[80px]"
            />
          </div>
          <div className="flex flex-col gap-1 bg-white p-4 splashMiniXS">
            <h3 className="text-lg font-bold">{partner.name}</h3>
            <div className="flex flex-col gap-1">
              <span>{partner.role}</span>
              <a
                href={`mailto:${partner.mail}`}
                className="text-blue-500 flex flex-row gap-1 items-center"
              >
                <Mail className="w-4 h-4" />
                {partner.mail}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
