"use client";
import React from "react";
import { Squircle } from "corner-smoothing";
import Link from "next/link";

const ContactUsPage = () => {
  return (
    <div className="relative flex justify-center items-center py-[2rem] lg:py-[10rem]">
      <div className="flex flex-col justify-center items-center max-w-[1400px] gap-5 lg:gap-2">
        <h2 className="mobile-h2 sm:tablet-h2 md:web-h2 text-white">
          Lets build{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#1dfab9] to-[#1dffae]">
            together
          </span>
        </h2>
        <Link href="mailto:quickraven@skysharelabs.com" target="_blank">
          <Squircle cornerSmoothing={1} cornerRadius={10}>
            <button className="px-5 py-3 text-black mobile-title sm:tablet-title md:web-title bg-gradient-to-b from-[#1de1fa] via-[#1df2cd] to-[#1dffae] hover:from-[#1B8D9B52] hover:via-[#14998252] hover:to-[#1D9C6E52] hover:text-white transition ease-in-out duration-300 hover:transition hover:ease-in-out hover:duration-300">
              Contact us
            </button>
          </Squircle>
        </Link>
      </div>
    </div>
  );
};

export default ContactUsPage;
