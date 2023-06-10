import React from "react";
import Image from "next/image";
import Link from "next/link";

const FooterPage = () => {
  const socmed = [
    {
      id: 1,
      name: "Medium",
      imgUrl: "/icons/footer/medium.png",
      linkUrl: "https://medium.com/@quickraven",
      isLive: true,
    },
    {
      id: 2,
      name: "Facebook",
      imgUrl: "/icons/footer/fb.png",
      linkUrl: "https://www.facebook.com/quickraven",
      isLive: true,
    },
    {
      id: 3,
      name: "Twitter",
      imgUrl: "/icons/footer/twitter.png",
      linkUrl: "https://twitter.com/QuickRaven_io",
      isLive: true,
    },
    {
      id: 4,
      name: "Discord",
      imgUrl: "/icons/footer/discord.png",
      linkUrl: "#",
      isLive: false,
    },
    {
      id: 5,
      name: "Github",
      imgUrl: "/icons/footer/git.png",
      linkUrl: "#",
      isLive: false,
    },
    {
      id: 5,
      name: "Gitbook",
      imgUrl: "/icons/footer/gitbook.png",
      linkUrl: "#",
      isLive: false,
    },
  ];

  return (
    <footer className="px-16">
      <hr />
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center md:justify-between items-center py-[1.5rem] ">
        <Image
          src={"/assets/logo-with-letter.svg"}
          alt={"quickraven"}
          height={200}
          width={200}
        />

        <div className="flex flex-wrap justify-center items-center gap-11 background-white">
          {socmed.map((data, index) => {
            return (
              <Link key={index} href={data.isLive === true ? data.linkUrl : {}}>
                <Image
                  src={data.imgUrl}
                  alt={data.name}
                  width={20}
                  height={20}
                  className="grayscale hover:grayscale-0 hover:scale-125 active:scale-95 duration-300"
                />
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col items-end max-w-[280px]">
          <p className="text-right mobile-description sm:tablet-description md:web-description text-white">
            © 2023 Quick Raven <br></br>Alpha Version. Use at your own risk.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
