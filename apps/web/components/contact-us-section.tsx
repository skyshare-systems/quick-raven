"use client";
import React from "react";
import { Squircle } from "corner-smoothing";

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

        <Squircle
          cornerSmoothing={1}
          cornerRadius={10}
          className="duration-200 hover:scale-105 active:scale-95"
        >
          <button className="px-5 py-3 text-black mobile-title sm:tablet-title md:web-title bg-gradient-to-b from-[#1de1fa] via-[#1df2cd] to-[#1dffae]">
            Contact us
          </button>
        </Squircle>
      </div>
    </div>
  );
};

export default ContactUsPage;