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
    <div className="relative flex justify-center lg:w-full px-5 lg:px-0">
      <Squircle
        cornerRadius={30}
        cornerSmoothing={1}
        className="lg:grow max-w-[1400px]"
        style={{
          padding: "1px 1px",
          background: "rgb(13, 68, 94,0.4)",
          borderBottomWidth: 0,
        }}
      >
        <Squircle
          className="group relative px-8 py-0 bg-[black]/40 shadow-2xl"
          onMouseMove={handleMouseMove}
          cornerRadius={30}
          cornerSmoothing={1}
        >
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
  );
}
