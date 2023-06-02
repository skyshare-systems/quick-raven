import React from "react";
import Image from "next/image";
import Link from "next/link";

const socmeds = [
  {
    id: 1,
    name: "Medium",
    imgUrl: "/icons/footer/medium-icon.svg",
    linkUrl: "",
  },
  {
    id: 2,
    name: "Facebook",
    imgUrl: "/icons/footer/facebook-icon.svg",
    linkUrl: "",
  },
  {
    id: 3,
    name: "Twitter",
    imgUrl: "/icons/footer/twitter-icon.svg",
    linkUrl: "",
  },
  {
    id: 4,
    name: "Discord",
    imgUrl: "/icons/footer/discord-icon.svg",
    linkUrl: "",
  },
  {
    id: 5,
    name: "Github",
    imgUrl: "/icons/footer/github-icon.svg",
    linkUrl: "",
  },
  {
    id: 6,
    name: "Gitbook",
    imgUrl: "/icons/footer/gitbook-icon.svg",
    linkUrl: "",
  },
];
const FooterPage = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-11 gap-3 py-4 bg-[#031d2a]">
      <div className="flex flex-row justify-center items-center gap-3">
        <p className="text-[#7a7a7a] mobile-description sm:tablet-description lg:web-description">
          Total TX volume:
        </p>
        <h4 className="flex gap mobile-description sm:tablet-description lg:web-description text-white">
          <span className="text-[#7a7a7a]">$</span>73,912.8441
        </h4>
      </div>

      <ul className="flex flex-wrap justify-center items-center gap-5">
        {socmeds.map((data, index) => {
          return (
            <Link
              key={index}
              href={data.linkUrl}
              className="flex flex-row gap-2 items-center"
            >
              <Image src={data.imgUrl} alt={data.name} width={25} height={25} />
            </Link>
          );
        })}
      </ul>
    </footer>
  );
};

export default FooterPage;
