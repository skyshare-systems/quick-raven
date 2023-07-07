import React from "react";
import Image from "next/image";
import Link from "next/link";

import LinkedInIcon from "public/icons/linkedin-icon.svg";
import TwitterIcon from "public/icons/twitter-icon.svg";
import TelegramIcon from "public/icons/telegram-icon.svg";
import Mail from "public/icons/gmail-icon.svg";

const TeamMember = [
  {
    id: 1,
    name: "Lorence",
    imgUrl: "/assets/team/lorence.svg",
    position: "CEO",
    title: "Product Manager",
    linkedInUrl: "https://www.linkedin.com/in/johnlorencecahiwat/",
    twitterUrl: "https://twitter.com/doctorcarnage1",
    telegramUrl: "https://t.me/Lezgopower",
    mailUrl: "mailto:cahiwatjohnlorence@gmail.com",
  },
  {
    id: 2,
    name: "Harvey",
    imgUrl: "/assets/team/harvey.svg",
    position: "Co-founder",
    title: "Back-end Developer",
    linkedInUrl: "https://www.linkedin.com/in/dev-hvstle/",
    twitterUrl: "https://twitter.com/dev_hvstle",
    telegramUrl: "https://t.me/DevHvstle",
    mailUrl: "mailto:hvstle.dev@gmail.com",
  },
  {
    id: 3,
    name: "Vince",
    imgUrl: "/assets/team/vince.svg",
    position: "Co-founder",
    title: "Front-end Developer",
    linkedInUrl: "https://www.linkedin.com/in/vince-irving-lucas/",
    twitterUrl: "https://twitter.com/BeansIrving",
    telegramUrl: "https://t.me/Binsongsung",
    mailUrl: "mailto:vincelucas@skysharelabs.com",
  },
  {
    id: 4,
    name: "Kevin",
    imgUrl: "/assets/team/kevin.svg",
    position: "Co-founder",
    title: "UI/UX Designer",
    linkedInUrl: "https://www.linkedin.com/in/kevin-bryan-mecija-7b5510248/",
    twitterUrl: "https://twitter.com/kevinhcx_ui",
    telegramUrl: "https://t.me/Insanerman",
    mailUrl: "mailto:kevinmecija@skysharelabs.com",
  },
];

const PartnerTeamPage = () => {
  return (
    <div
      className="relative flex flex-row py-[5rem] h-auto justify-center items-center"
      id="partner-team-section"
    >
      <Image
        src={"/assets/bird.webp"}
        alt={"bird"}
        height={650}
        width={650}
        className="absolute -z-[1] right-0 max-w-[100px] sm:max-w-[200px] md:max-w-[400px] 2xl:max-w-[650px]"
      />

      <Image
        src={"/assets/bird.webp"}
        alt={"bird"}
        height={650}
        width={650}
        className="absolute -z-[1] left-0 -scale-x-100 max-w-[100px] sm:max-w-[200px] md:max-w-[400px] 2xl:max-w-[650px]"
      />
      <div className="flex flex-col justify-center items-center max-w-[1400px] grow gap-16 px-5 lg:px-0">
        <h2 className="mobile-h2 sm:tablet-h2 md:web-h2 text-white">
          Meet The Team
        </h2>

        <div className="flex flex-wrap gap-16 items-center justify-center">
          {TeamMember.map((data, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-8 team-bg p-9 rounded-lg border-[1px] border-[#1cacef]/32"
                data-aos="fade-up"
                data-aos-delay={index + "00"}
                data-aos-duration="2000"
              >
                <Image
                  src={data.imgUrl}
                  alt={data.name}
                  height={150}
                  width={150}
                />
                <div className="flex flex-col items-center gap-2">
                  <h1 className="font-bold mobile-title sm:tablet-title md:web-title text-white">
                    {data.name}
                  </h1>
                  <p className="font-normal mobile-description sm:tablet-description md:web-description text-[#ffffff]/50">
                    {data.position}
                  </p>
                  <p className="font-normal mobile-description sm:tablet-description md:web-description text-[#ffffff]/50">
                    {data.title}
                  </p>

                  <div className="flex flex-wrap justify-center items-center gap-2">
                    <Link href={data.linkedInUrl} target="_blank">
                      <LinkedInIcon />
                    </Link>
                    <Link href={data.twitterUrl} target="_blank">
                      <TwitterIcon />
                    </Link>
                    <Link href={data.telegramUrl} target="_blank">
                      <TelegramIcon />
                    </Link>
                    <Link href={data.mailUrl} target="_blank">
                      <Mail />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PartnerTeamPage;
