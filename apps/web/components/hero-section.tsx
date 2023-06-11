"use client";
import React from "react";
import Image from "next/image";
import { Squircle } from "corner-smoothing";
import Link from "next/link";

const HeroSectionPage = () => {
  return (
    <div
      className="relative flex flex-row py-[10rem] h-auto lg:h-[100vh] justify-center items-center"
      id="hero-section"
    >
      <Image
        className="absolute right-0 -z-[1]"
        src={"/assets/hero/landing-hero.svg"}
        alt={"hero"}
        width={1100}
        height={1100}
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-out"
        data-aos-delay="300"
        data-aos-offset="0"
      />
      <div
        className="flex flex-col justify-center px-5 lg:px-0 max-w-[1400px] grow gap-5"
        data-aos="fade-up"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
      >
        <Image
          src={"/assets/quickraven-text.svg"}
          alt={"hero"}
          width={150}
          height={150}
        />
        <div className="flex flex-col">
          <h1 className=" mobile-h1 sm:leading-[60px] sm:tablet-h1 md:leading-[90px] md:web-h1 text-white">
            Your one-stop
          </h1>
          <h1 className=" mobile-h1 sm:leading-[60px] sm:tablet-h1 md:leading-[90px] md:web-h1 text-transparent bg-clip-text bg-gradient-to-t from-[#1df0d3] to-[#1df6c4]">
            cross-chain
          </h1>
          <h1 className=" mobile-h1 sm:leading-[80px] sm:tablet-h1 md:leading-[120px] md:web-h1 text-transparent bg-clip-text bg-gradient-to-t from-[#1dfab9] to-[#1dffae]">
            swapping solution
          </h1>
        </div>
        <h4 className="mobile-h4 sm:tablet-h4 md:web-h4 text-white">
          No more hectic transactions for a simple swap
        </h4>

        <Squircle
          style={{
            padding: "2px",
            background: "#ffffff",
            borderBottomWidth: 0,
          }}
          className="flex justify-center items-center w-full xsm:w-32 sm:w-44 hover:scale-105 active:scale-95 duration-200"
          cornerSmoothing={1}
          cornerRadius={12}
        >
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfcDqh2BRvX6kMiGa7mV3RMjfrNbatcpxodMzOdId0e-eDCLA/viewform"
            target="_blank"
          >
            <button className="w-full py-3 sm:py-4 px-3 mobile-title sm:tablet-title md:web-title text-black">
              Join the Waitlist
            </button>
          </Link>
        </Squircle>
      </div>
    </div>
  );
};

export default HeroSectionPage;
