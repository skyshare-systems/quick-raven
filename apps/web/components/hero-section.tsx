"use client";
import React from "react";
import Image from "next/image";
import { Squircle } from "corner-smoothing";
import Link from "next/link";

import Grid from "public/assets/hero/s1-grid.svg";
import HeroImage from "public/assets/hero/landing-hero.svg";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

const HeroSectionPage = () => {
  return (
    <ParallaxBanner
      className="relative flex flex-row pt-[10rem] pb-[5rem] h-auto 2xl:h-[100dvh] justify-center items-center"
      id="hero-section"
    >
      <ParallaxBannerLayer expanded={false} speed={-30} scale={[0.8, 1]}>
        <Grid className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full -rotate-90 lg:rotate-0" />
      </ParallaxBannerLayer>
      <div
        className="relative flex flex-col justify-center px-5 lg:px-0 max-w-[1500px] w-full gap-5 items-center 2xl:items-stretch"
        data-aos="fade-up"
        data-aos-offset="500"
        data-aos-duration="1000"
      >
        <HeroImage
          className="absolute right-[0] 2xl:-right-[5rem] hidden 2xl:flex 2xl:w-[60rem] -z-[1]"
          data-aos="fade-down"
          data-aos-offset="500"
          data-aos-delay="500"
          data-aosduration="1000"
        />
        <Image
          className="flex 2xl:hidden"
          src={"/assets/hero/landing-hero.svg"}
          alt={"hero"}
          width={1100}
          height={1100}
        />

        <div className="flex flex-col">
          <h1 className="text-center 2xl:text-left mobile-h1 sm:leading-[60px] sm:tablet-h1 md:leading-[90px] md:web-h1 text-white">
            Your one-stop
          </h1>
          <h1 className="text-center 2xl:text-left mobile-h1 sm:leading-[60px] sm:tablet-h1 md:leading-[90px] md:web-h1 text-transparent bg-clip-text bg-gradient-to-t from-[#1dfab9] to-[#1dffae]">
            cross-chain
          </h1>
          <h1 className="text-center 2xl:text-left mobile-h1 sm:leading-[80px] sm:tablet-h1 md:leading-[120px] md:web-h1 text-transparent bg-clip-text bg-gradient-to-t from-[#1dfab9] to-[#1dffae]">
            swapping solution
          </h1>
        </div>
        <h4 className="mobile-h4 sm:tablet-h4 md:web-h4 text-white">
          No more hectic transactions for a simple swap
        </h4>

        <Squircle
          style={{
            borderBottomWidth: 0,
          }}
          className="flex group overflow-hidden bg-[#ffffff] justify-center items-center w-full xsm:w-32 sm:w-44 transition ease-in-out duration-300 hover:bg-[#ffffff12] hover:backdrop-blur-md"
          cornerSmoothing={1}
          cornerRadius={12}
        >
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfcDqh2BRvX6kMiGa7mV3RMjfrNbatcpxodMzOdId0e-eDCLA/viewform"
            target="_blank"
          >
            <button className="w-full py-8 sm:py-4 px-4 mobile-title sm:tablet-title md:web-title text-black transition ease-in-out duration-300 group-hover:text-white">
              Join the waitlist
            </button>
          </Link>
        </Squircle>
      </div>
    </ParallaxBanner>
  );
};

export default HeroSectionPage;
