import React from "react";
import Link from "next/link";

const PartnerPage = () => {
  return (
    <div
      className="flex flex-col pt-[10rem] h-auto justify-center items-center gap-5"
      id="partner-section"
    >
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
        className="mobile-description sm:tablet-description md:web-description text-white mb-5"
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
    </div>
  );
};

export default PartnerPage;
