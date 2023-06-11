import React from "react";
import Image from "next/image";
import Link from "next/link";

const TeamMember = [
  {
    id: 1,
    name: "Lorence",
    imgUrl: "/assets/team/lorence.svg",
    position: "CEO",
    title: "Product Manager",
  },
  {
    id: 2,
    name: "Harvey",
    imgUrl: "/assets/team/harvey.svg",
    position: "Co-founder",
    title: "Back-end Developer",
  },
  {
    id: 3,
    name: "Vince",
    imgUrl: "/assets/team/vince.svg",
    position: "Co-founder",
    title: "Front-end Developer",
  },
  {
    id: 4,
    name: "Kevin",
    imgUrl: "/assets/team/kevin.svg",
    position: "Co-founder",
    title: "UI/UX Designer",
  },
];

const PartnerTeamPage = () => {
  return (
    <div
      className="relative flex flex-row py-[5rem] h-auto lg:h-[100vh] justify-center items-center"
      id="partner-team-section"
    >
      <Image
        src={"/assets/bird.webp"}
        alt={"bird"}
        height={650}
        width={650}
        className="absolute right-0 max-w-[100px] sm:max-w-[200px] md:max-w-[400px] 2xl:max-w-[650px]"
      />

      <Image
        src={"/assets/bird.webp"}
        alt={"bird"}
        height={650}
        width={650}
        className="absolute left-0 -scale-x-100 max-w-[100px] sm:max-w-[200px] md:max-w-[400px] 2xl:max-w-[650px]"
      />
      <div className="flex flex-col justify-center items-center max-w-[1400px] grow gap-5 px-5 lg:px-0">
        <h2
          className="mobile-h2 sm:tablet-h2 md:web-h2 text-white"
          data-aos="fade-up"
          data-aos-delay={`200`}
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          Partners and Grants
        </h2>
        <p
          className="mobile-description text-center sm:text-left sm:tablet-description md:web-description text-[#838383]"
          data-aos="fade-up"
          data-aos-delay={`200`}
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          Pending approvals to some grants and negotiating with partners...
        </p>
        <p
          className="mobile-description sm:tablet-description md:web-description text-white"
          data-aos="fade-up"
          data-aos-delay={`200`}
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          Interested to be part of us?{" "}
          <Link
            href="mailto:quickraven@skysharelabs.com"
            target="_blank"
            className="hover:text-[#1DFFAE] transition ease-in-out duration-300"
          >
            <u>Send us an email</u>
          </Link>
        </p>

        <h2
          className="mobile-h2 sm:tablet-h2 md:web-h2 text-white"
          data-aos="fade-up"
          data-aos-delay={`200`}
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          Meet The Team
        </h2>

        <div className="flex flex-wrap gap-4 sm:gap-20 items-center justify-center">
          {TeamMember.map((data, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-4"
                data-aos="fade-up"
                data-aos-delay={`${index}00`}
                data-aos-easing="ease-in-out"
                data-aos-once="true"
              >
                <Image
                  src={data.imgUrl}
                  alt={data.name}
                  height={150}
                  width={150}
                />
                <div className="flex flex-col items-center gap-1">
                  <h1 className="font-bold mobile-title sm:tablet-title md:web-title text-transparent bg-clip-text bg-gradient-to-t from-[#1df0d3] to-[#1df6c4]">
                    {data.name}
                  </h1>
                  <p className="mobile-description sm:tablet-description md:web-description text-[#C6C6C6]">
                    {data.position}
                  </p>
                  <p className="mobile-description sm:tablet-description md:web-description text-[#C6C6C6]">
                    {data.title}
                  </p>
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
