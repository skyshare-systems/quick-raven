/* eslint-disable prefer-const */
"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { Squircle } from "corner-smoothing";
import Image from "next/image";

export default function TransactionPage() {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className="relative flex justify-center items-center py-[2rem] lg:py-[10rem]">
      <div className="flex justify-center lg:grow px-5 lg:px-0">
        <Image
          src={"/assets/glow.svg"}
          alt={"glow"}
          height={320}
          width={320}
          className="absolute top-3 left-0 2xl:left-20 -z-[1] "
        />

        <Image
          src={"/assets/glow.svg"}
          alt={"glow"}
          height={320}
          width={320}
          className="absolute hidden lg:flex bottom-3 right-0 2xl:right-20 -z-[1]"
        />
        <Squircle
          cornerRadius={30}
          cornerSmoothing={1}
          className="lg:grow max-w-[1400px]"
          style={{
            padding: "1px 1px",
            background: "#0d4964",
            borderBottomWidth: 0,
          }}
        >
          <Squircle
            className="group relative bg-[#141414] px-8 py-0 shadow-2xl"
            onMouseMove={handleMouseMove}
            cornerRadius={30}
            cornerSmoothing={1}
          >
            <Image
              src={"/assets/glow.svg"}
              alt={"glow"}
              height={320}
              width={320}
              className="absolute -top-[9.5rem] left-0 2xl:-left-[11rem] z-[1]"
            />

            <Image
              src={"/assets/glow.svg"}
              alt={"glow"}
              height={320}
              width={320}
              className="absolute -bottom-[9.5rem] right-0 2xl:-right-[11rem]  -z-[1] md:z-[1]"
            />
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
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
      </div>
    </div>
  );
}
