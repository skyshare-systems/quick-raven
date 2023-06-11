import React from "react";
import Image from "next/image";

const InfoSectionPage = () => {
  return (
    <div
      className="flex flex-row py-[5rem] h-auto lg:h-[100vh] justify-center items-center"
      id="info-section"
    >
      <div className="flex flex-col justify-center items-center max-w-[1400px] grow gap-5 px-5 lg:px-0">
        <Image
          src={"/assets/info/info-section.webp"}
          alt={"hero"}
          width={600}
          height={600}
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-out"
          data-aos-delay="200"
          data-aos-offset="0"
          data-aos-once="true"
        />
        <h2
          className="md:leading-[60px] text-center mobile-h2 sm:tablet-h2 md:web-h2 text-transparent bg-clip-text bg-gradient-to-b from-[#fdfdfd] to-[#9a9a9a] max-w-[900px]"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          Offering one-stop swap across the networks maximizing all supported
          DEXes and Bridges
        </h2>
        <p
          className="mobile-description sm:tablet-description md:web-description text-white text-center max-w-[600px]"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
        >
          With just one transaction approval, Quick Raven will make it possible
          to get your desired token from one network to another
        </p>
      </div>
    </div>
  );
};

export default InfoSectionPage;
