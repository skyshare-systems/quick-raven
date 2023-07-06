/* eslint-disable prefer-const */
"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { Squircle } from "corner-smoothing";
import Glow from "public/assets/supported-platforms/s3-stats-glow-right.svg";
import GlowLeft from "public/assets/supported-platforms/s3-stats-glow-left.svg";
import GridLeft from "public/assets/supported-platforms/s3-grid-right.svg";
import GridRight from "public/assets/supported-platforms/s3-grid-left.svg";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";

export default function TransactionPage() {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <ParallaxBanner className="relative flex justify-center w-full px-5 lg:px-0 py-[10rem]">
      <ParallaxBannerLayer expanded={false} speed={-30} opacity={[0, 1]}>
        <GridLeft className="-z-[1] absolute top-[0] left-0 w-full sm:w-[40rem]" />
        <GlowLeft className="-z-[1] absolute top-8 left-0 w-full sm:w-[20rem]" />
      </ParallaxBannerLayer>

      <ParallaxBannerLayer expanded={false} speed={-20} opacity={[0, 1]}>
        <GridRight className="-z-[1] absolute bottom-[0] right-0 w-full sm:w-[40rem]" />
        <Glow className="-z-[1] absolute bottom-[0] right-5 w-full sm:w-[20rem]" />
      </ParallaxBannerLayer>

      <Squircle
        cornerRadius={30}
        cornerSmoothing={1}
        className="lg:grow max-w-[1400px] backdrop-blur-sm"
        style={{
          padding: "1px 1px",
          background: "rgb(13, 68, 94,0.3)",
          borderBottomWidth: 0,
        }}
      >
        <Squircle
          className="group relative px-8 py-0 bg-[black]/50 backdrop-blur-sm shadow-2xl"
          onMouseMove={handleMouseMove}
          cornerRadius={30}
          cornerSmoothing={1}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-50"
            style={{
              background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 60%
            )
          `,
            }}
          />
          <div className="flex flex-col lg:flex-row lg:flex-wrap justify-evenly py-12 items-center gap-5">
            <div className="flex flex-col">
              <h3 className="text-white mobile-h3 sm:tablet-h3 md:web-h3">
                $ 387,094,931,622.84
              </h3>
              <p className="text-[#c6c6c6] mobile-description sm:tablet-description md:web-description">
                Transaction Volume
              </p>
            </div>
            <div className="hidden lg:flex h-36 w-[2px] bg-gradient-to-t from-[#04202e] via-[#3fa5d4] to-[#04202e]" />
            <div className="flex lg:hidden h-[2px] w-36 bg-gradient-to-r from-[#04202e] via-[#3fa5d4] to-[#04202e]" />
            <div className="flex flex-col">
              <h3 className="text-white mobile-h3 sm:tablet-h3 md:web-h3">
                431,876,910
              </h3>
              <p className="text-[#c6c6c6] mobile-description sm:tablet-description md:web-description">
                Transactions
              </p>
            </div>
            <div className="hidden lg:flex h-36 w-[2px] bg-gradient-to-t from-[#04202e] via-[#3fa5d4] to-[#04202e]" />
            <div className="flex lg:hidden h-[2px] w-36 bg-gradient-to-r from-[#04202e] via-[#3fa5d4] to-[#04202e]" />

            <div className="flex flex-col">
              <h3 className="text-white mobile-h3 sm:tablet-h3 md:web-h3">
                573,168
              </h3>
              <p className="text-[#c6c6c6] mobile-description sm:tablet-description md:web-description">
                Unique Wallet Addresses
              </p>
            </div>
          </div>
        </Squircle>
      </Squircle>
    </ParallaxBanner>
  );
}
