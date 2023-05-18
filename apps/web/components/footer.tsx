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
    <footer className="flex flex-col justify-center items-center gap-3 py-8">
      <div className="flex flex-col justify-center items-center">
        <h4 className="flex gap-2 mobile-h4 sm:tablet-h4 lg:web-h4 text-white">
          <span className="text-[#7a7a7a]">$</span>73,912.8441
        </h4>
        <p className="text-[#7a7a7a] mobile-overline sm:tablet-overline lg:web-overline">
          Total TX volume
        </p>
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
              <p className="mobile-title sm:tablet-title lg:web-title text-white">
                {data.name}
              </p>
            </Link>
          );
        })}
      </ul>

      <p className="mobile-overline sm:tablet-overline lg:web-overline text-white text-center">
        Copyright &#169; 2023 <span className="text-[#49bdf2]">QuickRaven</span>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default FooterPage;
